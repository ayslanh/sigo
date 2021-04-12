<template>
  <v-menu
    ref="menu"
    :value="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-combobox
        :value="dateFormated"
        :label="label"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
        :disabled="disabled"
        :rules="rules"
        :loading="loading"
        @click="menu = true"
      ></v-combobox>
    </template>
    <v-date-picker
      locale="pt-br"
      :disabled="disabled"
      :value="value"
      type="month"
      :allowed-dates="anoMesPermitidos"
      @input="$emit('input', $event)"
      scrollable
    >
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false">
        Cancelar
      </v-btn>
      <v-btn text color="primary" @click="$refs.menu.save(value)">
        OK
      </v-btn>
    </v-date-picker>
  </v-menu>
</template>
<script>
export default {
  name: "base-month-date-picker",
  props: [
    "value",
    "min",
    "max",
    "monthsAllowed",
    "label",
    "disabled",
    "rules",
    "loading"
  ],

  data: () => ({
    menu: false
  }),

  computed: {
    dateFormated() {
      return this.formatDate(this.value);
    }
  },

  watch: {
    menu(value) {
      return value;
    }
  },

  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month] = date.split("-");
      return `${month}/${year}`;
    },

    /**
     * Retorna se o o parâmetro Mês ano informado está na lista de
     * mêses do Tipo de Dado
     * @param <string> date: 'YYYY-MM'
     * @returns Boolean
     */
    anoMesPermitidos(date) {
      if (this.monthsAllowed.length > 0) {
        return this.monthsAllowed.find(element => element == date) == date;
      }
      return false;
    }
  }
};
</script>
