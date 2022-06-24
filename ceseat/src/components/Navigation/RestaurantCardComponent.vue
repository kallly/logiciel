<template>
  <v-container>
    <div class = "RestaurantCardComponent"> 
    <h>this is a RestaurantCardComponent </h>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'RestaurantCardComponent'
});
</script>

<template>
  <v-card class="mt-4" max-width="344">
    <v-img :src="Restaurant.img" height="200px"></v-img>

    <v-card-title> {{ Restaurant.name }} </v-card-title>

    <v-card-actions>
        <!-- link button to restaurant-->
        Go
      <v-spacer></v-spacer>

    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{ product.description }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import RestaurantModel from "../../models/RestaurantModel";

@Component
export default class RestaurantCard extends Vue {
  @Prop() RestaurantModel!: RestaurantModel;

  show = false;

  public addProduct(): void {
    this.$emit("productAdded", true);
  }
}
</script>