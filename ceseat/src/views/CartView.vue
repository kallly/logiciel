<!--edit command-->
<template>
    <div class="CartView">
        <v-container>
            {{GetALLPrice}}  
        </v-container>
    </div>
  
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  //import ResizerComponent from '../components/Responsive/ResizerComponent.vue'
  
  import RestaurantModel from "@/models/RestaurantModel";
  import RestaurantListComponent from "../components/Navigation/RestaurantListComponent.vue";
  import RestaurantService from "../services/RestaurantService";

@Component({
  components: { RestaurantListComponent },
})
export default class CartView extends Vue {
    //à récupérer //recupération de l'array
    public ListOfChoosenProduct: Array<Array<void> = [[ananas, 10],[ananas, 10],[ananas, 10],[banane, 5],[pomme, 1]];
    private get GetALLPrice (){
        for (var i=0; ListOfChoosenProduct.length; i++){
            TOTALPRICE = ListOfChoosenProduct[i],[2]+ TOTALPRICE;
        }
        return TOTALPRICE;
    }
//affichage avec le prix
//calcul du prix total
}
</script>