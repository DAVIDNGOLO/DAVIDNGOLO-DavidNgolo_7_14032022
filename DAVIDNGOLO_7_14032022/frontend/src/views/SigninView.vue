<template>
  <div class="logoSignin">
    <img alt="groupomania logo" src="../assets/icon-left-font.png" />
    <div class="logoSignin">
      <p class="acceuilSignin">
        Bienvenue sur votre réseau social d'entreprise
      </p>
    </div>
    <div>
      <h1>Connexion</h1>
    </div>
    <div class="signinConnexion">
      <h2>Email</h2>

      <div>
        <input v-model="email" type="email" />
      </div>
    </div>
    <div class="signinConnexion">
      <h2>Password</h2>

      <div>
        <input v-model="password" type="password" />
      </div>
    </div>
    <div>
      <input
        @click="login()"
        class="Bouton"
        :class="{ 'button--disabled': !validatedFields }"
        type="button"
        value="Connexion"
      />
      <span v-if="status == 'loading'"> Connexion en cours... </span>
    </div>
    <div></div>
    <div id="app">
      <nav>Pas de compte ?<router-link to="/">Inscription </router-link></nav>
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "SigninView",
  data: function () {
    return {
      mode: "signinview",
      email: "",
      password: "",
    };
  },

  computed: {
    validatedFields: function () {
      if (this.email != "" && this.password != "") {
        return true;
      } else {
        return false;
      }
    },
    ...mapState(["status"]),
  },
  methods: {
    login: function () {
      const self = this;
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then(
          function () {
            self.$router.push("/FeedView");
          },
          function (error) {
            console.log(error);
          }
        );
    },
  },
};
</script>

<style scoped>
img {
  width: 200px;
  align-items: center;
}
.acceuilSignin {
  align-items: center;
  font-size: 0.8rem;
  color: #4e5166;
}
h1 {
  display: flex;
  margin-top: 3rem;
  margin-bottom: 2rem;
  font-size: 1.3rem;
  justify-content: center;
}
h2 {
  font-size: 1rem;
  color: #fd2d01;
}
input {
  height: 1.3rem;
}
.Bouton {
  margin-top: 3rem;
  border: 0;
  line-height: 2;
  padding: 0px 30px;
  font-size: 0.6rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  text-align: center;
  color: #fff;
  text-shadow: 1px 1px 1px #000;
  border-radius: 10px;
  background-color: rgb(220, 62, 62);
  box-shadow: inset 2px 2px 3px rgba(255, 255, 255, 0.6),
    inset -2px -2px 3px rgba(0, 0, 0, 0.6);
}
.button--disabled {
  color: grey;
}
.styled:hover {
  background-color: rgba(255, 0, 0, 1);
}
.styled:active {
  box-shadow: inset -2px -2px 3px rgba(255, 255, 255, 0.6),
    inset 2px 2px 3px rgba(0, 0, 0, 0.6);
}
</style>
