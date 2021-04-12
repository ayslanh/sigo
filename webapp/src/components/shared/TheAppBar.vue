<template>
  <v-app-bar app clipped-right color="#e9e9e9">
    <v-app-bar-nav-icon @click="activeDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title color="black">
      {{ rule }}
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-menu transition="slide-y-transition" bottom offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mr-1" text v-bind="attrs" v-on="on">
          {{ user }}
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item to="/perfil">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Perfil</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-avatar size="36" color="grey darken-3">
      <span class="white--text headline">{{ userNameInitial }}</span>
    </v-avatar>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TheAppBar",

  props: {
    drawer: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      drawerData: this.drawer,
    };
  },

  methods: {
    activeDrawer() {
      this.drawerData = !this.drawerData;
      this.$emit("setDrawer", this.drawerData);
    },

    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
  },

  computed: {
    userNameInitial() {
      if (this.getUser) {
        return this.getUser?.name?.substr(0, 1);
      }
      return "";
    },
    ...mapGetters({
      getUser: "getUser",
    }),

    user() {
      return this.getUser?.name;
    },
    rule() {
      return this.getUser?.rule?.nome;
    },
  },

  watch: {
    drawer(value) {
      this.drawerData = value;
    },
  },
};
</script>
