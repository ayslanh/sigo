<template>
  <highcharts :options="chartOptions"></highcharts>
</template>

<script>
import { Chart } from "highcharts-vue";

export default {
  components: {
    highcharts: Chart
  },

  props: {
    typeChart: {
      type: String
    },
    categories: {
      type: Array
    },
    titleY: {
      type: String
    },
    titleX: {
      type: String
    },
    chartSeries: {
      type: Array
    },
    percent: {
      type: Boolean,
      default: false
    },
    stacking: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      chartOptions: {
        chart: {
          type: this.typeChart,
          zoomType: "xy"
        },
        title: {
          text: ""
        },
        xAxis: {
          categories: this.categories,
          title: {
            text: this.titleX
          }
        },
        yAxis: {
          title: {
            text: this.titleY
          }
        },
        plotOptions: {
          column: {
            stacking: this.stacking,
            dataLabels: {
              enabled: true,
              format: this.percent ? "{point.y:.1f}%" : "{point.y:.0f}"
            }
          }
        },
        series: this.chartSeries,

        credits: {
          enabled: false
        }
      }
    };
  }
};
</script>

<style lang="scss"></style>
