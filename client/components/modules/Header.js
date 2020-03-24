import React from 'react'
import HeaderButton from './HeaderButton'
import Logout from './Logout'
import User from './User'
import Cookies from 'universal-cookie'
import {Link} from 'react-router-dom'
const cookies = new Cookies();

class Header extends React.Component{
    constructor(props){
        super(props);
        if(cookies.get("username")){
            let left = [
                {
                    title: "MichaelisMur",
                    destination: "/"
                },
            ]
            let right = [
                {
                    title: "Secret Stuff",
                    destination: "/bio"
                },
            ]
            this.state = {
                left,
                right,
                line: props.line,
                headerLine: {},
                isStatic: props.isStatic,
                color: "white",
                menu: false
            }
        } else {
            let left = [
                {
                    title: "MichaelisMur",
                    destination: ""
                },
            ]
            let right = [
                {
                    title: "Secret Stuff",
                    destination: "/bio"
                },
                {
                    title: "Sign In",
                    destination: "/login"
                },
            ]
            this.state = {
                left,
                right,
                line: props.line,
                headerLine: {},
                isStatic: props.isStatic,
                color: "white",
                menu: false
            }
        }
        this.Scroll = this.Scroll.bind(this)
        this.toggleMenu = this.toggleMenu.bind(this)
        this.hideMenu = this.hideMenu.bind(this)
    }
    mouseOver(e){
        e.target.children[0].style.width="100%"
    }
    mouseOut(e){
        e.target.children[0].style.width="0%"
    }
    Scroll(){
        if(!this.state.isStatic){
            if(window.scrollY>0){
                this.setState({
                    color: "black"
                })
                document.querySelectorAll(".headerLine").forEach(el=>{
                    el.style.background = "black";
                    el.parentElement.style.color = "black";
                })
                document.querySelector(".Header").style.background = "white";
                document.querySelector(".Header").style.borderBottom = "1px solid rgb(235, 235, 235)";
            } else {
                this.setState({
                    color: "white"
                })
                document.querySelectorAll(".headerLine").forEach(el=>{
                    el.style.background = "white";
                    el.parentElement.style.color = "white";
                })
                document.querySelector(".Header").style.background = "rgba(0,0,0,0)";
                document.querySelector(".Header").style.borderBottom = "none";
            }
        }
    }
    toggleMenu(){
        this.setState(prevState=>({
            menu: prevState.menu ? false : true
        }))
    }
    render(){
        return(
            <div>
                <div className="HeaderLine"
                    style={{
                        height: this.state.headerLine.height
                    }}
                ></div>
                <div className="Header">
                    <div className="innerHeader">
                        <div className="left">
                            {this.state.left.map((el, key)=>(
                                <HeaderButton
                                    title={el.title}
                                    destination={el.destination}
                                    key={key}
                                    mouseOver={this.mouseOver}
                                    mouseOut={this.mouseOut}
                                />
                            ))}
                        </div>
                        <div className="right">
                            <div className="UserMenuStar">
                                <div className="UserMenu"
                                    style={{display: this.state.menu?"flex":"none"}}
                                >
                                    
                                    <div className="headerMenuTriangle">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="rgb(205, 205, 205)">
                                                <polygon points="50 15, 100 100, 0 100"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="shitHeader">
                                        <div className="UserMenuButtons">
                                            <div className="UserMenuButtonsText">
                                                <div className="signedInAs">Signed in as</div>
                                                
                                                <div className="headerUsername">{cookies.get("username")}</div>
                                            </div>
                                            <div className="profilePic">
                                                <Link to={"user/" + cookies.get("username")}>
                                                    <img src="https://media-cdn.tripadvisor.com/media/photo-s/10/ac/bc/e8/pic-2.jpg" />
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="UserMenuButtons">
                                            <div className="UserMenuButtonsText"
                                                onMouseOver={this.mouseOver}
                                                onMouseOut={this.mouseOut}
                                            >
                                                <Link to="/news">
                                                    News<div className="UserMenuButtonsLine"></div>
                                                </Link>
                                                
                                            </div>
                                        </div>
                                        <div className="UserMenuButtons" style={{display: cookies.get("admin")?"block":"none"}}>
                                            <div className="UserMenuButtonsText"
                                                onMouseOver={this.mouseOver}
                                                onMouseOut={this.mouseOut}
                                            >
                                                <Link to="/new">
                                                    Add post<div className="UserMenuButtonsLine"></div>
                                                </Link>
                                                
                                            </div>
                                        </div><div className="UserMenuButtons" style={{display: cookies.get("admin")?"block":"none"}}>
                                            <div className="UserMenuButtonsText"
                                                onMouseOver={this.mouseOver}
                                                onMouseOut={this.mouseOut}
                                            >
                                                <Link to="/addnews">
                                                    Add news<div className="UserMenuButtonsLine"></div>
                                                </Link>
                                                
                                            </div>
                                        </div>
                                        <Logout mouseOver={this.mouseOver} mouseOut={this.mouseOut} />
                                    </div>
                                    
                                </div>
                            </div>
                            
                            <div className="headerPartUserCurtain"
                                style={{display: this.state.menu?"block":"none"}}
                                onClick={()=>{
                                    this.setState({menu: false})
                                }}
                            >

                            </div>
                            {this.state.right.map((el, key)=>(
                                <HeaderButton
                                    title={el.title}
                                    destination={el.destination}
                                    key={key}
                                    mouseOver={this.mouseOver}
                                    mouseOut={this.mouseOut}
                                />
                            ))}
                            <User color={this.state.color}
                                toggleMenu={this.toggleMenu}
                                username={cookies.get("username")}
                                vip={cookies.get("vip")}
                                admin={cookies.get("admin")}
                            />
                            
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
    hideMenu(){
        this.setState({menu: false})
    }
    componentDidMount(){
        if(this.state.isStatic){
            this.setState({
                color: "black"
            })
            document.querySelectorAll(".headerLine").forEach(el=>{
                el.style.background = "black";
                el.parentElement.style.color = "black";
            })
            document.querySelector(".Header").style.background = "white";
            document.querySelector(".Header").style.borderBottom = "1px solid rgb(235, 235, 235)";
        }
        if(document.querySelectorAll(".headerLine")){
            window.addEventListener("scroll", this.Scroll);
        }
        // console.log(document.querySelector(".Header").clientHeight)
        this.setState({
            headerLine: {
                height: this.state.line ? document.querySelector(".Header").clientHeight-1 : ""
            }
        })
        window.addEventListener("scroll", this.hideMenu);
    }
    componentWillUnmount(){
        window.removeEventListener("scroll", this.Scroll);
        window.removeEventListener("scroll", this.hideMenu);
    }
}

export default Header;