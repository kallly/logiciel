<!--edit command-->
<template>
    <div class="OrderView">
        <v-container>
            <v-col v-for="product in choosenProductList" :key="product.id" cols="12" sm="4">
          <ProductListComponent
            :productModel="product"
            @ProductTranspher="GetProductTranspher($event)"
          />
        </v-col>
        {{list[0].name}}
        </v-container>
    </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from "vue-property-decorator"
  //import ResizerComponent from '../components/Responsive/ResizerComponent.vue'
  import ProductListComponent from "../components/Order/ProductListComponent.vue"
  import RestaurantModel from "@/models/RestaurantModel"
  import RestaurantListComponent from "../components/Navigation/RestaurantListComponent.vue"
  import RestaurantService from "../services/RestaurantService"
  import ProductModel from "../models/ProductModel"

@Component({
  components: { RestaurantListComponent },
})
export default class OrderView extends Vue {
    @Prop() choosenProductList!: Array<ProductModel>;
    list = JSON.parse(localStorage.product);
    // public productList(ChoosenProduct : Array<ProductModel>): void{
    //     this.choosenProductList = ChoosenProduct; 
    // }
    public productdeleted(product : ProductModel): void{
        return ;
        //recherche de product dans choosenProductList et suppression
    }
    public GetProductTranspher(productlist : Array<ProductModel>):void{
        this.choosenProductList = productlist;
        if(this.choosenProductList){
           this.choosenProductList.forEach((product:ProductModel)=>{

            console.log("produit :", product.name );
            })
        /*for(let i=0; i<this.choosenProductList.length(); i++){
            console.log("produit :", this.choosenProductList[i].name );
        }*/
        }
    }
    //à récupérer //recupération de l'array
    /*public ListOfChoosenProduct: Array<Array<void> = [["ananas", 10],["ananas", 10],["ananas", 10],["banane", 5],["pomme", 1]];
    private get GetALLPrice (){
        for (var i=0; ListOfChoosenProduct.length; i++){
            TOTALPRICE = ListOfChoosenProduct[i],[2]+ TOTALPRICE;
        }
        return TOTALPRICE;
    }*/
//affichage avec le prix
//calcul du prix total
}
</script>