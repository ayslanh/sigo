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
      ></v-combobox>
    </template>
    <v-date-picker
      locale="pt-br"
      :value="value"
      @input="$emit('input', $event)"
      no-title
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
  props: ["value", "label"],

  data: () => ({
    menu: false
  }),

  computed: {
    dateFormated() {
      return this.formatDate(this.value);
    }
  },

  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },

    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
  }
};
</script>
