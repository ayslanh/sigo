<template>
  <v-select
    v-model="selectedItems"
    :items="items"
    :label="label"
    :multiple="multiple"
    :rules="rules"
    @change="whenSelectingItem($event)"
  ></v-select>
</template>

<script>
export default {
  name: "BaseSelect",

  props: {
    items: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false
    },
    rules: {
      type: Array
    }
  },

  data() {
    return {
      selectedItems: []
    };
  },

  methods: {
    whenSelectingItem(item) {
      this.$emit("itemSelect", item);
    }
  }
};
</script>
