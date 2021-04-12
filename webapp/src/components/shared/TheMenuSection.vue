<template>
  <div v-can-access="section.permissions">
    <v-list dense nav>
      <v-subheader>{{ section.title }}</v-subheader>

      <div v-for="item in section.items" :key="item.title">
        <TheMenuOptionNoLevel
          v-if="item.levels === 0"
          v-can-access="item && item.permissions"
          :item="item"
        />
        <TheMenuOptionOneLevel
          v-if="item.levels === 1"
          v-can-access="item && item.permissions"
          :item="item"
        />
        <TheMenuOptionTwoLevel v-if="item.levels === 2" :item="item" />
      </div>
    </v-list>
    <v-divider></v-divider>
  </div>
</template>

<script>
import TheMenuOptionNoLevel from "@/components/shared/TheMenuOptionNoLevel";
import TheMenuOptionOneLevel from "@/components/shared/TheMenuOptionOneLevel";
import TheMenuOptionTwoLevel from "@/components/shared/TheMenuOptionTwoLevel";

export default {
  name: "TheMenuSection",

  props: {
    section: {
      type: Object,
      required: true,
      validator: function(value) {
        const attrs = ["items", "title"];
        return attrs.every(attr =>
          Object.prototype.hasOwnProperty.call(value, attr)
        );
      }
    }
  },

  components: {
    TheMenuOptionNoLevel,
    TheMenuOptionOneLevel,
    TheMenuOptionTwoLevel
  }
};
</script>
