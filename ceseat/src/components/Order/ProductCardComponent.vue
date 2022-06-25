<template>
  <v-card class="mt-4" max-width="344">
    <v-card-title> {{ productModel.name }} </v-card-title>
        <v-card-text>
          {{ productModel.description }}
        </v-card-text>
  </v-card>
</template>

<script lang="ts">
import useRoute from "vue-router"
import { Component, Prop, Vue } from "vue-property-decorator"
import ProductModel from "../../models/ProductModel.vue"
@Component
export default class RestaurantCardComponent extends Vue {
  @Prop() productModel!: ProductModel;
  
  //show = false;
/*
  public addProduct(): void {
    this.$emit("productAdded", true);
  }*/
}
</script>



<!--<template>
   <v-container>
     <div class = "RestaurantCardComponent">
     composant RestaurantCardComponent
     </div>
   </v-container>
</template>

<script lang="ts">
// import { Component, Prop, Vue } from "vue-property-decorator";
// import RestaurantModel from "../../models/RestaurantModel.vue"
// @Component
// export default class RestaurantCardComponent extends Vue {
  
// }

// </script>-->