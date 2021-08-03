import Vue from 'vue';
import App from './App.vue';
import {vuetify} from './plugins/vuetify';
// @ts-ignore
import reactiveStorage from 'vue-reactive-storage';
import {LocalStorageType} from '@/types/LocalStorageType';

Vue.use(reactiveStorage, <LocalStorageType>{
  birthday: '',
  netWorth: 0,
  netIncomeMonthly: undefined,
  savingMonthly: 0,
  invested: 0,
});

Vue.filter('number', (value: number): string => {
  if (value % 1 > 0) {
    const number = Math.round(value * 100) / 100;
    return number.toLocaleString();
  }
  return value.toLocaleString();
});

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app');
