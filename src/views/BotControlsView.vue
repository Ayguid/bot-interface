<script setup>
import { ref, watch, computed } from 'vue'
import { state } from "@/sockets";
//import { useRoute } from 'vue-router'
//const route = useRoute()

// watch the params of the route to fetch the data again
//watch(() => route.params.id, fetchData, { immediate: true })
//computeds
//methods

</script>
<template>
  <div class="">

    <h3 class="py-6">BOT CONTROLS</h3>
    <v-container class="bg-surface-variant">
    <v-row no-gutters>
      <v-col cols="12" sm="4">
        <v-btn @click="state.startBotEmit()">
          Start Bot
        </v-btn>
      </v-col>
      <v-col cols="12" sm="4">
        <v-btn @click="state.stopBotEmit()">
          Stop Bot
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
    <div>


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