<script setup>
import { computed } from 'vue'
import { Line, Bar } from 'vue-chartjs'
import annotationPlugin from 'chartjs-plugin-annotation';
import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, Filler
} from 'chart.js'
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    annotationPlugin,
    Filler
);
//
const annotationFontSize = 10;
const pointRadius = 1;
const pointHoverRadius = 1;
const borderWidth = 1;
//
const props = defineProps({
    pair: {
        type: Object,
        required: true
    }
});
//
const stochChartData = computed(() => {
    let indicatorsCharts = {};
    //let clone = JSON.parse(JSON.stringify(this.pair)) // to avoid mutating state
    let indicatorLabels = [];
    let indicatorSTOCH = [];
    let indicatorSTOCHk = [];
    let indicatorSTOCHd = [];
    props.pair.indicators.stoch_rsi.forEach((stochDatapoint, i) => {
        indicatorLabels.push(i);
        indicatorSTOCH.push(stochDatapoint.stochRSI)
        indicatorSTOCHk.push(stochDatapoint.k)
        indicatorSTOCHd.push(stochDatapoint.d)
    });
    indicatorsCharts = {
        labels: indicatorLabels,
        datasets: [
            { label: 'stoch_rsi', backgroundColor: '#f44336', data: indicatorSTOCH, borderColor: '#f44336', tension: 0.2, borderWidth: borderWidth, pointRadius: pointRadius, pointHoverRadius: pointHoverRadius },
            { label: 'stoch_k', backgroundColor: '#36A2EB', data: indicatorSTOCHk, borderColor: '#36A2EB', tension: 0.2, borderWidth: borderWidth, pointRadius: pointRadius, pointHoverRadius: pointHoverRadius },
            { label: 'stoch_d', backgroundColor: '#449848', data: indicatorSTOCHd, borderColor: '#449848', tension: 0.2, borderWidth: borderWidth, pointRadius: pointRadius, pointHoverRadius: pointHoverRadius },
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
                            yMin: props.pair.stochBuyLimit,
                            yMax: props.pair.stochBuyLimit,
                            borderColor: '#FFFFFF',
                            borderWidth: 1,
                            label: {
                                display: true,
                                //backgroundColor: 'rgba(245,245,245)',
                                content: 'Stoch RSI limit ',//(ctx) => 'Average: ' + average(ctx).toFixed(2),
                                position: 'start',
                                font: {
                                    size: annotationFontSize
                                }
                            },
                        }
                    }
                }
            }
        }
    };
    return indicatorsCharts;
});

const macdChartData = computed(() => {
    let indicatorsCharts = {};
    let indicatorLabels = [];
    let indicatorMACD= [];
    //let indicatorMACDs = [];
    //let indicatorMACDh = [];
    //console.log(props.pair.indicators.macd.length)
    props.pair.indicators.macd.forEach((macdDatapoint, i) => {
        indicatorLabels.push(i);
        indicatorMACD.push(macdDatapoint.MACD)
        //indicatorMACDs.push(macdDatapoint.signal)
        //indicatorMACDh.push(macdDatapoint.histogram)
    });
    indicatorsCharts = {
        labels: indicatorLabels,
        datasets: [
            { label: 'MACD', backgroundColor: '#36A2EB', data: indicatorMACD, borderColor: '#36A2EB', tension: 0.2, borderWidth: borderWidth, pointRadius: pointHoverRadius, pointHoverRadius: pointHoverRadius },
            //{ label: 'signal', backgroundColor: '#f44336', data: indicatorMACDs, borderColor: '#f44336', tension: 0.2, borderWidth: borderWidth, pointRadius: pointRadius, pointHoverRadius: pointHoverRadius },
            //{ label: 'histogram', backgroundColor: '#449848', data: indicatorMACDh, borderColor: '#449848', tension: 0.2, borderWidth: borderWidth, pointRadius: pointRadius, pointHoverRadius: pointHoverRadius },
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
                            yMin: props.pair.macdBuyLimit,
                            yMax: props.pair.macdBuyLimit,
                            borderColor: '#FFFFFF',
                            borderWidth: 1,
                            label: {
                                display: true,
                                content: 'MACD limit ',//(ctx) => 'Average: ' + average(ctx).toFixed(2),
                                position: 'start',
                                font: {
                                    size: annotationFontSize
                                }
                            },
                        }
                        
                    }
                }
            }
        }
    };

    return indicatorsCharts;
});

const adxChartData = computed(() => {
    let indicatorsCharts = {};
    let indicatorLabels = [];
    let indicatorADX = [];
    //let indicatorADXpdi = [];
    //let indicatorADXmdi = [];
    //console.log(props.pair.indicators.adx.length)
    props.pair.indicators.adx.forEach((adxdDatapoint, i) => {
        indicatorLabels.push(i);
        indicatorADX.push(adxdDatapoint.adx)
        //indicatorADXpdi.push(adxdDatapoint.pdi)
        //indicatorADXmdi.push(adxdDatapoint.mdi)
    });
    indicatorsCharts = {
        labels: indicatorLabels,
        datasets: [
            { label: 'ADX', backgroundColor: '#f44336', data: indicatorADX, borderColor: '#f44336', tension: 0.2, borderWidth: borderWidth, pointRadius: pointRadius, pointHoverRadius: pointHoverRadius },
            //{ label: 'pdi', backgroundColor: '#36A2EB', data: indicatorADXpdi, borderColor: '#36A2EB', tension: 0.2, borderWidth: borderWidth, pointRadius: pointRadius, pointHoverRadius: pointHoverRadius },
            //{ label: 'mdi', backgroundColor: '#449848', data: indicatorADXmdi, borderColor: '#449848', tension: 0.2, borderWidth: borderWidth, pointRadius: pointRadius, pointHoverRadius: pointHoverRadius },
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
                            yMin: props.pair.adxBuyLimit,
                            yMax: props.pair.adxBuyLimit,
                            borderColor: '#FFFFFF',
                            borderWidth: 1,
                            label: {
                                display: true,
                                content: 'ADX limit ',//(ctx) => 'Average: ' + average(ctx).toFixed(2),
                                position: 'start',
                                font: {
                                    size: annotationFontSize
                                }
                            },
                        }
                    }
                }
            }
        }
    };

    return indicatorsCharts;
});

