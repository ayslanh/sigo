<template>
  <v-overlay :value="loading">
    <v-col class="d-flex justify-center">
      <v-progress-circular size="140" color="white" indeterminate>
        {{ loadingText }}
      </v-progress-circular>
    </v-col>
  </v-overlay>
</template>

<script>
export default {
  name: "DialogProcessos",

  props: {
    loadingText: String,
    loading: Boolean
  }
};
</script>
