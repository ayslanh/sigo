<template>
  <v-list-item :to="item.route">
    <v-list-item-icon>
      <v-icon>{{ item.icon }}</v-icon>
    </v-list-item-icon>

    <v-list-item-content>
      <v-list-item-title>{{ item.title }}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "TheMenuOptionNoLevel",

  props: {
    item: {
      type: Object,
      required: true,
      validator: function(value) {
        const attrs = ["title", "icon", "route", "levels"];
        return attrs.every(attr =>
          Object.prototype.hasOwnProperty.call(value, attr)
        );
      }
    }
  }
};
</script>
