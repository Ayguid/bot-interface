<script setup>
import { ref, watch, computed } from 'vue'
//import { useRoute } from 'vue-router'
import { state } from "@/sockets";
import { Line } from 'vue-chartjs'
import annotationPlugin from 'chartjs-plugin-annotation';
import {  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
} from 'chart.js'
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
)
//const route = useRoute()
const loading = ref(false)
const error = ref(null)
const search = ref(null)
//
const stochChartData = computed(() => {
  let indicatorsCharts = {};
  let clone = JSON.parse(JSON.stringify(state.pairs)) // to avoid mutating state
  clone.forEach(pair => {
    let indicatorLabels = [];
    let indicatorSTOCH = [];
    let indicatorSTOCHk = [];
    let indicatorSTOCHd = [];
    pair.indicators.stoch_rsi.forEach((stochDatapoint, i) => {
      indicatorLabels.push(i);
      indicatorSTOCH.push(stochDatapoint.stochRSI)
      indicatorSTOCHk.push(stochDatapoint.k)
      indicatorSTOCHd.push(stochDatapoint.d)
    });
    indicatorsCharts[pair.key] = {
      labels: indicatorLabels,
      datasets: [
        { label: 'stoch_rsi', backgroundColor: '#f44336', data: indicatorSTOCH, borderColor: '#f44336', tension: 0.2 , borderWidth: 2, pointRadius: 2, pointHoverRadius: 2},
        { label: 'stoch_k', backgroundColor: '#36A2EB', data: indicatorSTOCHk, borderColor: '#36A2EB', tension: 0.2 , borderWidth: 2, pointRadius: 2, pointHoverRadius: 2 },
        { label: 'stoch_d', backgroundColor: '#449848', data: indicatorSTOCHd, borderColor: '#449848', tension: 0.2 , borderWidth: 2, pointRadius: 2, pointHoverRadius: 2 },
      ],
      options: {//chart options 
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          annotation: {
            annotations: {
              line1: {
                type: 'line',
                borderDash: [6, 6],
                yMin: pair.stochBuyLimit,
                yMax: pair.stochBuyLimit,
                borderColor: '#FFFFFF',
                borderWidth: 1,
                label: {
                  display: true,
                  content: 'Stoch RSI limit ',//(ctx) => 'Average: ' + average(ctx).toFixed(2),
                  position: 'start'
                },
              }
            }
          }
        }
      }
    };
  });
  return indicatorsCharts;
});

const macdChartData = computed(() => {
  let indicatorsCharts = {};
  let clone = JSON.parse(JSON.stringify(state.pairs)) // to avoid mutating state
  clone.forEach(pair => {
    let indicatorLabels = [];
    let indicatorSTOCH = [];
    let indicatorSTOCHk = [];
    let indicatorSTOCHd = [];
    pair.indicators.macd.forEach((macdDatapoint, i) => {
      indicatorLabels.push(i);
      indicatorSTOCH.push(macdDatapoint.MACD)
      indicatorSTOCHk.push(macdDatapoint.signal)
      indicatorSTOCHd.push(macdDatapoint.histogram)
    });
    indicatorsCharts[pair.key] = {
      labels: indicatorLabels,
      datasets: [
        { label: 'MACD', backgroundColor: '#f44336', data: indicatorSTOCH, borderColor: '#f44336', tension: 0.2, borderWidth: 2, pointRadius: 2, pointHoverRadius: 2 },
        { label: 'signal', backgroundColor: '#36A2EB', data: indicatorSTOCHk, borderColor: '#36A2EB', tension: 0.2, borderWidth: 2, pointRadius: 2, pointHoverRadius: 2 },
        { label: 'histogram', backgroundColor: '#449848', data: indicatorSTOCHd, borderColor: '#449848', tension: 0.2, borderWidth: 2, pointRadius: 2, pointHoverRadius: 2 },
      ],
      options: {//chart options 
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          annotation: {
            annotations: {
              line1: {
                type: 'line',
                borderDash: [6, 6],
                yMin: pair.macdBuyLimit,
                yMax: pair.macdBuyLimit,
                borderColor: '#FFFFFF',
                borderWidth: 1,
                label: {
                  display: true,
                  content: 'MACD limit ',//(ctx) => 'Average: ' + average(ctx).toFixed(2),
                  position: 'start'
                },
              }
            }
          }
        }
      }
    };
  });
  return indicatorsCharts;
});

