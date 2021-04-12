<template>
  <v-app>
    <v-main>
      <v-container class="fill-height backgound" fluid>
        <v-row>
          <v-col class="align-center d-flex flex-column">
            <div class="logo-sistema">
              <h1 style="color: white">
                Sistema Integrado de Gestão e Operação - SIGO
              </h1>
            </div>
            <v-card width="350" class="card-login">
              <v-card-title class="title-login mb-8">
                <div style="text-align: left">Entrar</div>
              </v-card-title>
              <v-card-text>
                <v-form ref="form">
                  <v-text-field
                    class="mb-2"
                    v-model="email"
                    :rules="[rules.required, rules.email]"
                    label="E-mail"
                    outlined
                    @keyup.enter="login"
                  ></v-text-field>
                  <v-text-field
                    class="mb-3"
                    v-model="password"
                    :rules="[rules.required, rules.password]"
                    label="Senha"
                    type="password"
                    outlined
                    @keyup.enter="login"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions class="align-center d-flex flex-column">
                <v-btn
                  big
                  block
                  color="#0d47a1"
                  class="mb-2 white--text"
                  @click="login"
                  >Entrar</v-btn
                >
              </v-card-actions>
            </v-card>
            <v-divider width="20%" class="mt-8 mb-8"></v-divider>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Login",

  data() {
    return {
      email: "",
      password: "",
      rules: {
        password: (v) => !!v || "O campo senha é obrigatório",
      },
    };
  },

  methods: {
    async login() {
      if (this.$refs.form.validate()) {
        try {
          await this.$store.dispatch("tryLogin", {
            email: this.email,
            password: this.password,
          });
          this.goToHome();
        } catch (error) {
          console.error("erro login", error);
          this.$notify({
            type: "error",
            text: error.response.data.message,
          });
        }
      }
    },

    goToHome() {
      this.$router.push("/");
    },
    //teste
    goToResetPassword() {
      this.$router.push("/cadastro/solicita-redefinicao-senha");
    },
  },
};
</script>

<style scoped>
.backgound {
  background-image: linear-gradient(to bottom, #0d47a1 35%, #ffffff 35%);
  /* background-image: linear-gradient(#0d47a1, #acacac); */
}

.logo-sistema {
  position: absolute;
  top: 10%;
}

.card-login {
  position: absolute;
  top: 28%;
}

.title-login {
  color: #0d47a1;
  display: flex;
  justify-content: center;
}

@media (max-width: 575.98px) {
  .image-background {
    width: 350px;
  }
}
</style>
