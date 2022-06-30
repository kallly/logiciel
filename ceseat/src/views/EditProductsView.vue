<template>
  <v-app>
    <v-container>
    <TopbarComponent></TopbarComponent>
  </v-container>
    <div class="RestaurantView">
        <v-container class="grey lighten-5">
        <router-link to="/create/product">Creer produit</router-link>
        <v-row no-gutters>
        <v-col v-for="product in products" :key="product.id" cols="12" sm="4">
            <v-card class="mt-4" width="300">
               <v-card-title> {{ product.name }} </v-card-title>
               <v-card-text>
                 {{product.price}} €
               </v-card-text>
                <v-card-text>
                  {{ product.text }}
                </v-card-text>
                <v-chip color="success" outlined style="margin-left: 5%">
                    <button type="button" v-on:click="edit(product._id)">Modifier</button>
                </v-chip>
                <v-chip color="red" outlined style="margin-left: 5%">
                <button type="button" v-on:click="suppr(product._id)">Supprimer</button>
                </v-chip>
                <br></br>
             </v-card>
        </v-col>
      </v-row>
      </v-container>
    </div>
  </v-app>
</template>

<script>
import ProductService from "../services/ProductService"
import RestaurantService from '../services/RestaurantService'
import TopbarComponent from '../components/Navigation/TopbarComponent.vue'

    export default {
        components: {TopbarComponent},
        name: 'EditProducts',
       data() {
        return {
            products: []
        }
       },
       async mounted() {
            let restaurantService = new RestaurantService()
            let restaurant = await restaurantService.getRestaurant()
            console.log(restaurant)
            let productService = new ProductService()
            this.products = await productService.getAllProducts(restaurant._id)
            console.log(this.products)
        },
        beforeCreate() {
            try{
                if(localStorage.authentificated != 'true'){
                    this.$router.replace({ name: "login" });
                }else{
                    let decoded = JSON.parse(atob(localStorage.jwt.split('.')[1]));
                    console.log(decoded.role);
                    if(decoded.role != 'restaurant'){
                        this.$router.replace({ name: "login" });
                    }
                }
            }catch(e){
                this.$router.replace({ name: "login" });
            }
        },
        methods: {
            edit(id) {
                this.$router.replace({ name: "editProduct",params: {id:id} });
            },
            async suppr(id) {
                console.log('flag')
                let productService = new ProductService()
                productService.deleteProduct(id)


                let restaurantService = new RestaurantService()
                let restaurant = await restaurantService.getRestaurant()
                console.log(restaurant)
                this.products = await productService.getAllProducts(restaurant._id)
                console.log(this.products)
            }
        }
    }
</script>

<style scoped>
    #edit {
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
    }
    .formulaire{
        margin: 40px;
        padding: 20px;
    }
    .retour{
        float:right;
        margin-right:40px;
    }
</style>