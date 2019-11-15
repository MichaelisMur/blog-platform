import React from 'react'
import Cookies from 'universal-cookie'
import Header from './modules/Header'
import {Link} from 'react-router-dom'
import {Icon} from 'semantic-ui-react'
const cookies = new Cookies();

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            error: "",
            success: false,
            usernameTyped: false,
            passwordTyped: false
        }
    }
    render(){
        if(this.state.success){
            return(
                <div>
                    <Header
                        line={true}
                        isStatic={true}
                    />
                    <div className="loginContainer">
                    <div className="newsLoading">
                        <Icon size='large' loading name='spinner' />
                    </div>
                    </div>
                </div>
            )
        } else {
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
                                if(!this.state.usernameTyped || this.state.username.length<3) return this.setState({
                                    usernameErr: true
                                })
                                if(!this.state.passwordTyped || this.state.password.length<3) return this.setState({
                                    passwordErr: true
                                })
                                fetch("/login", {
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
                                    if(!response.error){
                                        console.log(response.admin)
                                        this.setState({success: true})
                                        cookies.set("username", response.username, { path: '/' })
                                        cookies.set("access_token", response.access_token, { path: '/' })
                                        cookies.set("refresh_token", response.refresh_token, { path: '/' })
                                        cookies.set("admin", response.admin, { path: '/' })
                                        cookies.set("vip", response.admin || response.vip, { path: '/' })
                                        window.location = "/"
                                    } else {
                                        this.setState({
                                            username: "",
                                            password: "",
                                            error: response.error
                                        })
                                    }
                                    console.log(response)
                                })
                                .catch(error => console.error('Error:', error));
                            }}
                        >
                                
                            {/* <div style={{textAlign: "center", padding: "5px 0"}}>
                                LOGIN
                            </div> */}
                            <input placeholder="Username"
                                autoFocus
                                // style={{
                                //     border: this.state.usernameErr ? "1px solid lightgray" : "1px solid lightgray",
                                //     background: this.state.usernameErr ? "rgb(255, 199, 199)" : "white"
                                // }}
                                onChange={(e)=>{
                                    this.setState({
                                        username: e.target.value,
                                        error: "",
                                        usernameErr: false,
                                        usernameTyped: true
                                    })
                                }}
                                value={this.state.username}
                            />
                            <div
                                style={{
                                    display: this.state.usernameErr?"block":"none"
                                }}
                            >
                                Enter your username, nigga :/
                            </div>
                            <input placeholder="Password"
                                type="password"
                                onChange={(e)=>{
                                    this.setState({
                                        password: e.target.value,
                                        error: "",
                                        passwordErr: false,
                                        passwordTyped: true
                                    })
                                }}
                                value={this.state.password}
                            />
                            <div
                                style={{
                                    display: this.state.passwordErr?"block":"none"
                                }}
                            >
                                Das Passwort bitte
                            </div>
                            <div
                                style={{
                                    display: this.state.error?"block":"none"
                                }}
                            >
                                Nah.. try again
                            </div>
                            <div style={{textAlign: "center", padding: "10px 0"}}>
                                <input type="submit" value="Login" className="loginButton" />
                            </div>
                            <Link to="/register">
                                <div className="createAcc">Don't have an account yet, loser?</div>
                            </Link>
                        </form>
                    </div>
                </div>
            )
            
        }
    }
}

export default Login;