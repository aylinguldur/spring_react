import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import translationsEN from "../src/locales/en/translation.json";
import translationsTR from "../src/locales/tr/translation.json";


const resources = {
    en: {
        translations: translationsEN,
    },
    tr: {
        translations: translationsTR,
    },
}
i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'tr',
    ns: ['translations'],
    defaultNS: 'translations',
    keySeperator: false,
    interpolation: {
        escapeValue: false,
        formatSeperator: ','
    },
    react: {
        wait: true
    }
})
;


export default i18n;