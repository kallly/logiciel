<template>
  <v-card class="mt-4" max-width="344">
  </v-card>
</template>

<script lang="ts">
import useRoute from "vue-router"
import { Component, Prop, Vue } from "vue-property-decorator"
import CommandModel from "../../models/CommandModel.vue"
@Component
export default class OrderCardComponent extends Vue {
    @Prop() commandmodel!: commandModel;
    show = false;
}
</script>