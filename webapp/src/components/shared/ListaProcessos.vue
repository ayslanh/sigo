<template>
  <div>
    <template>
      <BaseTable
        :headers="headers"
        :items="getProcessamento"
        item-key="id_processo"
        show-select
        v-model="processosSelecionados"
        sort-by="ordem"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Processos</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer> </v-spacer>
          </v-toolbar>
        </template>

        <template v-slot:[`item.data_proc`]="{ item }">
          {{ item.data_proc | BrazilianStandardDateAndTime }}
        </template>

        <template v-slot:[`item.ativo`]="{ item }">
          <v-chip
            :color="statusProcesso(item.ativo) == 'Ativo' ? 'green' : 'red'"
            dark
          >
            {{ statusProcesso(item.ativo) }}
          </v-chip>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                @click="listarLogs(item.id_processo)"
                :disabled="!logs.length"
              >
                <v-icon color="info" v-bind="attrs" v-on="on">
                  mdi-file-cog
                </v-icon>
              </v-btn>
            </template>
            <span>Ver logs</span>
          </v-tooltip>
        </template>
      </BaseTable>
    </template>

    <v-dialog v-model="dialog" width="500" scrollable>
      <v-card max-width="500">
        <v-card-title>Lista de Logs</v-card-title>

        <template v-if="eachProcessLogs.length">
          <v-list-item
            class="flex-column"
            three-line
            v-for="(item, i) in eachProcessLogs"
            :key="i"
          >
            <v-list-item-content>
              <v-list-item-title>
                {{ item.mensagem }} -
                {{ item.data_proc | BrazilianStandardDateAndTime }}
              </v-list-item-title>
              <v-list-item-subtitle>
                Processado por: {{ item.usuario }}
              </v-list-item-subtitle>
              <v-divider></v-divider>
            </v-list-item-content>
          </v-list-item>
        </template>

        <v-list-item v-else>
          Não há dados processados para este período
        </v-list-item>

        <v-card-actions class="justify-end">
          <v-btn color="primary" text @click="dialog = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import dateMixin from "@/mixins/dateMixin";
import BaseTable from "@/components/shared/NewBaseTable";
import campanhaService from "@/services/campanha";

export default {
  name: "ListaProcessos",

  components: {
    BaseTable
  },

  props: {
    idCampanha: Number
  },

  watch: {
    async getCurrentCampanha(value) {
      if (!value) return;
      const { data } = await campanhaService.getLosProcessos({
        id_campanha: value
      });

      this.logs = data.data;
      console.log(data.data);
    }
  },

  mixins: [dateMixin],

  data() {
    return {
      headers: [
        { text: "Descrição", value: "descricao" },
        { text: "Data de Processamento", value: "data_proc" },
        { text: "Logs", value: "actions" },
        { text: "Status", value: "ativo" }
      ],
      processosSelecionados: [],
      logs: [],
      eachProcessLogs: [],
      dialog: false
    };
  },

  mounted() {
    this.fetchProcessamento({ per_page: -1 });
  },

  computed: {
    ...mapGetters({
      getProcessamento: "comissao/getProcessamento",
      getCurrentCampanha: "campanha/getCurrentCampanha"
    })
  },

  methods: {
    ...mapActions({
      fetchProcessamento: "comissao/fetchProcessamento"
    }),

    listarLogs(idProcesso) {
      this.eachProcessLogs = this.logs.filter(
        item => item.id_processo == idProcesso
      );

      this.dialog = true;
    },

    statusProcesso(item) {
      if (item == "S") item = "Ativo";
      if (item == "N") item = "Inativo";

      return item;
    },

    resetProcessos() {
      this.processosSelecionados = [];
    }
  }
};
</script>

<style></style>
