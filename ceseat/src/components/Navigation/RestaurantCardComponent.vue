<template>

  <v-card class="mt-4" max-width="344">
    <!--<v-img :src="${prodrestaurantModel.img}" height="200px"></v-img>-->

    <v-card-title> {{ restaurantModel.name }} </v-card-title>
        <v-card-actions>
        <v-chip color="purple" outlined>
          <router-link :to="`/restaurant/${restaurantModel.name}`" tag="button" color="deep-purple lighten-2"> 
           Passer commande
          </router-link>
          </v-chip>
            <v-btn icon @click="show = !show" >
              <v-icon>
                {{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
              </v-icon>
            </v-btn>
          </v-card-actions>
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
          <v-card-text>
            {{ restaurantModel.description }}
          </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
import useRoute from "vue-router"
import { Component, Prop, Vue } from "vue-property-decorator"
import RestaurantModel from "../../models/RestaurantModel.vue"
@Component
export default class RestaurantCardComponent extends Vue {
    @Prop() restaurantModel!: RestaurantModel;
    show = false;
}
</script>