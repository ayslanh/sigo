<template>
  <v-dialog
    ref="dialog"
    v-model="modal"
    :return-value.sync="date"
    persistent
    max-width="30%"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="dateFormatted"
        :label="label"
        prepend-icon="mdi-calendar"
        readonly
        :disabled="disabled"
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      full-width
      elevation="1"
      locale="pt-BR"
      type="month"
      :title-date-format="formatTitle"
      @change="handleChange"
      :min="new Date().toISOString().substr(0, 7)"
    >
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="handleCancel">
        Cancelar
      </v-btn>
      <v-btn text color="primary" @click="$refs.dialog.save(date)">
        Selecionar
      </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
import { parse, format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default {
  name: "NewBaseDatePicker",

  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ""
    },
    preDate: {
      type: String
    }
  },

  data() {
    return {
      modal: false,
      picker: new Date().toISOString().substr(0, 7)
    };
  },

  computed: {
    dateFormatted() {
      return this.formatDate(this.date);
    },

    date: {
      get() {
        return this.preDate;
      },
      set(value) {
        this.picker = value;
      }
    }
  },

  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month] = date.split("-");
      return `${month}/${year}`;
    },

    formatTitle(stringDate) {
      const date = parse(stringDate, "yyyy-MM", new Date());
      const stringDateFormated = format(date, "MMMM", { locale: ptBR });
      return stringDateFormated;
    },

    handleChange(value) {
      this.$emit("change", value);
    },

    async handleCancel() {
      this.modal = false;
      await this.$nextTick();
      this.$emit("change", this.picker);
    }
  }
};
</script>
