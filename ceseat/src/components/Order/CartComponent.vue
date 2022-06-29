<!--<template>
    <div class="CartComponent"> 
    hello
        <router-link :to="`/Order`" tag="button" color="deep-purple lighten-2"> 
           <v-icon>mdi-cart-arrow-down</v-icon>
        </router-link>
        <span class="mr-2">{{ panierTextFormated }}</span> 
        <span class="mr-2">{{ cartlist }}</span>
    </div>
</template>
<script lang="ts">
    import { Component, Vue } from "vue-property-decorator"
    import ResizerComponent from '../components/Responsive/ResizerComponent.vue'
    import TopbarComponent from '../components/Navigation/TopbarComponent.vue'
    import ProductCardComponent from '../components/Order/ProductCardComponent.vue'
    import ProductListComponent from '../components/Order/ProductListComponent.vue'
    export default class CartComponent extends Vue {
        @Prop() productList!: Array<ProductModel>;
        show = false;
        newProduct = false;
        public transphertproductList(productList): void {
            this.$emit("productAdded", true);
        }       
    }
</script>-->