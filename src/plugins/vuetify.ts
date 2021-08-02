import Vue from 'vue';
import Vuetify, {colors} from 'vuetify/lib';
import de from 'vuetify/src/locale/de';

Vue.use(Vuetify);

export const vuetify = new Vuetify({
  theme: {
    dark: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
    themes: {
      dark: {
        primary: colors.blue.lighten3,
      },
    },
  },
  lang: {
    locales: {de},
    current: 'de',
  },
});
