<template>
  <v-container fluid>
    <v-select
      v-model="selected"
      :items="items"
      :label="nome"
      :multiple="multiple"
      :item-text="itemText"
      :item-value="itemValue"
      menu-props="auto"
    >
      <template v-if="multiple" v-slot:prepend-item>
        <v-list-item ripple @click="toggle()">
          <v-list-item-action>
            <v-icon :color="selected.length > 0 ? 'blue' : ''"
              >mdi mdi-pen</v-icon
            >
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Select All</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="mt-2"></v-divider>
      </template>

      <template v-slot:selection="{ item, index }">
        <v-chip v-if="index === 0">
          <span>{{ item[itemText] }}</span>
        </v-chip>
        <span v-if="index === 1" class="grey--text caption"
          >(+{{ selected.length - 1 }} others)</span
        >
      </template>
    </v-select>
  </v-container>
</template>

<script>
export default {
  name: "filtro",
  props: {
    itemText: String,
    itemValue: String,
    multiple: Boolean,
    nome: {
      type: String
    },
    items: {
      type: Array
    }
  },
  data() {
    return {
      selected: []
    };
  },
  computed: {
    likesAllItems() {
      return this.selected.length === this.items.length;
    },
    likesSomeItems() {
      return this.selected.length > 0 && !this.items;
    }
  },

  methods: {
    toggle() {
      this.$nextTick(() => {
        if (this.likesAllItems) {
          this.selected = [];
        } else {
          this.selected = this.items.map(item => {
            return item[this.itemText];
          });
        }
      });
    }
  },

  watch: {
    items() {},
    selected() {
      this.$emit("selectd", this.selected);
    }
  }
};
</script>
<style scoped>
.border {
  border-left: 1px solid red;
}
</style>
