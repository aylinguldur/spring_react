import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources:{
        en:{
            translations:{
                'Sign Up':'Sign Up',
                'password mismatch':'password mismatch',
                'Username':'Username',
                'Display Name':'Display Name',
                'Password':'Password',
                'Password Repeat':'Password Repeat',
                'Login' : 'Login'

            }
        },
        tr:{
            translations:{
                'Sign Up':'Kayıt Ol',
                'password mismatch':'Şifreleriniz eşleşmiyor',
                'Username':'Kullanıcı adı',
                'Display Name':'Tercih Edilen İsim',
                'Password':'Şifre',
                'Password Repeat':'Şifre Tekrar',
                'Login':'Giriş Yap'
            }
        },

        fallbackLng:'tr',
        ns:['translations'],
        defaultNS:'translations',
        keySeperator:false,
        interpolation:{
            escapeValue:false,
            formatSeperator: ','
        },
        react:{
            wait:true
        }
    }
});


export  default i18n;