import React from 'react'
import Cookies from 'universal-cookie'
import {Link} from 'react-router-dom'
import Refresh from './Refresh'
const cookies = new Cookies()

export default class PostSettings extends React.Component{
    constructor(props){
        super()
        this.state = {
            shown: true
        }
        this.delete = this.delete.bind(this)
        this.restore = this.restore.bind(this)
    }
    delete(){
        let fun = (refreshFunction) => {
            fetch("/delete", {
                method: 'POST',
                body: JSON.stringify({
                    id: this.props.id,
                    access_token: cookies.get("access_token"),
                    username: cookies.get("username"),
                }),
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .then(response => {
                if(response.error === "access token expired") return refreshFunction(fun)
                if(!response.error){
                    console.log("deleted")
                    this.setState({
                        shown: false
                    })
                }
            })
            .catch(error => console.error('Error:', error));
        }
        Refresh(fun)
    }
    restore(){
        let fun = (refreshFunction) => {
            fetch("/restore", {
                method: 'POST',
                body: JSON.stringify({
                    id: this.props.id,
                    access_token: cookies.get("access_token"),
                    username: cookies.get("username"),
                }),
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .then(response => {
                if(response.error === "access token expired") return refreshFunction(fun)
                if(!response.error){
                    console.log("restored")
                    this.setState({
                        shown: true
                    })
                } else {
                    //=========FIX THIS
                    cookies.remove("username", { path: '/'});
                    cookies.remove("access_token", { path: '/'});
                    cookies.remove("refresh_token", { path: '/'});
                    cookies.remove("admin", { path: '/'});
                    window.location = "/";
                }
            })
            .catch(error => console.error('Error:', error));
        }
        Refresh(fun)
    }
    render(){
        return(
            <div className="PostSettingsContainer">
                <Link to={`/edit/${this.props.id}`}>
                    <img src="/public/settings.png" alt="del"
                        style={{display: cookies.get("admin")?"block":"none"}}
                    />
                </Link>
                <img src={this.state.shown ? "/public/delete.png" : "/public/restore.png"} alt="del"
                    style={{display: cookies.get("admin")?"block":"none"}}
                    onClick={this.state.shown ? this.delete : this.restore}
                />
            </div>
        )
    }
}