const aoChartData = computed(() => {
    let indicatorsCharts = {};
    let indicatorLabels = [];
    let indicatorAO = [];
    //console.log(props.pair.indicators.ao.length)
    props.pair.indicators.ao.forEach((aoDatapoint, i) => {
        indicatorLabels.push(i);
        indicatorAO.push(aoDatapoint)
    });
    indicatorsCharts = {
        labels: indicatorLabels,
        datasets: [
            { label: 'AO', backgroundColor: '#f44336', data: indicatorAO, borderColor: '#f44336', tension: 0.2, borderWidth: borderWidth, pointRadius: pointRadius, pointHoverRadius: pointHoverRadius },
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
                            yMin: props.pair.aoBuyLimit,
                            yMax: props.pair.aoBuyLimit,
                            borderColor: '#FFFFFF',
                            borderWidth: 1,
                            label: {
                                display: true,
                                content: 'AO limit ',//(ctx) => 'Average: ' + average(ctx).toFixed(2),
                                position: 'start',
                                font: {
                                    size: annotationFontSize
                                }
                            },
                        }
                    }
                }
            }
        }
    };

    return indicatorsCharts;
});

const closingCandlesChartData = computed(() => {
    let indicatorsCharts = {};
    let indicatorLabels = [];
    let indicatorAO = [];
    //const clonedCandles = JSON.parse(JSON.stringify(props.pair.indicators.filterCandlesClosing)).slice(Math.max(props.pair.indicators.filterCandlesClosing.length - 20, 0));
    props.pair.indicators.filterCandlesClosing.forEach((candleClose, i) => {
        indicatorLabels.push(i);
        indicatorAO.push(candleClose)
    });
    indicatorsCharts = {
        labels: indicatorLabels,
        datasets: [
            { label: 'Close Pr', fill: true, backgroundColor: '#a475127a', data: indicatorAO, borderColor: '#db980b', tension: 0.2, borderWidth: borderWidth, pointRadius: pointRadius, pointHoverRadius: pointHoverRadius },
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
                            yMin: props.pair.currentPrice.price,
                            yMax: props.pair.currentPrice.price,
                            borderColor: '#FFFFFF',
                            borderWidth: 1,
                            label: {
                                display: true,
                                content: 'C Price ',//(ctx) => 'Average: ' + average(ctx).toFixed(2),
                                position: 'start',
                                font: {
                                    size: annotationFontSize
                                }
                            },
                        }
                    }
                }
            }
        }
    };

    return indicatorsCharts;
});

const triggerChart = computed(() => {
    let indicatorsCharts = {};

    let indicatorLabels = ['', ''];
    indicatorsCharts = {
        labels: indicatorLabels,
        datasets: [
            ...props.pair?.triggers?.downTrigger ? [{ label: 'LowTrig', backgroundColor: '#f44336', data: [props.pair?.triggers?.downTrigger, props.pair?.triggers?.downTrigger], borderColor: '#f44336', tension: 0.2 }] : [],
            { label: 'C price', backgroundColor: '#36a2eb', data: [props.pair.currentPrice.price, props.pair.currentPrice.price], borderColor: '#36a2eb', tension: 0.2, borderDash: [5, 5] },
            { label: 'O price', backgroundColor: '#FFFFFF', data: [props.pair?.triggers?.orderPriceD, props.pair?.triggers?.orderPriceD], borderColor: '#FFFFFF', tension: 0.2, borderDash: [5, 5] },
            ...props.pair?.triggers?.upTrigger ? [{ label: 'UpTrig', backgroundColor: '#449848', data: [props.pair?.triggers?.upTrigger, props.pair?.triggers?.upTrigger], borderColor: '#449848', tension: 0.2 }] : [],
        ],
        options: {//chart options 
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
            }
        }
    }

    return indicatorsCharts;
});

</script>
<template>
    <div class="">
        <v-row no-gutters>
            <v-col cols="12" sm="4">
                <Line v-if="stochChartData" :data="stochChartData" :options="stochChartData.options" />
            </v-col>
            <v-col cols="12" sm="4">
                <Line v-if="macdChartData" :data="macdChartData" :options="macdChartData.options" />
            </v-col>
            <v-col cols="12" sm="4">
                <Line v-if="adxChartData" :data="adxChartData" :options="adxChartData.options" />
            </v-col>
            <v-col cols="12" sm="4">
                <Bar v-if="aoChartData" :data="aoChartData" :options="aoChartData.options" />
            </v-col>
            <v-col cols="12" sm="4">
                <Line v-if="closingCandlesChartData" :data="closingCandlesChartData" :options="closingCandlesChartData.options" />
            </v-col>
            <v-col v-if="pair.triggers" cols="12" sm="4">
                <Line v-if="triggerChart" :data="triggerChart" :options="triggerChart.options" />
            </v-col>
        </v-row>

    </div>
</template>

<style></style>