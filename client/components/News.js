import React from 'react'
import Header from './modules/Header'
import NewsObject from './modules/NewsObject'
import Refresh from './modules/Refresh'
import Cookies from 'universal-cookie'
const cookies = new Cookies()

export default class News extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading: 1,
            articles: []
        }
        this.fun = this.fun.bind(this)
        window.scrollTo(0,0)
        this.fun()
    }
    fun(){
        const fun = (refreshFunction) => {
            fetch("/getnews", {
                method: "POST",
                body: JSON.stringify({
                    username: cookies.get("username"),
                    access_token: cookies.get("access_token")
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res=>res.json())
            .then(response=>{
                if(!response.error){
                    this.setState({
                        loading: 0,
                        articles: response
                    })
                } else if(response.error==="access token expired"){
                    console.log("НА ВЗЛЕТ ЕБАТЬ");
                    refreshFunction(fun)
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
                    display: this.state.loading ? "flex" : "none"
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
                <div className="NewsMain">
                    {this.state.articles.map((el, key)=>{
                        if(el.hidden) return (
                            <div className="newContainer" key={key}>
                                <div className="new" style={{
                                        // height: "30px", display: "flex", "justifyContent": "center", width: "30%", margin: "auto"
                                    }}>
                                    <div className="newTitle" style={{}}>
                                        {el.title}
                                    </div>
                                    <div className="hiddenNewTitle">
                                        This one is hidden for you
                                        <img className="restrictedNews" src="/public/lock_grey.png" alt="restircted" />
                                    </div>
                                </div>
                            </div>
                        )
                        let em = el.body.length>200?"...":" "
                        return(
                        <NewsObject
                            title={el.title}
                            body={el.body.substring(0, 100) + em}
                            link={el.link}
                            key={key}
                        />
                    )})}
                </div>
            </div>
            </div>
        )
    }
    parallax(e){
        document.querySelector(".Poster").style.top = window.pageYOffset*0.4 + "px";
    }
    componentDidMount(){
        document.querySelector(".loadingLogo").style.opacity = 1;
        this.parallax()
        window.addEventListener("scroll", this.parallax)
    }
    componentWillUnmount(){
        window.removeEventListener("scroll", this.parallax)
    }
}