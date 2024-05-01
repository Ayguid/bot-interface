<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { state } from "@/sockets";
</script>

<template>
  <header>

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Bot controls</RouterLink>
        <RouterLink to="/account">Account</RouterLink>
        <RouterLink to="/pairs">Pairs</RouterLink>
      </nav>
    </div>
  </header>

  <div>
    <v-divider :thickness="2"></v-divider>
    <RouterView />

    <v-container class="bg-surface-variant">
      <v-row no-gutters>

        <v-col cols="12" sm="4">
          <v-btn @click="state.snackbar = !state.snackbar">
            Snackbar
          </v-btn>
          <v-snackbar v-model="state.snackbar" :timeout="-1" location="bottom right">
            <pre>{{ state.snackbar_msg }}</pre>
            <template v-slot:actions>
              <v-btn color="pink" variant="text" @click="state.snackbar = false" >
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </v-col>

      </v-row>
    </v-container>
  </div>

</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    /*display: flex;*/
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    /*display: flex;*/
    padding-top: 1em;
    place-items: flex-start;
    flex-wrap: wrap;
  }


}
</style>
