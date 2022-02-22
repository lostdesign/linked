import deTranslationStrings from './locales/de-DE.json';
import enTranslationStrings from './locales/en-US.json';

const validTranslations = ['de-DE', 'en-US'];

export const Translations = {
  locale: validTranslations.includes(window.navigator.language)
    ? window.navigator.language
    : 'de-DE',
  translationStrings: {
    'de-DE': deTranslationStrings,
    'en-US': enTranslationStrings,
  },
  install(VueInstance) {
    VueInstance.prototype.$setLocale = function (locale) {
      this.locale = locale;
    }.bind(this);

    VueInstance.prototype.$getLocale = function () {
      return this.locale;
    }.bind(this);

    VueInstance.prototype.$trans = function (identifier, data = {}) {
      let string = identifier
        .split('.')
        .reduce(
          (prev, curr) => prev && prev[curr],
          this.translationStrings[this.locale]
        );
      for (const key in data) string = string.replace(`:${key}`, data[key]);
      return string;
    }.bind(this);
  },
};

