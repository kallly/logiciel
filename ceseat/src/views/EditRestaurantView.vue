<template>
    <v-app>
  <v-app-bar app>
        <h1>Modification restaurant</h1><br><br>
        </v-app-bar>
  <v-main>
      <v-card class="formulaire">
        <v-form> 
            <v-text-field label = "Nom" name="nom" v-model = "input.name" placeholder="Nom"></v-text-field>
            <v-text-field label = "Image" name="prenom" v-model = "input.img" placeholder="Image"></v-text-field>
            <v-text-field label = "Description" name="description" v-model = "input.description" placeholder="Description"></v-text-field>
            <v-text-field label = "Location" name="location" v-model = "input.location" placeholder="Location"></v-text-field> 
            <v-text-field label = "Type" name="type" v-model = "input.type" placeholder="Type"></v-text-field>
            <br><br><button type="button" v-on:click="edit()">Modifier</button>
            <br><br>
        </v-form>
    </v-card>
  </v-main>
</v-app>
</template>

<script>
import RestaurantService from "../services/RestaurantService"
    export default {
        name: 'EditRestaurant',
        data() {
         return {
             input: {
                     name : "restaurant.name",
                     img : "restaurant.img",
                     description : "restaurant.description",
                     location : "restaurant.location",
                     type : "restaurant.type"
                 }
         }
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
        async mounted() {
            let restaurantService = new RestaurantService()
            let restaurant = await restaurantService.getRestaurant()
            console.log(restaurant)
            this.input.name = restaurant.name
            this.input.img = restaurant.img
            this.input.description = restaurant.description
            this.input.location = restaurant.location
            this.input.type = restaurant.type
        },
        methods: {
            edit() {
                let restaurant = {
                    name : this.input.name,
                    img : this.input.img,
                    description : this.input.description,
                    location : this.input.location,
                    type : this.input.type
                }
                console.log(restaurant)
                let restaurantService = new RestaurantService()
                restaurantService.editRestaurant(restaurant)
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