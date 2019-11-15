import React from 'react'
import Post200 from './modules/Posts/Post200'
import Post201 from './modules/Posts/Post201'
import Post202 from './modules/Posts/Post202'
import Post300 from './modules/Posts/Post300'
import Post301 from './modules/Posts/Post301'
import Post302 from './modules/Posts/Post302'
import Post203 from './modules/Posts/Post203'
import Post303 from './modules/Posts/Post303'
import Header from './modules/Header'
import Refresh from './modules/Refresh'
import Cookies from 'universal-cookie'
import {Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
const cookies = new Cookies()

class Main extends React.Component{
    _isMounted = false;
    constructor(props){
        super(props);
        this.state = {
            data: [

            ],
            index: 0,
            toShow: 2,
            endOfThePage: 0,
            fetching: 0,
            isPictureShown: false,
            playing: null,
            news: [],
            newsLoaded: 0,
            somethingLoaded: 0,
            loadingScreen: 1
        }
        this.fun = this.fun.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.CB = this.CB.bind(this);
        this.turnOffAnimation = this.turnOffAnimation.bind(this);
    }
    CB(param){
        this.setState({
            playing: param
        })
    }
    render(){
        return(
            <div>
            <Header /> 
            <div className="bigCurtains" style={{
                display: this.state.loadingScreen ? "flex": "none"
            }}>
                <img src="/public/logo.jpg" alt="logo" className="loadingLogo"></img>
            </div>
            <div className="MainContainer" style={{
                opacity: this.state.loadingScreen ? "0": "1"
            }}>
                <div className="someSpace">

                </div>
                <div className="Poster"
                    // style={{
                    //     backgroundImage: "url(/public/background.png)"
                    // }}
                >
                {/* <div className="meBlock">
                    <div className="test">
                    </div>
                </div> */}
                    <div className="posterText">
                        <div className="wow">

                            <div className="posterTitle">
                                Ah shit, here we go again..
                            </div>
                            <div className="posterInfo">
                                <div>This is my self-written shitpost platform</div><div>
                                Here you can find photos of <span
                                    style={{padding: "3px", color: "lightgrey", position: "relative"}}
                                    onMouseOver={()=>{
                                        this.setState({
                                            isPictureShown: true
                                        })
                                    }}
                                    onMouseLeave={()=>{
                                        this.setState({
                                            isPictureShown: false
                                        })
                                    }}
                                >
                                    me
                                    {/* <div className="wowPicture" style={{
                                        width: this.state.isPictureShown ? "200px" : "0",
                                        height: this.state.isPictureShown ? "200px" : "0",
                                    }}>

                                    </div> */}
                                </span> and my ugly friends, some music 
                                maybe and an enormous amount
                                of useful information
                                </div>
                                <div className="posterButton">
                                    <div className="curtainButton"
                                        onClick={()=>{
                                            window.scrollTo({ top: document.querySelector(".Main").offsetTop, behavior: 'smooth' })
                                        }}
                                    >

                                    </div>
                                    <div className="backgroundButton">

                                    </div>
                                    <div className="posterButtonSign enlargeCursor">
                                        Let's rock
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Main">
                    <div className="posts">
                        <div className="loading"
                                style={{display: this.state.fetching?"flex":"none"}}
                            >
                            <div className="loadingIcon">
                            </div>
                        </div>
                        {this.state.data.map((el, key)=>{
                            if(el.code===200){ //authorized shown everything
                                return(
                                    <Post200
                                        key={key}
                                        post_id={el.id}
                                        img={el.img}
                                        comments={el.comments}
                                        header={el.header}
                                        hiddenColor={el.hiddenColor}
                                        hiddenColorOpacity={el.hiddenColorOpacity}
                                        hiddenText={el.hiddenText}
                                        hiddenTextColor={el.hiddenTextColor}
                                        hiddenTextSize={el.hiddenTextSize}
                                        audio={el.audio}
                                        musicCB={this.CB}
                                        playing={el.audio === this.state.playing}
                                        code={el.code}
                                        authCode={el.authCode}
                                        vip={cookies.get("vip")}
                                    />
                                )
                            } else if (el.code===201) { //authorized without comments
                                return (
                                    <Post201
                                        key={key}
                                        post_id={el.id}
                                        img={el.img}
                                        header={el.header}
                                        hiddenColor={el.hiddenColor}
                                        hiddenColorOpacity={el.hiddenColorOpacity}
                                        hiddenText={el.hiddenText}
                                        hiddenTextColor={el.hiddenTextColor}
                                        hiddenTextSize={el.hiddenTextSize}
                                        audio={el.audio}
                                        musicCB={this.CB}
                                        playing={el.audio === this.state.playing}
                                    />
                                )
                            } else if (el.code===202) { //authorized pic only
                                return (
                                    <Post202 
                                        key={key}
                                        post_id={el.id}
                                        img={el.img}
                                        header={el.header}
                                    />
                                )
                            } else if (el.code===203) { //unauthorized nothing
                                return (
                                    <Post203
                                        key={key}
                                        post_id={el.id}
                                        header={el.header}
                                    />
                                )
                            } else if (el.code===300) { // unautorized shown everything
                                return (
                                    <Post300
                                        key={key}
                                        post_id={el.id}
                                        img={el.img}
                                        comments={el.comments}
                                        header={el.header}
                                        hiddenColor={el.hiddenColor}
                                        hiddenColorOpacity={el.hiddenColorOpacity}
                                        hiddenText={el.hiddenText}
                                        hiddenTextColor={el.hiddenTextColor}
                                        hiddenTextSize={el.hiddenTextSize}
                                        audio={el.audio}
                                        musicCB={this.CB}
                                        playing={el.audio === this.state.playing}
                                    />
                                )
                            } else if (el.code===301) { // unautorized without comments
                                return (
                                    <Post301
                                        key={key}
                                        post_id={el.id}
                                        img={el.img}
                                        comments={el.comments}
                                        header={el.header}
                                        hiddenColor={el.hiddenColor}
                                        hiddenColorOpacity={el.hiddenColorOpacity}
                                        hiddenText={el.hiddenText}
                                        hiddenTextColor={el.hiddenTextColor}
                                        hiddenTextSize={el.hiddenTextSize}
                                        audio={el.audio}
                                        musicCB={this.CB}
                                        playing={el.audio === this.state.playing}
                                    />
                                )
                            } else if (el.code===302) { //unauthorized pic only
                                return (
                                    <Post302 
                                        key={key}
                                        post_id={el.id}
                                        img={el.img}
                                        header={el.header}
                                    />
                                )
                            } else if (el.code===303) { //unauthorized nothing
                                return (
                                    <Post303
                                        key={key}
                                        post_id={el.id}
                                        header={el.header}
                                    />
                                )
                            }
                            return (
                                <div></div>
                            )
                            
                        })}
                        <div className="fetching"
                            style={{visibility: this.state.fetching ? "visible" : "hidden"}}
                        >
                            <Icon size='big' loading name='spinner' />
                        </div>
                    </div>
                    <div className="info">
                        <div className="important">
                            <div className="importantShadow">
                                <div className="importantContainer">
                                    <div className="importantLinkTitle">Last news</div>
                                    <div className="newsLoading"
                                        style={{
                                            display: this.state.newsLoaded ? "none" : "flex"
                                        }}
                                    >
                                        <Icon size='large' loading name='spinner' />
                                    </div>
                                    {this.state.news.map((el, key)=>(
                                        <Link to={`/news/${el.link}`} key={key}><div className="importantLink">{el.title}</div></Link>
                                    ))}
                                    <Link to="/news"><div className="importantLink" style={{
                                        textDecoration: "underline",
                                        color: "pink"
                                    }}>Show all...</div></Link>
                                    {/* <div className="importantLinkTitle">Send me nudes:</div>
                                    <Form>
                                        <TextArea placeholder='Tell us more' style={{ minHeight: 10 }} />
                                    </Form> */}
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
    fun(){
        const fun = (refreshFunction) => {
            if(this.state.endOfThePage || this.state.fetching) return
            this.setState({fetching: 1});
            fetch("/get", {
                method: "POST",
                body: JSON.stringify({
                    username: cookies.get("username"),
                    access_token: cookies.get("access_token"),
                    index: this.state.index,
                    toShow: this.state.toShow
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res=>res.json())
            .then(response=>{
                if(!response.error){
                    if(!this._isMounted) return
                    this.setState(prevState=>{
                        if(!response.length){
                            if(this.state.data.length===0){
                                this.loadNews()
                            }
                            return({
                                endOfThePage: 1,
                                fetching: 0,
                                loading: false,
                                loadingScreen: 0
                            })
                        }
                        let temp = [...prevState.data, ...response];
                        if(this.state.data.length===0) this.loadNews()
                        return({
                            index: prevState.index + prevState.toShow,
                            data: temp,
                            fetching: 0,
                            loading: false,
                            loadingScreen: 0
                        })
                    })
                    
                    if((window.pageYOffset + window.innerHeight) === document.body.scrollHeight){
                        this.fun()
                    }
                } else if(response.error==="access token expired"){
                    console.log("НА ВЗЛЕТ ЕБАТЬ");
                    this.setState({fetching: 0})
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
    loadNews(){
        const load = (refreshFunction) => {
            fetch("/lastNews", {
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
                    if(!this._isMounted) return
                    this.setState({
                        newsLoaded: 1,
                        news: response
                    })
                } else if(response.error==="wrong token"){
                    //=========FIX THIS
                    cookies.remove("username", { path: '/'});
                    cookies.remove("access_token", { path: '/'});
                    cookies.remove("refresh_token", { path: '/'});
                    cookies.remove("admin", { path: '/'});
                    window.location = "/";
                } else {
                    console.log("НА ВЗЛЕТ ЕБАТЬ");
                    this.setState({fetching: 0})
                    refreshFunction(load)
                }
            })
        }
        Refresh(load);
    }
    loadMore(){
        if(document.body.scrollHeight - (window.pageYOffset + window.innerHeight) < 300){
            this.fun();
        }
    }
    damn(e){
        if(window.innerWidth/2 > e.clientX){
            let shit = Math.sqrt((window.innerWidth/2 - e.clientX))
            document.querySelector(".posterText>.wow").style.left = "-" + shit + "px";
            
            let y = shit/3;
            let x = window.innerHeight/2 > e.clientY ? 
                Math.sqrt((window.innerHeight/2 - e.clientY))/2 : -Math.sqrt(Math.abs(window.innerHeight/2 - e.clientY))/2;
            document.querySelector(".posterText>.wow").style.transform = `perspective(1000px) rotateY(-${y}deg) rotateX(${x}deg)`;
        } else {
            let shit = Math.sqrt(Math.abs(window.innerWidth/2 - e.clientX))
            document.querySelector(".posterText>.wow").style.left = "+" + shit + "px";

            let y = shit/3;
            let x = window.innerHeight/2 > e.clientY ? 
                Math.sqrt((window.innerHeight/2 - e.clientY))/2 : -Math.sqrt(Math.abs(window.innerHeight/2 - e.clientY))/2;
            document.querySelector(".posterText>.wow").style.transform = `perspective(1000px) rotateY(${y}deg) rotateX(${x}deg)`;
        }

        if(window.innerHeight/2 > e.clientY){
            let shit = Math.sqrt((window.innerHeight/2 - e.clientY))
            document.querySelector(".posterText>.wow").style.top = "-" + shit + "px";
        } else {
            let shit = Math.sqrt(Math.abs(window.innerHeight/2 - e.clientY))
            document.querySelector(".posterText>.wow").style.top = "+" + shit + "px";
        }

    }
    //poster button animation
    ok(){
        document.querySelector(".posterText .backgroundButton").style.left = "0";
        document.querySelector(".posterText .posterButtonSign").style.color = "black";
    }
    ok2(){
        document.querySelector(".posterText .backgroundButton").style.left = "-100%";
        document.querySelector(".posterText .posterButtonSign").style.color = "white";
    }
    parallax(e){
        document.querySelector(".Poster").style.top = window.pageYOffset*0.4 + "px";
    }
    componentDidMount(){
        this._isMounted = true;
        this.turnOffAnimation()
        this.parallax()
        document.querySelector(".loadingLogo").style.opacity = 1;
        window.addEventListener("resize", this.turnOffAnimation)
        window.addEventListener("scroll", this.loadMore)
        if(window.innerWidth>=1100) window.addEventListener("mousemove", this.damn)
        document.querySelector(".posterText .curtainButton").addEventListener("mouseover", this.ok)
        document.querySelector(".posterText .curtainButton").addEventListener("mouseout", this.ok2)
        this.fun();
        window.addEventListener("scroll", this.parallax)
    }
    turnOffAnimation(){
        if(window.innerWidth<1050){
            document.querySelector(".posterText>.wow").style.left = ""
            document.querySelector(".posterText>.wow").style.right = ""
            document.querySelector(".posterText>.wow").style.top = ""
            window.removeEventListener("mousemove", this.damn)
        } else {
            if(!document.querySelector(".posterText>.wow")) return
            document.querySelector(".posterText>.wow").style.position = "absolute!important"
            window.addEventListener("mousemove", this.damn)
        }
    }
    componentWillUnmount(){
        this._isMounted = false;
        window.removeEventListener("scroll", this.loadMore)
        window.removeEventListener("mousemove", this.damn)
        document.querySelector(".posterText .curtainButton").removeEventListener("mouseover", this.ok)
        document.querySelector(".posterText .curtainButton").removeEventListener("mouseout", this.ok2)
        window.removeEventListener("scroll", this.parallax)
        window.removeEventListener("resize", this.turnOffAnimation)
    }
}

export default Main;