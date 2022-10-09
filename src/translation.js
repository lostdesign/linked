export const translate = async (identifier, locale = localStorage.lang, data = {}) => {
  const language = await import(`./locales/${locale}.json`)
  
  let string = identifier
    .split('.')
    .reduce(
      (prev, curr) => prev && prev[curr],
      language.default
    );
  for (const key in data) string = string.replace(`:${key}`, data[key]);
  return string;
  
}

export const Translations = {
  locale: localStorage.lang ?? 'en-US',
  translationStrings: import(`./locales/${this.locale || 'en-US'}.json`),
  install(VueInstance) {
    VueInstance.prototype.$setLocale = function (locale) {
      this.locale = locale;
    }.bind(this);

    VueInstance.prototype.$getLocale = function () {
      return this.locale;
    }.bind(this);
  },
};

