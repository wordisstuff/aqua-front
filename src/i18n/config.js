import { use } from 'i18next';
import back from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import LangDetector from 'i18next-browser-languagedetector';
import us from './languages/us.json';
import ua from './languages/ua.json';

const i18n = use(back)
    .use(initReactI18next)
    .use(LangDetector)
    .init({
        fallbackLng: 'us',
        debug: false,
        resources: {
            us: {
                translation: us,
            },
            ua: {
                translation: ua,
            },
        },
        ns: ['translation'],
        defaultNS: 'translation',
    });

export default i18n;
