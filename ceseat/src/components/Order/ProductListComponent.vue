<template>
  <div>
    <v-container class="ProductList">
    <div class="panier"> 
    <v-btn icon @click="show = !show">
       <v-icon>{{ show ? 'mdi-cart-arrow-up':'mdi-cart-arrow-down' }}</v-icon>
       <!--<router-link :to="`/Order`" tag="button" color="deep-purple lighten-2"></router-link>-->
       </v-btn> 
      <span class="mr-2">{{ panierTextFormated }}</span>
      <span class="mr-2">{{ cartlist }}</span>
      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <v-card-text>
            <ul id="list of product">
              <li v-for=" product in ProductPannier" :key="ProductPannier.name">
                {{product.name}} : {{ product.price }}
              </li>
            </ul>
            
          </v-card-text>
          <v-divider></v-divider>
          <label>Total : {{getTotalPrice}} </label>
          <v-btn tile color="success" > 
          Commander
          </v-btn>
          <v-btn @click="RebootPannier();" color="error" col-4>
            Réinitialiser le panier
          </v-btn>
          <v-divider></v-divider>
       </div>
     </v-expand-transition>
    </div>
      <v-row no-gutters>
        <v-col v-for="product in products" :key="product.id" cols="12" sm="4">
          <ProductCardComponent
            :productModel="product"
            @productAdded="onProductAdded($event)"
            @addProducts="addProducts($event)"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ProductCardComponent from '../Order/ProductCardComponent.vue'
import ProductModel from '../../models/ProductModel'
import CommandModel from "../../models/CommandModel"

@Component({ components: { ProductCardComponent } })
export default class ProductListComponent extends Vue {
  @Prop() products!: Array<ProductModel>;
  show = false;
  ProductPannier:Array<ProductModel>=[];
  public count = 0;
  public cartlist: string = "";
  NewCommand !: CommandModel;
  TOTALPRICE : number = 0;
  
  public RebootPannier(): void {
    this.ProductPannier.splice(0,this.ProductPannier.length);
    this.count = 0;
  }

  get panierTextFormated(): string {
    return `${this.count}`;
  }
  //fonction qui va caculer ce que doit le client avec sa commande
  get getTotalPrice(){
    this.TOTALPRICE = 0;
    this.ProductPannier.forEach((product : ProductModel )=>{
        this.TOTALPRICE = this.TOTALPRICE + product.price;
      });
      return this.TOTALPRICE;
  }
  public addProducts(productName: ProductModel): void {
    /*if(localStorage.product == undefined || localStorage.product == ''){
      localStorage.product = '[]';
    }
    let temp = JSON.parse(localStorage.product);
    temp.push(productName)
    localStorage.product = JSON.stringify(temp); //passer en json*/
    this.ProductPannier.push(productName); //ajout de notre produit (nom/id)
    console.log("productName", productName.name, " was hadded to cart");
  }
  public onProductAdded(param: boolean): void {
    console.log("Mon param", param);
    this.count++;
  }
  public ProductTranspher() : void {
    this.$emit("GetProductTranspher", this.ProductPannier);
  }
}
</script>