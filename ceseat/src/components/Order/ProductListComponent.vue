<template>
  <div>
    <v-container class="ProductList">
      <v-spacer></v-spacer>
      <!--Pannier-->
      <div class="panier">
        <v-btn icon @click="show = !show" Style="background-color:white;">
          <v-icon>{{ show ? 'mdi-cart-arrow-up' : 'mdi-cart-arrow-down' }}</v-icon>
        </v-btn>
        <span class="mr-2">{{ panierTextFormated }}</span>
        <span class="mr-2">{{ cartlist }}</span>
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <v-card-text>
              <ul id="list of product">
                <li v-for="(product,index) in productPannier" :key="index">
                  {{ product.name }} : {{ product.price }} €
                  <v-chip color="red" outlined @click="deleteItem(product.name)">
                    <label>
                      x
                    </label>
                  </v-chip>
                </li>
              </ul>

            </v-card-text>
            <v-divider></v-divider>
            <label>Total : {{ getTotalPrice }} € </label>
            <v-btn color="success" @click.stop="dialog = true" @click="sendOrder()">
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
        <v-col v-for="product in products" :key="product._id" cols="12" sm="4">
          <ProductCardComponent :productModel="product" @productAdded="onProductAdded($event)"
            @addProducts="addProducts($event)" />
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="text-h5">
          Comande reçue
        </v-card-title>

        <v-card-text>
          votre commande a bien été recu et est en cours de traitement, pour voir son acheminement cliquer sur "voir
          l'état de ma commande"
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="green darken-1" text @click="dialog = false">
            <router-link :to="`/DeliveryStatus/${userid}`" tag="button" color="deep-purple lighten-2">
              voir l'état de ma commande
            </router-link>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>


</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ProductCardComponent from '../Order/ProductCardComponent.vue'
import ProductModel from '../../models/ProductModel'
import CommandModel from "../../models/CommandModel"
import OrderService from "../../services/OrderService"

@Component({ components: { ProductCardComponent } })
export default class ProductListComponent extends Vue {
  @Prop() products!: Array<ProductModel>;
  show = false;
  dialog = false;
  public productPannier: Array<ProductModel> = [];
  public PannierList: Array<string> = [];
  public count = 0;
  public cartlist: string = "";
  NewCommand !: CommandModel;
  TOTALPRICE: number = 0;
  public RebootPannier(): void {
    this.productPannier.splice(0, this.productPannier.length);
    this.count = 0;
  }
  public userid = 0;
  async beforeCreate() {
    this.userid = await JSON.parse(atob(localStorage.jwt.split('.')[1])).id
  }

  //fonction qui permet de supprimer 1 element de la liste
  public sendOrder() {
    this.stringList();
    console.log("send order");
    let Order = {
      user: JSON.parse(atob(localStorage.jwt.split('.')[1])).id,
      restaurant: this.$route.params.id,
      products: this.PannierList
    };
    let orderservice = new OrderService();
  }
  public stringList() {
    this.PannierList = [];
    this.productPannier.forEach((product: ProductModel) => {
      this.PannierList.push(product.name);
    });
  }
  //fonction qui permet de supprimer 1 element de la liste
  public deleteItem(Item: string): void {
    let a = 0;
    let b = 0;
    this.productPannier.forEach((product: ProductModel) => {
      a = a + 1;
      if (product.name == Item) {
        b = a;
      }
    });
    b = b - 1
    this.productPannier.splice(b, 1);
    this.count = this.productPannier.length;
  }
  get panierTextFormated(): string {
    return `${this.count}`;
  }
  //fonction qui va caculer ce que doit le client avec sa commande
  get getTotalPrice() {
    this.TOTALPRICE = 0;
    this.productPannier.forEach((product: ProductModel) => {
      this.TOTALPRICE = this.TOTALPRICE + product.price;
    });
    return this.TOTALPRICE;
  }
  public addProducts(product: ProductModel): void {
    this.productPannier.push(product); //ajout de notre produit (nom/id)
    console.log("productName", product.name, " was hadded to cart");
  }
  public onProductAdded(param: boolean): void {
    console.log("Mon param", param);
    this.count++;
  }
  public ProductTranspher(): void {
    this.$emit("GetProductTranspher", this.productPannier);
  }
}
</script>