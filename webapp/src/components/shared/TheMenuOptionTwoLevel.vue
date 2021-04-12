<template>
  <v-list-group color="white" :prepend-icon="item.icon" no-action>
    <template v-slot:activator>
      <v-list-item-title>{{ item.title }}</v-list-item-title>
    </template>

    <v-list-group
      v-for="son in item.children"
      :key="son.title"
      color="white"
      sub-group
      no-action
    >
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title>{{ son.title }}</v-list-item-title>
        </v-list-item-content>
      </template>

      <v-list-item
        v-for="grandson in son.grandchildren"
        :key="grandson.title"
        :to="grandson.route"
      >
        <v-list-item-title>{{ grandson.title }}</v-list-item-title>

        <v-list-item-icon>
          <v-icon>{{ grandson.icon }}</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list-group>
  </v-list-group>
</template>

<script>
export default {
  name: "TheMenuOptionTwoLevel",

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
