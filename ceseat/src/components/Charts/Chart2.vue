<template>
    <div id="chart2">
        <apexchart width="500" :options="options" :series="options.series"></apexchart>
      </div>
</template>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto);

body {
  font-family: Roboto, sans-serif;
}

#chart2 {
  max-width: 650px;
  margin: 35px auto;
}

</style>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import apexchart from 'vue-apexcharts'

@Component({
  components: { apexchart },
})
export default class Chart2 extends Vue{
  @Prop() products!:Array<string>;
  @Prop() numbers!:Array<number>;

  public options = {
        chart: {
          type: 'bar'
        },
        series: [{
          name: 'sales',
          data: [0,0]
        }],
        xaxis: {
          categories: ['0','0']
        }
      }
  created(): void {
    console.log('chart2', this.numbers);
    console.log('chart2', this.products);
    this.options.series[0].data = this.numbers;
    this.options.xaxis.categories = this.products;
  }

  @Watch('products')
  @Watch('numbers')
  updateChart(): void {
    console.log('chart2up', this.numbers);
    console.log('chart2up', this.products);
    this.options = {chart: {type: 'bar'},series: [{name: 'sales',data: this.numbers}],xaxis: {categories: this.products}};
  }
};
</script>
