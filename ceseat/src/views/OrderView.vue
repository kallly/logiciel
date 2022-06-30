<!--edit command-->
<template>
    <div class="OrderView">
        <v-container>
            <v-col v-for="(product,index) in choosenProductList" :key="index" cols="12" sm="4">
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
  import RestaurantListComponent from "../components/Navigation/RestaurantListComponent.vue"
  import ProductModel from "../models/ProductModel"

@Component({
  components: { RestaurantListComponent },
})
export default class OrderView extends Vue {
    @Prop() choosenProductList!: Array<ProductModel>;
    list = JSON.parse(localStorage.product);
    public productdeleted(product : ProductModel): void{
        return ;
    }
    public GetProductTranspher(productlist : Array<ProductModel>):void{
        this.choosenProductList = productlist;
        if(this.choosenProductList){
           this.choosenProductList.forEach((product:ProductModel)=>{

            console.log("produit :", product.name );
            })
        }
    }
}
</script>