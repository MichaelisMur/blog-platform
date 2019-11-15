import React from 'react'
import Header from './modules/Header'
import Refresh from './modules/Refresh'
import Cookies from 'universal-cookie'
const cookies = new Cookies()

export default class AddNews extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: "",
            body: "",
            link: "",
            vip: ""
        }
        this.fun = this.fun.bind(this)
    }
    fun(){
        const fun = (refreshFunction) => {
            fetch("/addnews", {
                method: "POST",
                body: JSON.stringify({
                    username: cookies.get("username"),
                    access_token: cookies.get("access_token"),
                    title: this.state.title,
                    body: this.state.body,
                    link: this.state.link,
                    vip: this.state.vip
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res=>res.json())
            .then(response=>{
                if(!response.error){
                    console.log("success");
                    window.location = `/news/${response.link}`;
                } else if(response.error==="access token expired"){
                    console.log("НА ВЗЛЕТ ЕБАТЬ");
                    this.setState({fetching: 0})
                    refreshFunction(fun)
                } else if(response.error==="no admin"){
                    window.location = "/";
                } else {
                    //=========FIX THIS
                    cookies.remove("username", { path: '/'});
                    cookies.remove("access_token", { path: '/'});
                    cookies.remove("refresh_token", { path: '/'});
                    cookies.remove("admin", { path: '/'});
                    window.location = "/";
                }
            })
            .catch(error=>{console.log(error)})
        }
        Refresh(fun);
    }
    render(){
        if(!cookies.get("admin")) {
            window.location = "/"
            return(<div></div>)
        }
        return(
            <div className="shit">
                <Header
                    line={1}
                />
                <div className="newsForm">
                    <form
                        onSubmit={(e)=>{
                            e.preventDefault();
                            this.fun()
                        }}
                    >
                        <label>title</label>
                        <input placeholder="Title"
                            onChange={(e)=>{
                                this.setState({
                                    title: e.target.value,
                                    link: e.target.value.toLowerCase().split(' ').join("-").replace(/[^a-zA-Z--]+/g, '')
                                })
                            }}
                            value={this.state.title}
                        />
                        <label>link</label>
                        <input placeholder="link"
                            onChange={(e)=>{
                                this.setState({
                                    link: e.target.value
                                })
                            }}
                            value={this.state.link}
                        />
                        <label>body</label>
                        <textarea placeholder="Body" style={{resize: "none", height: "200px"}}
                            onChange={(e)=>{
                                this.setState({
                                    body: e.target.value
                                })
                            }}
                            value={this.state.body}
                        />
                        <label>vip</label>
                        <input placeholder="vip"
                            onChange={(e)=>{
                                this.setState({
                                    vip: e.target.value
                                })
                            }}
                            value={this.state.vip}
                        />
                        <input type="submit"/>
                    </form>
                </div>
            </div>
        )
    }
}