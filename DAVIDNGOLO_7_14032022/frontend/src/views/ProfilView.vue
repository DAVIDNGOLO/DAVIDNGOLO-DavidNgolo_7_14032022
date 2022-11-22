<template>
  <div class="logoSignin">
    <div class="header">
      <img alt="groupomania logo" src="../assets/icon-left-font.png" />
      <nav>
        <router-link to="/FeedView">Feed </router-link>
      </nav>
    </div>

    <div class="logoSignin">
      <p class="acceuilSignin">
        Bienvenue {{ userInfos.pseudo }} <br />
        ({{ userInfos.email }})
      </p>
    </div>

    <div>
      <input
        @click="logout()"
        class="Bouton"
        type="button"
        value="Déconnexion"
      />
    </div>
    <div></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ProfilView",
  mounted() {
    if (!this.$store.state.user.token) {
      this.$router.push("/");
    }
  },
  computed: {
    ...mapState({
      userInfos: "userInfos",
    }),
  },

  methods: {
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-around;
}
nav {
  margin-top: 3.6rem;
  text-decoration: transparent;
}
</style>
