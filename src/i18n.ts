import {createI18n, I18n} from 'vue-i18n'

export const SUPPORT_LOCALES = ['ar-AR', 'bn-IN', 'ca-ES', 'da-DK', 'de-DE', 'el-GR', 'en-US', 'es-ES', 'fr-FR', 'hi-IN', 'hr-HR','id-ID','it-IT','ko-KR','nl-NL','np-NP','pl-PL','pt-BR','ru-RU','sl-SI','tr-TR','uk-UA','zh-CN']

export async function setupI18n() {
  const currentLocale = localStorage.getItem('lang') ?? "de-DE";

  const messages = await loadLocaleMessages()

  const i18n = createI18n({
    legacy: false,
    lazy: true,
    locale: currentLocale,
    availableLocales: SUPPORT_LOCALES,
    messages: messages.reduce((acc, curr) => {
      const [key] = Object.keys(curr);
      acc[key] = curr[key];
      return acc;
    }, {})
  })

  setI18nLanguage(i18n, currentLocale)


  return i18n
}

export function setI18nLanguage(i18n: I18n, locale: string) {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  } else {
    // @ts-ignore
    i18n.global.locale.value = locale
  }

  localStorage.setItem('lang', locale)
  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  //document.querySelector('html').setAttribute('lang', locale)
}

export async function loadLocaleMessages() {
  // load locale messages with dynamic import
  return Promise.all(
    SUPPORT_LOCALES.map(async (locale) => {
      const translations = await import(`./locales/${locale}.json`)
      return {[locale]: translations.default}
    })
  )
}