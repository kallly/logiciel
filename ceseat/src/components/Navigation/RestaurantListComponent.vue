<template>
  <div>
    <v-container class="grey lighten-5">
      <v-row no-gutters>
        <v-col v-for="restaurant in restaurants" :key="restaurant.id" cols="12" sm="4">
          <RestaurantCardComponent
            :restaurantModel="restaurant"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import RestaurantCardComponent from '../Navigation/RestaurantCardComponent.vue'
import RestaurantModel from '../../models/RestaurantModel'
  
@Component({ components: { RestaurantCardComponent } })
export default class RestaurantListComponent extends Vue {
  @Prop() restaurants!: Array<RestaurantModel>;
}
</script>