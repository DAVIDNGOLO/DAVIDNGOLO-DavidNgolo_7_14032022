<template>
  <div id="app">
    <nav></nav>
    <router-view />
  </div>
</template>
<script></script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #4e5166;
}
nav {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: #4e5166;
}
nav a.router-link-exact-active {
  color: #fd2d01;
}
</style>
