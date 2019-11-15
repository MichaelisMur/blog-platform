import React from 'react'
import Header from './modules/Header'
import Refresh from './modules/Refresh'
import Cookies from 'universal-cookie'
import {Link} from 'react-router-dom'
// import {Icon} from 'semantic-ui-react'
const cookies = new Cookies()

export default class Stat extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title: "",
            body: "",
            loading: 1,
            link: props.match.params.link,
            deleted: 0
        }
        this.toggle = this.toggle.bind(this)
        
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
    toggle(){
        const fun = (refreshFunction) => {
            fetch(`/togglenews`, {
                method: "POST",
                body: JSON.stringify({
                    username: cookies.get("username"),
                    access_token: cookies.get("access_token"),
                    link: this.state.link,
                    deleted: this.state.deleted
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res=>res.json())
            .then(response=>{
                if(!response.error){
                    this.setState({
                        deleted: response.deleted
                    })
                } else if(response.error==="access token expired"){
                    console.log("НА ВЗЛЕТ ЕБАТЬ");
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
                    <div className="NewsBlockPage">
                        <h1>{this.state.title}</h1>
                        <div className="body">{this.state.body}</div>
                        <div className="newsBlockPageLine"> </div>
                        <div className="knopfen">
                            <Link to="/">
                                <div>Main page</div>
                            </Link>
                            <Link to="/news">
                                <div>All news</div>
                            </Link>
                            
                            <img src={!this.state.deleted ?
                                "/public/delete.png" :
                                "/public/restore.png"} alt="del"
                                style={{
                                    display: cookies.get("admin")?"block":"none",
                                    width: "40px",
                                    height: "40px",
                                    cursor: "pointer"
                                }}
                                onClick={this.toggle}
                            />

                            <Link to={`/editnews/${this.state.link}`}
                                style={{    
                                    display: cookies.get("admin") ? "block" : "none"
                                }}
                            >
                                <img src="/public/settings.png" alt="edit"
                                    style={{
                                        display: cookies.get("admin")?"block":"none",
                                        width: "40px",
                                        height: "40px",
                                    }}
                                />
                            </Link>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
    // parallax(e){
    //     // console.log(window.pageYOffset);
    //     document.querySelector(".Poster").style.top = window.pageYOffset*0.4 + "px";
    // }
    componentDidMount(){
        document.querySelector(".loadingLogo").style.opacity = 1;
    }
}
