<script setup>
import { ref, watch, computed } from 'vue'
//import { useRoute } from 'vue-router'
import { state } from "@/sockets";
//const route = useRoute()
const loading = ref(false)
const error = ref(null)
const search = ref(null)
// watch the params of the route to fetch the data again
//watch(() => route.params.id, fetchData, { immediate: true })
//computeds
const computedPairs = computed(() => {
  if (state.pairs) {//it returns null at load
    let clone = JSON.parse(JSON.stringify(state.pairs)) // to avoid mutating state
    for (const pair in clone) {
      clone[pair].orders = clone[pair].orders.map((
        { orderId, price, origQty, executedQty, side, status, time, updateTime }) => ({ orderId, price, origQty, executedQty, side, status, time: readTimeStamp(time), updateTime: readTimeStamp(updateTime), actions: false }))
    }
    return clone
  }
})
//methods
const getColor = (type) => {
  if (type == 'SELL') return 'red'
  else if (type == 'BUY') return 'green'
  else return 'green'
}

const itemRowBackground = (item) => {
  //console.log(item)
  if (item.item.status == 'CANCELED') return { class: 'text-orange' };
  return;
}

const readTimeStamp = (timestamp) =>{
  return new Date(timestamp).toLocaleString();
}
</script>
<template>
  <div class="">
    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="computedPairs" class="">

      <v-data-iterator :items="computedPairs" item-value="key">
        <template v-slot:default="{ items, isExpanded, toggleExpand }">
          <v-row>
            <v-col v-for="item in items" :key="item.key" cols="12">

              <v-card>
                <v-card-title class="d-flex align-center">
                  <!--
                    <v-icon :color="item.raw.color" :icon="item.raw.icon" size="18" start></v-icon>
                  -->
                  <h3 class="py-6"><span class="text-amber">{{ item.raw.key }}</span> - <span
                      class="text-orange">CurrentPrice:
                    </span> {{
                      item.raw.currentPrice.price }} - <span class="text-orange">AvgPrice: </span>{{
                      item.raw.avgPrice.price }}</h3>
                </v-card-title>

                <v-card-text>
                  {{ item.raw.key }}
                </v-card-text>

                <div class="px-4">
                  <v-switch :label="`${isExpanded(item) ? 'Hide' : 'Show'} orders`" :model-value="isExpanded(item)" density="compact" inset @click="() => toggleExpand(item)"></v-switch>
                </div>

                <v-divider></v-divider>

                <v-expand-transition>
                  <div v-if="isExpanded(item)">
                    <v-card title="Orders" flat>
                      <template v-slot:text>
                        <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify"
                          variant="outlined" hide-details single-line></v-text-field>
                      </template>
                      <v-data-table :items="item.raw.orders" :search="search" calculate-widths :row-props="itemRowBackground">
                        <template v-slot:item.side="{ value }">
                          <v-chip :color="getColor(value)">
                            {{ value }}
                          </v-chip>
                        </template>
                        <template v-slot:item.actions>
                          <v-chip>
                            CANCEL
                          </v-chip>
                        </template>
                      </v-data-table>
                    </v-card>
                  </div>
                </v-expand-transition>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>

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