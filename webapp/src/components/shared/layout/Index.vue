<template>
  <v-app id="#app">
    <v-main>
      <TheAppBar @setDrawer="drawer = $event" :drawer="drawer" />
      <TheSideBar @setDrawerResponsiveness="drawer = $event" :drawer="drawer" />
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import TheAppBar from "@/components/shared/TheAppBar";
import TheSideBar from "@/components/shared/TheSideBar";

export default {
  name: "SIGO",

  components: {
    TheAppBar,
    TheSideBar,
  },

  data() {
    return {
      drawer: true,
    };
  },
};
</script>

<style>
@import "../../../assets/css/style.css";
</style>
