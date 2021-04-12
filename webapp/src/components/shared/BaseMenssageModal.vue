<template>
  <v-row class="ml-4">
    <v-dialog v-model="dialog" persistent :max-width="maxWidth">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="green" class="white--text" v-bind="attrs" v-on="on">
          Cadastrar
        </v-btn>
      </template>
      <v-card class="card-items text-center">
        <v-icon color="green" class="mt-4 icon-size"
          >mdi-checkbox-marked-circle-outline</v-icon
        >
        <v-card-title class="headline">
          {{ title }}
        </v-card-title>
        <v-card-text class="card-text">
          {{ menssage }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="text-center"
            color="primary"
            :to="{ path: redirect }"
            text
            @click="dialog = false"
          >
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    maxWidth: {
      type: Number
    },
    title: {
      type: String
    },
    menssage: {
      type: String
    },
    redirect: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      dialog: false
    };
  }
};
</script>

<style scoped>
.card-text {
  text-align: justify;
}

.icon-size {
  font-size: 7em;
}

.card-items {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
