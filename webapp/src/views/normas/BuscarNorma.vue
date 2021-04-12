<template>
  <v-app id="#app">
    <v-main>
      <TheAppBar @setDrawer="drawer = $event" :drawer="drawer" />
      <TheSideBar @setDrawerResponsiveness="drawer = $event" :drawer="drawer" />
      <!-- <router-view></router-view> -->
      <div>
        <v-continer spacing-playground pa-2>
          <v-data-table
            :headers="headers"
            :items="normas"
            :items-per-page="5"
            class="elevation-1"
          ></v-data-table>
        </v-continer>
      </div>
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
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Descrição", value: "name" },
        { text: "Tipo", value: "type" },
        { text: "Data Publicação", value: "date" },
      ],
      normas: [
        {
          id: 1,
          name: "Norma descritiva da produção do Jeans",
          type: "Padrão de Qualidade",
          date: "02/04/2021",
        },
        {
          id: 1,
          name: "Norma descritiva da produção do Jeans",
          type: "Padrão de Qualidade",
          date: "02/04/2021",
        },
        {
          id: 1,
          name: "Norma descritiva da produção do Jeans",
          type: "Padrão de Qualidade",
          date: "02/04/2021",
        },
        {
          id: 1,
          name: "Norma descritiva da produção do Jeans",
          type: "Padrão de Qualidade",
          date: "02/04/2021",
        },
        {
          id: 1,
          name: "Norma descritiva da produção do Jeans",
          type: "Padrão de Qualidade",
          date: "02/04/2021",
        },
      ],
    };
  },
};
</script>

<style>
@import "../../assets/css/style.css";
</style>