import React from "react";
import Input from "../components/input";
import {changeLanguage} from "../api/apiCall";
import {withTranslation} from "react-i18next";
import {withApiProgress} from "../shared/ApiProgress";
import {login} from "../api/apiCall";
import ButtonWithProgress from "../components/ButtonWithProgress";

class LoginPage extends React.Component{
    state = {
        username:null,
        password:null,
        error:null
    };

    onChange = event => {
        const{name,value}=event.target;
        this.setState({
            [name]:value,
            error:null
        })
    }

    onChangeLanguage = language => {
        console.log(language);
        const {i18n} = this.props;
        i18n.changeLanguage(language);
        changeLanguage(language);
    };

    onClickLogin = async event => {
        event.preventDefault();
        const {username,password}=this.state
        const creds = {
            username,
            password
        };
        this.setState({error:null});

        const {push} = this.props.history;

        try{
            await login(creds);
            push('/');
        }
        catch (apiError){
            this.setState({
                error:apiError.response.data.message
            })
        }

    }
    render(){
        const { t,pendingApiCall } = this.props;
        const{username,password,error }=this.state;
        const buttonEnable = username && password;

        return(
            <div className="container">
                <form>
                    <h1 className="text-center">
                        {t('Login')}
                    </h1>
                    <Input name="username" label="Username" onChange={this.onChange} ></Input>
                    <Input name="password" label="Password" type="password" onChange={this.onChange}></Input>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="text-center">
                        <ButtonWithProgress onClick={this.onClickLogin}
                                            disabled={!buttonEnable || pendingApiCall}
                                            pendingApiCall={pendingApiCall}
                                            text={t('Login')}
                        />
                    </div>
                </form>
            </div>
        );
    }
}

const LoginPageWithTranslation = withTranslation()(LoginPage);

export default withApiProgress(LoginPageWithTranslation,'/api/1.0/auth');