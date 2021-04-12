<template>
  <v-snackbar :time="time" :color="type" top right v-model="value">
    <v-icon>mdi- {{ icon() }}</v-icon> {{ text }}
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      text: "text informativo",
      value: false,
      type: "",
      time: 5000
    };
  },
  computed: {},
  methods: {
    icon() {
      if (this.type == "success") {
        return "mdi-checkbox-marked-circle";
      }
      if (this.type == "info") {
        return "mdi-information-outline";
      }
      if (this.type == "warning") {
        return "mdi-alert-outline";
      }
      if (this.type == "error") {
        return "mdi-alert-remove";
      }
      return "fi";
    },

    addAlert(type, text, time = 5000) {
      this.type = type;
      this.text = text;
      this.time = time;
      this.value = true;
    }
  }
};
</script>

<style scoped>
.teste {
  position: absolute;
}
</style>
