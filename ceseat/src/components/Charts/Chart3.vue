<template>
    <div id="chart3">
        <apexchart width="500" :options="options" :series="options.series"></apexchart>
      </div>
</template>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto);

body {
  font-family: Roboto, sans-serif;
}

#chart3 {
  max-width: 650px;
  margin: 35px auto;
}

</style>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import apexchart from 'vue-apexcharts';

@Component({
  components: { apexchart },
})
export default class chart3 extends Vue{
  @Prop() dates!:Array<Date>;
  @Prop() prices!:Array<number>;

  public options = {
        chart: {
          type: 'area'
        },
        series: [{
          name: 'sales',
          data: [0,1,2,3]
        }],
        xaxis: {
          categories: ['0','1','2','3']
        }
      }
  public series:Array<number> = [];
  created(): void {
    console.log('chart3', this.prices);
    console.log('chart3', this.dates.map(date => date.toTimeString()));
    this.options = {chart: {type: 'area'},series: [{name: 'sales',data: this.prices}],xaxis: {categories: this.dates.map(date => date.toDateString())}};
  }


  @Watch('prices')
  @Watch('dates')
  updateChart(): void {
    console.log('chart3up', this.prices);
    console.log('chart3up', this.dates.map(date => date.toTimeString()));
    this.options = {chart: {type: 'area'},series: [{name: 'sales',data: this.prices}],xaxis: {categories: this.dates.map(date => date.toDateString())}};
  }
};
</script>
