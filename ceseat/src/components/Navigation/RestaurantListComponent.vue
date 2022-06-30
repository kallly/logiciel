<template>
  <div>
    <v-container class="restaurantList">
      <v-row no-gutters>
        <v-col v-for="restaurant in restaurants" :key="restaurant._id" cols="12" sm="4">
          <RestaurantCardComponent
            :restaurant="restaurant"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import RestaurantCardComponent from '../Navigation/RestaurantCardComponent.vue'
import Restaurant from "../../models/Restaurant";
  
@Component({ components: { RestaurantCardComponent } })
export default class RestaurantListComponent extends Vue {
  @Prop() restaurants!: Array<Restaurant>;
}
</script>