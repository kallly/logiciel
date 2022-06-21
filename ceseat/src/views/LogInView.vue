<template>
    <div class="logIn">
      <img alt="CeseatLogo" src="../assets/IconPlateWhite.png">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" name="username">
    </div>

    <div>
        <label for="pass">Password:</label>
        <input type="password" id="pass" name="password">
    </div>
<input type="submit" value="Sign in">
    </div>
    

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class HomeView extends Vue {}
</script>
