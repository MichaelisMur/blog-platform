import React from 'react'
import Refresh from './Refresh'
import Cookies from 'universal-cookie'
const cookies = new Cookies()

export default class StatEl extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username: props.username,
            vip: props.vip
        }
        this.changeRights = this.changeRights.bind(this)
    }
    changeRights(){
        const fun = (refreshFunction) => {
            fetch("/changeRights", {
                method: "POST",
                body: JSON.stringify({
                    usernameEl: this.state.username,
                    vip: this.state.vip,
                    access_token: cookies.get("access_token"),
                    username: cookies.get("username")
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res=>res.json())
            .then(data=>{

                
                if(!data.error){
                    this.setState({
                        vip: data.vip
                    })
                    window.scrollTo(0,0)
                } else if(data.error==="access token expired"){
                    console.log("НА ВЗЛЕТ ЕБАТЬ");
                    this.setState({fetching: 0})
                    refreshFunction(fun)
                } else if(data.error==="no admin"){
                    window.location = "/"
                } else {
                    window.location = "/"
                }
            })
        }
        
        Refresh(fun)
    }
    render(){
        return(
            <div className="statshit">
                <span>
                    {this.state.username}
                </span>
                <span
                    onClick={this.changeRights}
                >
                    {this.state.vip}
                </span>
            </div>
        )
    }
}