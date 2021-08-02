<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-img
                :src="require('../assets/logo.svg')"
                class="my-3"
                contain
                height="200"
        />
      </v-col>

      <v-col cols="12" class="text-center">
        <h1 class="display-2 font-weight-bold mb-3">
          FIRE Bewegung, wo stehst du?
        </h1>
      </v-col>

      <v-col cols="12" lg="4">
        <v-text-field label="Wie alt bist du?" type="date" v-model="localStorage.birthday"/>
        <v-text-field label="Wie groß ist dein Nettovermögen?" type="number" v-model.number="localStorage.netWorth"/>
      </v-col>
      <v-col cols="12" sm="6" lg="4">
        <NetWorthDisplay :byAge="true"/>
        <NetWorthDisplay :byAge="false"/>
      </v-col>
      <v-col cols="12">
        <v-divider></v-divider>
      </v-col>
      <v-col cols="12" lg="4">
        <v-text-field label="Wie viel Netto Einnahmen hast du jeden Monat?" type="number"
                      v-model.number="localStorage.netIncomeMonthly"/>
        <v-text-field label="Wie viel legst du jeden Monat zur Seite?" type="number"
                      v-model.number="localStorage.savingMonthly"/>
      </v-col>
      <v-col cols="12" sm="6" lg="4">
        <NetIncomeDisplay :byAge="true"/>
        <NetIncomeDisplay :byAge="false"/>
      </v-col>
      <v-col cols="12" sm="6" lg="4" v-if="isFinite(localStorage.netIncomeMonthly)">
        <p>Du legst <span class="text-h3">{{ savingsRate | number }}%</span> deiner Einnahmen zur Seite.</p>
        <p>Du gibst jeden Monat<span class="text-h4">{{ monthlyLivingCost | number }}€</span> aus.</p>
        <p>
          <span class="text-h4">{{ livingCostPercentile | number }}%</span> aller Deutschen könnten sich diesen lebensstil nicht leisten.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

import NetIncomeDisplay from "@/components/NetIncomeDisplay.vue";
import NetWorthDisplay from "@/components/NetWorthDisplay.vue";
import {getPercentileNetIncomeMonthly} from "@/data/netIncomeMonthly";

@Component({
  components: {
    NetWorthDisplay,
    NetIncomeDisplay,
  }
})
export default class HelloWorld extends Vue {
  get monthlyLivingCost(): number {
    if (!this.localStorage.netIncomeMonthly) {
      return 0;
    }
    return this.localStorage.netIncomeMonthly - this.localStorage.savingMonthly;
  }

  get savingsRate(): number {
    if (!this.localStorage.netIncomeMonthly) {
      return 0;
    }
    return 100 / this.localStorage.netIncomeMonthly * this.localStorage.savingMonthly;
  }

  get livingCostPercentile(): number {
    return getPercentileNetIncomeMonthly(this.monthlyLivingCost);
  }
}
</script>
