<template>
  <span class="d-flex">
    <v-icon :color="colorIcon" class="mr-2">{{ getIcon() }}</v-icon>
    <p class="mb-0" v-if="label">{{ label }}</p>
  </span>
</template>

<script>
// import serviceBandeira from "@/services/empresa";
export default {
  name: "BaseSegmento",

  props: {
    segmento: {
      type: [String, Number]
    },
    label: {
      type: String
    }
  },

  data() {
    return {
      colorIcon: ""
    };
  },

  methods: {
    getIcon() {
      let parsedSegmento = parseInt(this.segmento);
      if (!parsedSegmento) {
        this.colorIcon = "gray";
        return "mdi-eye-off-outline";
      }
      if (parsedSegmento == 2) {
        this.colorIcon = "red";
        return "mdi-motorbike";
      }
      if (parsedSegmento == 4) {
        this.colorIcon = "blue";
        return "mdi-car";
      }
      if (parsedSegmento == 5) {
        this.colorIcon = "brown";
        return "mdi-cow";
      }
      if (parsedSegmento == 6) {
        this.colorIcon = "red accent-4";
        return "mdi-heart";
      }
      if (parsedSegmento == 7) {
        this.colorIcon = "green";
        return "mdi-hexagon-multiple";
      }
    }
  }
};

//account-tie account-cowboy-hat cow hexagon-multiple heart
</script>

<style scoped></style>
