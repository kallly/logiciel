<template>
    <v-app>
  <v-app-bar app>
        <h1>Modifier produit</h1><br><br>
        </v-app-bar>

  <v-main>
      <v-card class="formulaire">
        <v-form> 
            <v-text-field label = "Restaurant" name="restaurant" v-model = "input.restaurant" placeholder="restaurant" disabled></v-text-field>
            <v-text-field label = "Nom" name="name" v-model = "input.name" placeholder="Nom"></v-text-field>
            <v-text-field label = "Description" name="description" v-model = "input.text" placeholder="Description"></v-text-field>
            <v-text-field label = "Prix" name="price" v-model = "input.price" placeholder="Prix"></v-text-field> 
             <br><br><button type="button" v-on:click="edit()">Modifier</button>
            <br><br>
        </v-form>
    </v-card>
  </v-main>
</v-app>
</template>

<script>
import ProductService from "../services/ProductService"
import RestaurantService from '../services/RestaurantService'
    export default {
        name: 'EditProduct',
       data() {
        return {
            input: {
                    _id : 0,
                    restaurant : "",
                    name : "",
                    text : "",
                    price : 0
                }
        }
       },
       async mounted() {
            let restaurantService = new RestaurantService()
            let restaurant = await restaurantService.getRestaurant()
            console.log(restaurant)
            let productService = new ProductService()
            let product = await productService.getProduct(this.$route.params.id)
            console.log(product)
            this.input._id = product._id
            this.input.restaurant = restaurant.name
            this.input.name = product.name
            this.input.text = product.text
            this.input.price = product.price
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
            async edit() {
                let product = {
                    _id : this.input._id,
                    restaurant : this.input.restaurant,
                    name : this.input.name,
                    text : this.input.text,
                    price : this.input.price
                }
                console.log(product)
                let productService = new ProductService()
                let res = await productService.updateProduct(product)
                if(res){
                    this.$router.replace({ name: "editProducts" });
                }
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