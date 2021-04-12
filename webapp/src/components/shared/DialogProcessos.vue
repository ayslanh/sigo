<template>
  <v-overlay :value="dialog">
    <v-col v-if="processando" class="d-flex justify-center">
      <v-progress-circular size="120" color="white" indeterminate>
        Processando
      </v-progress-circular>
    </v-col>

    <v-card v-else class="py-4" light>
      <v-card-title>
        <span v-if="processando">Aguarde, processando dados ...</span>
        <span v-else>Processamento finalizado</span>
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-container v-for="(log, index) in logs" :key="index">
          <!-- <span v-if="log.status === 'success'">
            <v-icon class="mr-1" color="green">mdi-check</v-icon>
            {{ log.text }}
          </span> -->
          <span v-if="log.status === 'error'">
            <v-icon class="mr-1" color="red">mdi-close-circle</v-icon>
            {{ log.text }}
          </span>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions v-if="this.logs.length > 0">
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="closeDialog">
          Sair
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-overlay>
</template>

<script>
export default {
  name: "DialogProcessos",

  props: {
    dialog: Boolean,
    logs: Array,
    processando: Boolean
  },

  methods: {
    closeDialog() {
      this.modalIsOpen = false;
      this.$emit("resetForm");
    }
  }
};
</script>
