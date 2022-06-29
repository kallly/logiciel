<template>
    <v-app>
  <v-app-bar app>
        <h1>Nouveau compte</h1><br><br>
        </v-app-bar>

  <v-main>
    <v-btn icon class="retour">
          <router-link to="/login" tag="button">Retour</router-link>
        </v-btn><br><br>
      <v-card class="formulaire"><v-form> 
        <v-text-field label = "Nom" name="nom" v-model = "input.last_name" placeholder="Nom"></v-text-field>
        <v-text-field label = "Prénom" name="prenom" v-model = "input.first_name" placeholder="Prenom"></v-text-field>
        <v-text-field label = "Téléphone" name="telephone" v-model = "input.phone_number" placeholder="Telephone"></v-text-field>
        <v-text-field label = "E-mail" name="email" v-model = "input.email" placeholder="E-mail"></v-text-field> 
      <v-text-field label = "Adresse" name="adress" v-model = "input.adresse" placeholder="Adresse"></v-text-field>
      <v-radio-group
              v-model="input.type"
              column
            >Je suis : <br> <br>
              <v-radio
                label="Client"
                value="client"
                placeholder = "Type"
              ></v-radio>
              <v-radio
                label="Livreur"
                value="livreur"
                placeholder = "Type"
              ></v-radio>
              <v-radio
                label="Restaurateur"
                value="restaurant"
                placeholder = "Type"
              ></v-radio>
            </v-radio-group>
      <v-text-field label = "Mot de passe" name="password" type="password" v-model = "input.password" placeholder="Mot de passe"></v-text-field> </v-form>
        <br><br><button type="button" v-on:click="register()">S'inscrire</button>
    <br><br></v-card>
  </v-main>
</v-app>
</template>

<script>
import UserService from "../services/UserService"
import Utilisateur from "../models/Utilisateur"
    export default {
        name: 'Register',
       data() {
        return {
            input: {
                    first_name : "",
                    last_name : "",
                    phone_number : "",
                    email : "",
                    adresse : "",
                    type : "",
                    password : ""
                }
        }
       },
        methods: {
            register() {
                let user = {
                    last_name : this.input.last_name,
                    first_name : this.input.first_name,
                    phone_number : this.input.phone_number,
                    email : this.input.email,
                    address : this.input.adresse,
                    type : this.input.type,
                    password : this.input.password
                }
                console.log(user)
                let userService = new UserService()
                userService.registerUser(user)
            }
        }
    }
</script>

<style scoped>
    #register {
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