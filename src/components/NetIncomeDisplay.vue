<template>
  <v-container v-if="localStorage.netIncomeMonthly !== undefined">
    <v-row>
      <v-col cols="3">
        <v-slider
                :value="netIncomePercentage"
                thumb-label="always"
                vertical
                readonly
        ></v-slider>
      </v-col>
      <v-col cols="7">
        <p>
          <span class="text-h4">{{ netIncomePercentage | number }}%</span><br>
          der Deutschen <span v-if="byAge">in deiner Altersgruppe ({{ ageGroup }})</span> haben weniger Nettoeinkommen
          als du.
        </p>
        <span class="caption">IW-Kurzbericht 53/2019</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {getPercentileNetIncomeMonthly, netIncomeMonthlyByAge} from "@/data/netIncomeMonthly";

@Component
export default class NetIncomeDisplay extends Vue {
  @Prop({type: Boolean})
  readonly byAge!: boolean;

  get age() {
    const birthday = (this as any).localStorage.birthday;
    if (!birthday.match(/[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}/)) {
      return 0;
    }
    const b = birthday.split(/\D/);
    const date = new Date(b[0], --b[1], b[2]);
    const ageInMs = new Date().getTime() - date.getTime();
    const ageDate = new Date(ageInMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  get ageGroup() {
    let ageGroup: number = this.age - (this.age % 5);
    while (!(ageGroup in netIncomeMonthlyByAge) || ageGroup < 0) {
      ageGroup -= 5;
      if (ageGroup < 0) {
        ageGroup = 0;
      }
    }
    switch (ageGroup) {
      case 0:
        return '0-24';
      case 25:
        return '25-49';
      case 50:
        return '50-64';
      case 65:
        return '65+';
    }
    return ageGroup + '-??';
  }

  get netIncomePercentage(): number {
    if(this.localStorage.netIncomeMonthly === undefined){
      return 0;
    }
    return getPercentileNetIncomeMonthly(this.localStorage.netIncomeMonthly, this.byAge ? this.age : false);
  }
}
</script>
