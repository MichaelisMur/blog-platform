import React from 'react'
import Header from './modules/Header'
import StatEl from './modules/StatEl'
import { Segment } from 'semantic-ui-react'
import Refresh from './modules/Refresh'
import Cookies from 'universal-cookie'
const cookies = new Cookies()

export default class Stat extends React.Component{
    constructor(){
        super();
        this.state={
            data: [
            ],
            access_token: cookies.get("access_token"),
            username_admin: cookies.get("username")
        }
    }
    componentDidMount(){
        const fun = (refreshFunction)=>{
            fetch("/stat", {
                method: "POST",
                body: JSON.stringify({
                    username: this.state.username_admin,
                    access_token: this.state.access_token
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res=>res.json())
            .then(data=>{
                if(!data.error){
                    console.log(data)
                    this.setState({
                        data
                    })
                    window.scrollTo(0,0)
                } else if(data.error==="access token expired"){
                    console.log("НА ВЗЛЕТ ЕБАТЬ");
                    this.setState({fetching: 0})
                    refreshFunction(fun)
                } else if(data.error==="no admin"){
                    window.location = "/"
                } else {
                    //=========FIX THIS
                    cookies.remove("username", { path: '/'})
                    cookies.remove("access_token", { path: '/'})
                    cookies.remove("refresh_token", { path: '/'})
                    cookies.remove("admin", { path: '/'})
                    window.location = "/"
                }
            })
        }
        Refresh(fun)
    }
    fun(){
        
    }
    render(){
        return(
            <div className="shit">
                <Header
                    line={1}
                />
                <Segment compact>
                   <div className="stat">
                        {this.state.data.map((el, key)=>(
                            <StatEl
                                username={el.username}
                                vip={el.vip}
                                key={key}
                            />
                        ))}
                    </div> 
                </Segment>
                
                
            </div>
        )
    }
}