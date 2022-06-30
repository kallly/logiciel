<template>
  <v-container>
    <div class = "TopbarComponent">
      <v-app-bar absolute color="white" elevate-on-scroll elevation="4">
        <v-toolbar-title><router-link to="/home" tag="button" style ="margin : 10px;">CESEAT</router-link></v-toolbar-title>
        

        <div v-if = "isRestaurant">
          <v-btn icon style ="margin : 50px;"><!--editer restaurant / stats / commandes restaurant/ editer mennu -->
          <router-link to="/edit/restaurant" tag="button">Editer mon restaurant</router-link>
        </v-btn>
        <v-btn icon style ="margin : 50px;">
            <router-link to="/edit/products" tag="button">Editer mes menus</router-link>
        </v-btn>
        <v-btn icon style ="margin : 50px;">
            <router-link to="/commande/restaurant" tag="button"> Status commandes</router-link>
        </v-btn>
        <v-btn icon style ="margin : 50px;">
            <router-link to="/statistics" tag="button"> Statistiques</router-link>
        </v-btn>
        </div>

        <div v-if = "isLivreur"><!-- commandes livreur -->
        <v-btn icon style ="margin : 50px;">
        <router-link to="/livreur" tag="button"> Accès commandes </router-link>
        </v-btn>
        </div >

        <div v-if = "isClient"><!-- commandes client -->
          <v-btn icon style ="margin : 50px;">
            <router-link to="/commande/client" tag="button"> Accès commandes </router-link>
          </v-btn>
        </div >
       <v-app-bar-nav>
       <v-btn icon style ="margin : 50px;">
          <router-link to="/edit" tag="button">Modifier mon compte</router-link>
        </v-btn>
        
        <v-btn icon style ="margin : 50px;" >
          <router-link to="/login" v-on:click.native="logout()" tag="button">Déconnexion</router-link>&nbsp; &nbsp; &nbsp; &nbsp;
        </v-btn>
      </v-app-bar-nav>
    </v-app-bar>
</div>
  </v-container>
  
</template>

<script>
export default {
  
     
  name: 'TopbarComponent',
  data() { 
    return{
        isRestaurant : false,
        isClient : false,
        isLivreur : false, 

      }
    },
    methods: {
            logout() {
                this.authenticated = false;
                this.localStorage.jwt = "{[]}";
            }
        },
    created() {
      let decoded = JSON.parse(atob(localStorage.jwt.split('.')[1]));
      console.log(decoded.role)
      if (decoded.role == "restaurant"){
        this.isRestaurant = true;
        this.isLivreur = false;
        this.isClient = false;
    }
    else if (decoded.role == "livreur"){
        this.isLivreur = true;
        this.isRestaurant = false;
        this.isClient = false;
    } 
    else {
      this.isRestaurant = false;
      this.isClient = true;
      this.isLivreur = false;
    }
    }
};
</script>