const triggerChart = computed(() => {
  let indicatorsCharts = {};
  let clone = JSON.parse(JSON.stringify(state.pairs)) // to avoid mutating state
  clone.forEach(pair => {
    let indicatorLabels = ['', ''];
    indicatorsCharts[pair.key] = {
      labels: indicatorLabels,
      datasets: [
        { label: 'LowTrig', backgroundColor: '#f44336', data: [pair?.triggers?.downTrigger, pair?.triggers?.downTrigger], borderColor: '#f44336', tension: 0.2 },
        { label: 'C price', backgroundColor: '#36a2eb', data: [pair.currentPrice.price, pair.currentPrice.price], borderColor: '#36a2eb', tension: 0.2, borderDash: [5, 5], },
        { label: 'UpTrig', backgroundColor: '#449848', data: [pair?.triggers?.upTrigger, pair?.triggers?.upTrigger], borderColor: '#449848', tension: 0.2 },
      ],
      options: {//chart options 
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
        }
      }
    };
  });
  return indicatorsCharts;
});


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

const readTimeStamp = (timestamp) => {
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
                  <h4 class="py-2"><span class="text-amber">{{ item.raw.key }}</span> - <span
                      class="text-orange">CurrentPrice:
                    </span> {{
                      item.raw.currentPrice.price }} - <span class="text-orange">AvgPrice: </span>{{
                      item.raw.avgPrice.price }}</h4>
                </v-card-title>
                <v-card-text>
                  <v-row no-gutters>
                    <v-col cols="12" sm="4">
                      <Line v-if="stochChartData[item.raw.key]" :data="stochChartData[item.raw.key]"
                        :options="stochChartData[item.raw.key].options" />
                    </v-col>
                    <v-col cols="12" sm="4">
                      <Line v-if="macdChartData[item.raw.key]" :data="macdChartData[item.raw.key]"
                        :options="macdChartData[item.raw.key].options" />
                    </v-col>
                    <v-col v-if="item.raw.triggers" cols="12" sm="4">
                      <Line v-if="triggerChart[item.raw.key]" :data="triggerChart[item.raw.key]"
                        :options="triggerChart[item.raw.key].options" />
                    </v-col>
                  </v-row>
                  <span class="text-green">STOCH RSI:&nbsp;</span>{{ item.raw.indicators.CURRENT_STOCH_RSI }}&nbsp;<span
                    class="text-orange">Below limit:&nbsp;</span>{{ item.raw.indicators.CURRENT_STOCH_RSI.k <
                      item.raw.stochBuyLimit }} {{ item.raw.stochBuyLimit }}<br>
                    <span class="text-green">MACD:&nbsp;</span>{{ item.raw.indicators.CURRENT_MACD }}&nbsp;<span
                      class="text-orange">Below limit:&nbsp;</span>{{ item.raw.indicators.CURRENT_MACD.signal <
                        item.raw.macdBuyLimit }} {{ item.raw.macdBuyLimit }} <br>
                      <span class="text-green">ADX:&nbsp;</span>{{ item.raw.indicators.CURRENT_ADX }}&nbsp;
                      {{ (item.raw.indicators.CURRENT_ADX.adx + item.raw.indicators.CURRENT_ADX.pdi +
                        item.raw.indicators.CURRENT_ADX.mdi) / 3 }}
                      {{ item.raw.indicators.CURRENT_ADX.pdi + item.raw.indicators.CURRENT_ADX.mdi }}
                      <br>
                      <span v-if="item.raw.triggers"><span class="text-red">Down trigger:&nbsp;</span>{{
                        item.raw.triggers.downTrigger }}:&nbsp;<span class="text-green">Up trigger:&nbsp;</span>{{
                          item.raw.triggers.upTrigger }}</span>
                      <span v-else>No active order -> No triggers</span>
                </v-card-text>

                <div class="px-4">
                  <v-switch :label="`${isExpanded(item) ? 'Hide' : 'Show'} orders`" :model-value="isExpanded(item)"
                    density="compact" inset @click="() => toggleExpand(item)"></v-switch>
                </div>

                <v-divider></v-divider>

                <v-expand-transition>
                  <div v-if="isExpanded(item)">
                    <v-card title="Orders" flat>
                      <template v-slot:text>
                        <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify"
                          variant="outlined" hide-details single-line></v-text-field>
                      </template>
                      <v-data-table :items="item.raw.orders" :search="search" calculate-widths
                        :row-props="itemRowBackground">
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