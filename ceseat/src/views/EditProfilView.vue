<template>
    <v-app>
  <v-app-bar app>
        <h1>Modification du compte</h1><br><br>
        </v-app-bar>

  <v-main>
    <v-btn icon class="retour">
          <router-link to="/login" tag="button">Retour</router-link>
        </v-btn><br><br>
      <v-card class="formulaire"><v-form> 
        <v-text-field label = "Nom" name="nom" v-model = "input.lastname" placeholder="Nom"></v-text-field>
        <v-text-field label = "Prénom" name="prenom" v-model = "input.firstname" placeholder="Prenom"></v-text-field>
        <v-text-field label = "Téléphone" name="telephone" v-model = "input.phone" placeholder="Telephone"></v-text-field>
        <v-text-field label = "E-mail" name="email" v-model = "input.email" placeholder="E-mail"></v-text-field> 
      <v-text-field label = "Adresse" name="adress" v-model = "input.adresse" placeholder="Adresse"></v-text-field>
      <v-radio-group
              v-model="input.type"
              column
            >Je suis : <br> <br>
              <v-radio
                label="Client"
                value="Client"
                placeholder = "Type"
              ></v-radio>
              <v-radio
                label="Livreur"
                value="Livreur"
                placeholder = "Type"
              ></v-radio>
              <v-radio
                label="Restaurateur"
                value="Restaurateur"
                placeholder = "Type"
              ></v-radio>
            </v-radio-group>
      <v-text-field label = "Mot de passe" name="password" type="password" v-model = "input.password" placeholder="Mot de passe"></v-text-field> </v-form>
        <br><br><button type="button" v-on:click="edit()">Modifier</button>
    <br><br></v-card>
  </v-main>
</v-app>
</template>

<script>
    export default {
        name: 'Edit',
        data() {
            return {
                input: {
                    email: "",
                    password: ""
                }
            }
        },
        methods: {
            edit() {
                
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