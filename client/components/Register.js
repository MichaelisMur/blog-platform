import React from 'react'
import Cookies from 'universal-cookie'
import Header from './modules/Header'
const cookies = new Cookies()

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            passwordRepeat: "",
            responded: 0,
            response: "",
            error: "",
            success: false,
            usernameErr: false,
            passwordRepeatErr: false,
            passwordErr: false,
            usernameTyped: false,
            passwordTyped: false,
            passwordRepeatTyped: false,
            fetching: 0
        }
    }
    render(){
        if(this.state.allDone) return(
            <div>
                <Header
                    line={true}
                    isStatic={true}
                />
                <div className="loginContainer">
                    All done, nigger!
                </div>
            </div>
        )
        return(
            <div>
                <Header
                    line={true}
                    isStatic={true}
                />
                <div className="loginContainer">
                    <form
                        style={{width: "100%"}}
                        onSubmit={(e)=>{
                            e.preventDefault();
                            if(this.state.fetching) return
                            if(!this.state.usernameTyped || this.state.username.length<3) return this.setState({
                                usernameErr: true
                            });
                            if(!this.state.passwordTyped || this.state.password.length<3) return this.setState({
                                passwordErr: true
                            })
                            if(!this.state.passwordRepeatTyped || this.state.passwordRepeat.length<3) return this.setState({
                                passwordErr: true
                            })
                            if(this.state.usernameErr || this.state.passwordErr || this.state.passwordRepeatErr) return
                            this.setState({fetching: 1})
                            fetch("/register", {
                                method: 'POST',
                                body: JSON.stringify({
                                    username: this.state.username,
                                    password: this.state.password
                                }),
                                headers:{
                                    'Content-Type': 'application/json'
                                }
                            }).then(res => res.json())
                            .then(response => {
                                this.setState({fetching: 0})
                                if(!response.error){
                                    this.setState({ allDone: true })
                                    cookies.set('username', response.username, { path: '/' });
                                    cookies.set("id", response.id, { path: '/' });
                                    cookies.set('access_token', response.access_token, { path: '/' });
                                    cookies.set('refresh_token', response.refresh_token, { path: '/' });
                                    cookies.set('vip', response.vip, { path: '/' });
                                    cookies.set('admin', response.admin, { path: '/' });
                                    window.location = "/"
                                } else {
                                    this.setState({
                                        username: "",
                                        error: response.error
                                    })
                                }
                            })
                            .catch(error => console.error('Error:', error));
                        }}
                    >
                        <input name="username" placeholder="Username"
                            autoFocus
                            onChange={(e)=>{
                                this.setState({
                                    username: e.target.value,
                                    error: "",
                                    usernameErr: false,
                                    usernameTyped: true
                                })
                            }}
                            value = {this.state.username}
                        />
                        <div
                            style={{
                                display: this.state.usernameErr?"block":"none"
                            }}
                        >
                            Enter your username, nigga :/
                        </div>
                        <div
                            style={{
                                display: this.state.error?"block":"none"
                            }}
                        >
                            {this.state.error}
                        </div>


                        <input name="password" placeholder="Password"
                            type="password"
                            onChange={(e)=>{
                                this.setState({
                                    password: e.target.value,
                                    error: "",
                                    passwordErr: false,
                                    passwordRepeatErr: false,
                                    passwordTyped: true
                                })
                            }}
                            onBlur={()=>{
                                this.setState(prevState=>({
                                    passwordRepeatErr: prevState.password === prevState.passwordRepeat || !prevState.passwordRepeatTyped ? false : true
                                }))
                            }}
                            value = {this.state.password}
                        />
                        <div
                            style={{
                                display: this.state.passwordErr?"block":"none"
                            }}
                        >
                            Das Passwort bitte
                        </div>


                        <input placeholder="Repeat password"
                            type="password"
                            onChange={(e)=>{
                                this.setState({
                                    passwordRepeat: e.target.value,
                                    error: "",
                                    passwordRepeatErr: false,
                                    passwordRepeatTyped: true
                                })
                            }}
                            onBlur={()=>{
                                this.setState(prevState=>({
                                    passwordRepeatErr: prevState.password === prevState.passwordRepeat ? false : true
                                }))
                            }}
                            value = {this.state.passwordRepeat}
                        />
                        <div
                            style={{
                                display: this.state.passwordRepeatErr?"block":"none"
                            }}
                        >
                            Passwords doesn't match
                        </div>
                        
                        <div style={{
                                textAlign: "center",
                                padding: "5px 0",
                                opacity: this.state.fetching ? "0.6" : "1"
                            }}>
                            <input type="submit" value="Sign Up" className="loginButton" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Register;