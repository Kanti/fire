<template>
  <v-app>
    <v-main>
      <HelloWorld/>
      <v-footer class="text-center flex-column">
          <v-img contain max-width="700px" src="./assets/Invest.svg"></v-img>
        <v-col
                cols="12"
        >
          2021<span v-if="new Date().getFullYear() !== 2021">-{{ new Date().getFullYear() }}</span> —
          <strong>Kanti</strong>
        </v-col>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';

@Component({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {
}
</script>
