<script setup>
import { ref, computed } from 'vue'
//import { useRoute } from 'vue-router'
import { state } from "@/sockets";

//const route = useRoute();

//data properties
const loading = ref(false)
const error = ref(null)
const search = ref(null)

//computed
const computedAccount = computed(() => {
  return state.account
})

//methods

</script>
<template>
  <div class="post">
    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="computedAccount" class="content">

      <v-card title="Assets" flat>
        <template v-slot:text>
          <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined" hide-details
            single-line></v-text-field>
        </template>

        <v-data-table :items="computedAccount.balances" :search="search">
          <template v-slot:item.free="{ value }">
            <span class="text-green">{{ value }}</span>
          </template>
          <template v-slot:item.locked="{ value }">
            <span class="text-orange">{{ value }}</span>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </div>
</template>


<style>
/*
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
*/
</style>
