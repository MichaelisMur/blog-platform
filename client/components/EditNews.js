import React from 'react'
import Header from './modules/Header'
import Refresh from './modules/Refresh'
import Cookies from 'universal-cookie'
import {Link} from 'react-router-dom'
const cookies = new Cookies()

export default class Stat extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title: "",
            body: "",
            loading: 1,
            link: props.match.params.link,
            newLink: props.match.params.link,
            deleted: 0,
            vip: ""
        }
        
        if(!cookies.get("admin")) return window.location = "/news"
        const fun = (refreshFunction) => {
            fetch("/getarticle", {
                method: "POST",
                body: JSON.stringify({
                    username: cookies.get("username"),
                    access_token: cookies.get("access_token"),
                    link: this.props.match.params.link
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res=>res.json())
            .then(response=>{
                if(!response.error){
                    this.setState({
                        title: response.title,
                        body: response.body,
                        deleted: response.deleted,
                        vip: response.vip,
                        loading: 0
                    })
                } else if(response.error==="access token expired"){
                    console.log("НА ВЗЛЕТ ЕБАТЬ");
                    this.setState({fetching: 0})
                    refreshFunction(fun)
                } else if(response.error==="no vip"){
                    window.location = "/news"
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
    fun(){
        const fun = (refreshFunction) => {
            fetch("/editnews", {
                method: "POST",
                body: JSON.stringify({
                    username: cookies.get("username"),
                    access_token: cookies.get("access_token"),
                    link: this.props.match.params.link,
                    title: this.state.title,
                    body: this.state.body,
                    newLink: this.state.newLink,
                    vip: this.state.vip
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res=>res.json())
            .then(response=>{
                if(!response.error){
                    window.location = `/news/${response.link}`
                } else if(response.error==="access token expired"){
                    console.log("НА ВЗЛЕТ ЕБАТЬ");
                    this.setState({fetching: 0})
                    refreshFunction(fun)
                } else if(response.error==="no admin"){
                    window.location = "/news"
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
        return(
            <div>
                <div className="bigCurtains" style={{
                    display: this.state.loading ? "flex": "none"
                }}>
                    <img src="/public/logo.jpg" alt="logo" className="loadingLogo"></img>
                </div>
                <div style={{
                    transitionDuration: "0.3s",
                    opacity: this.state.loading ? "0" : "1"
                }}>
                    <Header 
                        line={1}
                    />
                    <div className="Poster"
                        style={{
                            zIndex: -1
                        }}
                    >
                    </div>
                    <div className="newsForm"
                        style={{
                            boxShadow: "0 0 5px rgba(0, 0, 0, 0.5)"
                        }}
                    >
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
                                        newLink: e.target.value.toLowerCase().split(' ').join("-").replace(/[^a-zA-Z--]+/g, '')
                                    })
                                }}
                                value={this.state.title}
                            />
                            <label>link</label>
                            <input placeholder="link"
                                onChange={(e)=>{
                                    this.setState({
                                        newLink: e.target.value
                                    })
                                }}
                                value={this.state.newLink}
                            />
                            <label>body</label>
                            <textarea placeholder="Body" style={{height: "100px"}}
                                onChange={(e)=>{
                                    this.setState({
                                        body: e.target.value
                                    })
                                }}
                                value={this.state.body}
                                style={{
                                    height: "250px"
                                }}
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
                    
                        <div className="knopfen">
                            <Link to={`/news/${this.state.link}`}>
                                <div>Back</div>
                            </Link>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
    componentDidMount(){
        document.querySelector(".loadingLogo").style.opacity = 1;
    }
}
