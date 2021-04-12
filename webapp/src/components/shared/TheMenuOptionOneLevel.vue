<template>
  <v-list-group color="white" :prepend-icon="item.icon" no-action>
    <template v-slot:activator>
      <v-list-item-content>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item-content>
    </template>

    <v-list-item
      v-for="son in item.children"
      v-can-access="son.permissions"
      :key="son.title"
      :to="son.route"
    >
      <v-list-item-icon>
        <v-icon>{{ son.icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>{{ son.title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list-group>
</template>

<script>
export default {
  name: "TheMenuOptionOneLevel",

  props: {
    item: {
      type: Object,
      required: true,
      validator: function(value) {
        const attrs = ["title", "icon", "children", "levels"];
        return attrs.every(attr =>
          Object.prototype.hasOwnProperty.call(value, attr)
        );
      }
    }
  }
};
</script>
