<template>
    <v-app>
  <v-app-bar app>
        <h1>Modification du compte</h1><br><br>
        </v-app-bar>

  <v-main>
    
      <v-card class="formulaire">
        <v-btn icon class="retour">
          <router-link to="/login" tag="button">Retour</router-link>
        </v-btn><br><br>
        <v-form> 
        <v-text-field label = "Nom" name="nom" v-model = "input.last_name" placeholder="Nom"></v-text-field>
        <v-text-field label = "Prénom" name="prenom" v-model = "input.first_name" placeholder="Prenom"></v-text-field>
        <v-text-field label = "Téléphone" name="telephone" v-model = "input.phone_number" placeholder="Telephone"></v-text-field>
        <v-text-field label = "E-mail" name="email" v-model = "input.email" placeholder="E-mail"></v-text-field> 
      <v-text-field label = "Adresse" name="adresse" v-model = "input.adresse" placeholder="Adresse"></v-text-field>
      <v-text-field label = "Mot de passe" name="password" type="password" v-model = "input.password" placeholder="Mot de passe"></v-text-field> </v-form>
        <br><br><button type="button" v-on:click="edit()">Modifier</button>
        <br><br><button type="button" v-on:click="suppr()">Supprimer mon compte</button>
    <br><br></v-card>
  </v-main>
</v-app>
</template>

<script>
import UserService from "../services/UserService"
import Utilisateur from "../models/Utilisateur"
    export default {
        name: 'Edit',
        async mounted() {
            let userService = new UserService()
            let user = await userService.getUser()
            console.log(user)
            this.input.first_name = user.first_name
            this.input.last_name = user.last_name
            this.input.phone_number = user.phone_number
            this.input.email = user.email
            this.input.adresse = user.address
        },
       data() {
        return {
            input: {
                    first_name : "user.first_name",
                    last_name : "user.last_name",
                    phone_number : "user.phone_number",
                    email : "user.email",
                    adresse : "user.address"
                }
        }
       },
        methods: {
            edit() {
                let user = {
                    last_name : this.input.last_name,
                    first_name : this.input.first_name,
                    phone_number : this.input.phone_number,
                    email : this.input.email,
                    address : this.input.adresse
                }
                console.log(user)
                let userService = new UserService()
                userService.editUser(user)
            },
            suppr() {
                let userService = new UserService()
                userService.deleteUser()
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

