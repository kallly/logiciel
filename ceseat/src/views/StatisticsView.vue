<template>
<div class="Statistics">
  <TopbarComponent/>
  <v-container>
     <v-row>
    <v-col>
      <Chart1 :dates="dates" :prices="prices"/>
    </v-col>
    <v-col>
      <Chart2 :products="products" :numbers="numbers"/>
    </v-col>
    <v-col>
      <Chart3 :products="products" :numbers="numbers"/>
    </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ResizerComponent from '../components/Responsive/ResizerComponent.vue';
import TopbarComponent from '../components/Navigation/TopbarComponent.vue';
import Chart1 from '../components/Charts/Chart1.vue';
import Chart2 from '../components/Charts/Chart2.vue';
import Chart3 from '../components/Charts/Chart3.vue';
import Statistic from "../models/Statistic";
import StatisticsService from "../services/StatisticsService";

@Component({
  components: { Chart1, Chart2, Chart3, TopbarComponent, ResizerComponent },
})
export default class StatisticView extends Vue {
  public statistics: Array<Statistic> = [];
  private statisticsService!: StatisticsService;

  public dates: Array<Date> = [];
  public prices: Array<number> = [];

  public products: Array<string> = [];
  public numbers: Array<number> = [];

  async created(): Promise<void> {
    this.statisticsService = new StatisticsService();
    this.statistics = await this.statisticsService.getStatistics();

    this.statistics.forEach(statistic => {
      this.dates.push(new Date(statistic.date));
      this.prices.push(statistic.price);
    });
    let temp_products:Array<string> = [];
    let temp_numbers:Array<number> = [];
    this.statistics.forEach(statistic => {
      statistic.products.forEach(product => {
        let index = temp_products.indexOf(product);
        if(index == -1){
          temp_products.push(product);
          temp_numbers.push(0);
          index = temp_products.length - 1;
        }
        temp_numbers[index] += 1;
      });
    });
    this.products = temp_products;
    this.numbers = temp_numbers;

    console.log('init', this.products);
    console.log('init', this.numbers);
  }
}
</script>
