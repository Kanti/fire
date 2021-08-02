<template>
  <v-container v-if="(!byAge || age) && localStorage.netWorth !== undefined">
    <v-row>
      <v-col cols="3">
        <v-slider
                :value="netWorthPercentage"
                thumb-label="always"
                vertical
                readonly
        ></v-slider>
      </v-col>
      <v-col cols="7">
        <p>
          <span class="text-h4">{{ netWorthPercentage | number }}%</span><br>
          der Deutschen <span v-if="byAge">in deiner Altersgruppe ({{ ageGroup }})</span> haben weniger Nettovermögen
          als du.
        </p>
        <span class="caption"
              v-if="byAge">Quellen: Einkommens- und Verbrauchsstichprobe (EVS) 2018</span>
        <span class="caption" v-if="!byAge">Quelle: WSI-Verteilungsmonitor 2016</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {getPercentileNetWorth, netWorthByAge} from "@/data/netWorth";

@Component
export default class NetWorthDisplay extends Vue {
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
    while (!(ageGroup in netWorthByAge) || ageGroup < 0) {
      ageGroup -= 5;
      if (ageGroup < 0) {
        ageGroup = 0;
      }
    }
    switch (ageGroup) {
      case 0:
        return '0-30';
      case 75:
        return '75+';
    }
    return ageGroup + '-' + (ageGroup + 5);
  }

  get netWorthPercentage(): number {
    return getPercentileNetWorth(this.localStorage.netWorth, this.byAge ? this.age : false);
  }
}
</script>
