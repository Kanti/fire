<template>
  <v-app>
    <v-main>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';

@Component({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {}
</script>
