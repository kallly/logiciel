<template>
    <v-app>
  <v-app-bar app>
    
        <h1>Connexion</h1><br><br>
        </v-app-bar>

  <v-main>
    
      <v-card class="formulaire">
        <v-btn icon class="register">
          <router-link to="/register" tag="button">S'inscrire</router-link>
        </v-btn><br><br>
        <v-form> <v-text-field label = "E-mail" name="username" v-model = "input.email" placeholder="E-mail"></v-text-field> 
      <v-text-field label = "Mot de passe" type="password" name="password" v-model = "input.password" placeholder="Mot de passe"></v-text-field> </v-form>
        <br><br><button type="button" v-on:click="login()">Se connecter</button>
    <br><br></v-card>
  </v-main>
</v-app>
</template>

<script>
import AuthentificationService from '../services/AuthentificationService';
    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    email: "",
                    password: ""
                }
            }
        },
        methods: {
            async login() {
                if(this.input.username != "" && this.input.password != "") {
                    let authentificationService = new AuthentificationService()
                    
                    if(await authentificationService.Authentification(this.input.email, this.input.password)) {
                        localStorage.authentificated = true ;
                        this.$emit("authenticated", true);
                        this.$router.replace({ name: "home" });
                        
                    } else {
                        console.log("The username and / or password is incorrect");
                    }
                } else {
                    console.log("A username and password must be present");
                }
            }
        }
    }
</script>


<style scoped>
    #login {
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
    .register{
        float:right;
        margin-right:40px;
    }
</style>