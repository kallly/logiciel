<template>
  <v-app>
    <div>
      <v-container>
        <TopbarComponent></TopbarComponent>
      </v-container>
      <v-container  style="display:flex; flex-direction: row; flex-wrap:wrap;"> 
        <v-col v-for="commande in commandes" :key="commande.date" cols="12" sm="4">

    <v-card class="mt-4">
     <v-card-title> {{ commande.restaurant }} </v-card-title>
     <v-card-text>
       {{commande.price}} €
       <br><br>
       {{commande.status}}
     </v-card-text>
     <v-card-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <button type="button" v-on:click="recup(commande._id)">En cours de livraison</button> &nbsp;&nbsp;&nbsp;&nbsp;
        <button type="button" v-on:click="arrive(commande._id)">Arrivé</button> &nbsp;&nbsp;&nbsp;&nbsp;
        <button type="button" v-on:click="livre(commande._id)">Livré</button>
     </v-card-button>
   </v-card>
        </v-col>
      </v-container>
    </div>
  </v-app>
</template>

<script lang="ts">
  import TopbarComponent from '../components/Navigation/TopbarComponent.vue'
  import ProductListComponent from '../components/Order/ProductListComponent.vue'
  import { Component, Vue } from "vue-property-decorator";
  import CommandService from "../services/CommandService";
  import CommandModel from '../models/CommandModel'
  @Component({
  components: { TopbarComponent },
})
export default class LivreurView extends Vue {
     public commandes: Array<CommandModel> = [];
     private commandeService!: CommandService;

     async created(): Promise<void> {
    this.commandeService = new CommandService();
    this.commandes = await this.commandeService.getAllOrder(this.$route.params.id);
    console.log(this.commandes);
  }
  async recup(id : string){
    console.log(id)
    this.commandeService = new CommandService();
    await this.commandeService.update({_id:id, status:"récupéré"});
    this.commandeService = new CommandService();
    this.commandes = await this.commandeService.getAllOrder(this.$route.params.id);
    console.log(this.commandes);
  }
  async arrive(id : string){
    console.log(id)
    this.commandeService = new CommandService();
    await this.commandeService.update({_id:id, status:"arrivé"});
    this.commandeService = new CommandService();
    this.commandes = await this.commandeService.getAllOrder(this.$route.params.id);
    console.log(this.commandes);
  }
  async livre(id : string){
    console.log(id)
    this.commandeService = new CommandService();
    await this.commandeService.update({_id:id, status:"livré"});
    this.commandeService = new CommandService();
    this.commandes = await this.commandeService.getAllOrder(this.$route.params.id);
    console.log(this.commandes);
  }
}
</script>