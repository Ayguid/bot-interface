<script setup>
defineProps({
  pair: {
    type: Object,
    required: true
  }
})
</script>
<template>
  <div class="">
    <span class="text-green">STOCH RSI:&nbsp;</span>{{ pair.indicators.CURRENT_STOCH_RSI }}&nbsp;
    <span class="text-orange">Below limit:&nbsp;</span>{{ pair.indicators.CURRENT_STOCH_RSI.k < pair.stochBuyLimit }} {{
      pair.stochBuyLimit }} <br>
      <span class="text-green">MACD:&nbsp;</span>{{ pair.indicators.CURRENT_MACD }}&nbsp;
      <span class="text-orange">Below limit:&nbsp;</span>{{ pair.indicators.CURRENT_MACD.MACD < pair.macdBuyLimit }}
        {{ pair.macdBuyLimit }} <br>
        <span class="text-green">ADX:&nbsp;</span>{{ pair.indicators.CURRENT_ADX }}&nbsp;
        <span class="text-orange">Below limit:&nbsp;</span>{{ pair.indicators.CURRENT_ADX.adx < pair.adxBuyLimit }} {{
          pair.adxBuyLimit }} <br>
          <span class="text-green">AO:&nbsp;</span>{{ pair.indicators.CURRENT_AO }}
          <span class="text-orange">Below limit:&nbsp;</span>{{ pair.indicators.CURRENT_AO < pair.aoBuyLimit }} {{
            pair.aoBuyLimit }} <br>
            <span v-if="pair.triggers"><span class="text-red">Down trigger:&nbsp;</span>{{ pair.triggers.downTrigger
              }}:&nbsp;<span class="text-green">Up trigger:&nbsp;</span>{{
                pair.triggers.upTrigger }}</span>
            <span v-else>No active order -> No triggers</span>
  </div>
</template>

<style></style>