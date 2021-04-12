<template>
  <v-navigation-drawer
    class="container-drawer"
    v-model="drawerData"
    app
    color="blue darken-4"
    dark
    @input="updateDrawer"
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title"> SIGO </v-list-item-title>
        <v-list-item-subtitle> IndTexBr </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <TheMenuSection
      v-for="section in sections"
      :key="section.title"
      :section="section"
    />
  </v-navigation-drawer>
</template>

<script>
import TheMenuSection from "@/components/shared/TheMenuSection";

export default {
  name: "TheSideBar",

  props: {
    drawer: {
      type: Boolean,
      default: true,
    },
  },

  components: {
    TheMenuSection,
  },

  data() {
    return {
      sections: [
        {
          title: "Gestão de Normas",

          items: [
            {
              title: "Buscar",
              icon: "mdi-domain",
              route: "/buscar-normas",
              levels: 0,
            },
            {
              title: "Cadastro",
              icon: "mdi-account-multiple",
              route: "/cadastro-normas",
              levels: 0,
            },
          ],
        },
      ],
      drawerData: true,
    };
  },

  methods: {
    updateDrawer(newValueDrawer) {
      this.drawerData = newValueDrawer;
      this.$emit("setDrawerResponsiveness", newValueDrawer);
    },
  },

  watch: {
    drawer(value) {
      this.drawerData = value;
    },
  },
};
</script>
