<template>
<v-hover>
  <template v-slot:default="{ hover }">
    <v-card class="mt-4" width="300">
     <v-card-title> Id : 00000 </v-card-title>
     <v-card-text>
     <!--Bouton etat commande-->
         <v-btn icon @click="show = !show">
           <v-icon>
             voir l'état de la commande {{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
            </v-icon>
         </v-btn>
     </v-card-text>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <v-card-text>
            etat de la commande
          </v-card-text>
       </div>
     </v-expand-transition>
        
   </v-card>
  </template>
</v-hover>
</template>

<script lang="ts">
  import useRoute from "vue-router"
  import { Component, Prop, Vue } from "vue-property-decorator"
  import ProductModel from "../../models/ProductModel.vue"
  @Component
  export default class RestaurantCardComponent extends Vue {
    @Prop() productModel!: ProductModel;
    show = false;
    newProduct = false;
}
</script>