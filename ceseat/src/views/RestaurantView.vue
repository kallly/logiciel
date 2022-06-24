<template>
<div class="RestaurantView">
  <v-container>
    <TopbarComponent/>
  </v-container>
  <v-container>
    <ProductList :Product="Products"></ProductList>
    <ProductCardComponent/>
  </v-container>
</div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import ResizerComponent from '../components/Responsive/ResizerComponent.vue'
  import TopbarComponent from '../components/Navigation/TopbarComponent.vue'
  import ProductCardComponent from '../components/Order/ProductCardComponent.vue'
  export default Vue.extend({
    name: 'RestaurantView',

    components: {
      TopbarComponent, ResizerComponent, ProductCardComponent
    },
  })
</script>
