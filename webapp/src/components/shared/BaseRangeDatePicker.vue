<template>
  <v-dialog
    ref="dialog"
    v-model="modal"
    :return-value.sync="picker"
    persistent
    max-width="30%"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="dateRangeText"
        :label="label"
        prepend-icon="mdi-calendar"
        readonly
        :disabled="disabled"
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="picker"
      full-width
      elevation="1"
      locale="pt-BR"
      type="date"
      :title-date-format="formatDates"
      range
      @change="handleChange"
      :min="picker[0]"
    >
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="handleCancel">
        Cancelar
      </v-btn>
      <v-btn text color="primary" @click="$refs.dialog.save(picker)">
        Selecionar
      </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
import { parse, format } from "date-fns";

export default {
  name: "NewBaseRangeDatePicker",

  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ""
    },
    preDates: {
      type: Array
    }
  },

  data() {
    return {
      modal: false,
      picker: this.preDates
    };
  },

  computed: {
    dateRangeText() {
      return this.formatDates(this.picker);
    }
  },

  methods: {
    formatDates(dates) {
      const arrDatesFormated = dates.map(stringDate => {
        const date = parse(stringDate, "yyyy-MM-dd", new Date());
        return format(date, "dd/MM/yyyy");
      });
      return arrDatesFormated.join(" - ");
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
