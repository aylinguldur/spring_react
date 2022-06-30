import React from 'react';
import {changeLanguage} from "../api/apiCall";
import {withTranslation} from "react-i18next";


const LanguageSelector = (props) => {
    const onChangeLanguage = language => {
        console.log(language);
        const {i18n} = props;
        i18n.changeLanguage(language);
        changeLanguage(language);
    };
    return (
        <div className="container">
            <img src="https://flagcdn.com/48x36/tr.png"
                 alt="Turkish Flag"
                 onClick={()=>onChangeLanguage('tr')}
                 style={{cursor:'pointer'}}/>
            <img src="https://flagcdn.com/48x36/gb.png"
                 alt="USA Flag"
                 onClick={()=>onChangeLanguage('en')}
                 style={{cursor:'pointer'}}/>
        </div>
    );
};

export default withTranslation()(LanguageSelector);