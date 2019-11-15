import React from 'react'
import {Link} from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars'

export default class Secret extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            scrollTop: 0,
            loaded: 0,
            experience: ["HTML5", "SASS", "JavaScript", "Node.js", "React", "Redux",
                "MongoDB", "MySQL", "ASP.NET"
            ],
            clientX: 0,
            clientY: 0,
            superColor: "rgb(32, 57, 204)",
            secondColor: "rgb(78, 78, 78)",
            text: `Hi! My name is Mikhail. I am a full-stack web developer specialized in React and Node.js and I am currently looking for an interesting part-time job or an internship`
        }
        this.myRef = React.createRef();
        this.cursor = this.cursor.bind(this);
    }
    letsRockOn(e){
        let divs = e.target.children;
        [].forEach.call(divs, function(div) {
            let deg = Math.floor(Math.random()*90)*(-1)**Math.floor(Math.random()*2);
            let x = Math.floor(Math.random()*40)*(-1)**Math.floor(Math.random()*2)*1.5;
            let y = Math.floor(Math.random()*40)*(-1)**Math.floor(Math.random()*2)*1.5;
            div.style.transform = `rotate(${deg}deg) translate(${x}px, ${y}px)`;
            setTimeout(()=>{
                let temp = div.style.transform.substring(
                        div.style.transform.indexOf("translate"))
                let DEG = div.style.transform.substring(
                    div.style.transform.indexOf("(")+1,
                    div.style.transform.indexOf(")")-3
                )
                let temp2 = temp.substring(
                    temp.indexOf("(")+1,
                    temp.indexOf(")")+1
                )
                let X = temp2.substring(
                    temp2.indexOf("("),
                    temp2.indexOf(",")-2
                )
                let Y = temp2.substring(
                    temp2.indexOf(", ")+2,
                    temp2.indexOf(")")-2
                )
                div.style.transform = `rotate(${DEG}deg) translate(${X/1.5}px, ${Y/1.5}px)`;
            }, 200)
        });
    }
    letsRockOff(e){
        let divs = e.target.children;
        [].forEach.call(divs, function(div) {
            div.style.transform = `rotate(0deg) translate(0px, 0px)`;
        });
    }
    
    render(){
        return(
            <Scrollbars style={{ width: "100%", height: "100vh", backgroundColor: "black",
            opacity: this.state.loaded ? 1 : 0, transitionDuration: "0.5s", userSelect: "none" }}
                renderThumbVertical={() =>
                    (<div style={{ backgroundColor: 'white', width: '4px', opacity: '0.5', borderRadius: "5px", cursor: "pointer"}} />)
                }
                onScroll={(e)=>{
                    this.setState(prevState=>{
                        let cursor = this.myRef.current;
                        let shitcode = e.target.scrollTop - prevState.scrollTop;
                        cursor.style.top = parseInt(cursor.style.top) + shitcode + "px";
                        return({
                            scrollTop: e.target.scrollTop
                        })
                    })
                }}
                onLoadCapture={()=>{
                    this.setState({
                        loaded: 1
                    })
                }}
            >
                <div className="cursor anima" ref={this.myRef}>
                    <div className="curs">

                    </div>
                </div>
                <div className="secret">
                    <Link to="/">
                        <div className="secretBack enlargeCursor">
                            <img src="/public/shitcrap.png" alt="back" />
                        </div>
                    </Link>
                    <div className="secretDescription">
                        <div className="secretDescriptionText">
                            {this.state.text.split(" ").map((el, key)=>(
                                <div
                                    className={
                                        ["Mikhail.", "Murashkin."].indexOf(el)!==-1 ? "secretDescriptionWord yoItsMe" : "secretDescriptionWord"
                                    }
                                    key={key}
                                >
                                    {el.split("").map((el, key)=>(
                                        <span key={key}>{el}</span>
                                    ))}
                                </div>
                                
                            ))}
                            <span className="typeYourShit">_</span>
                        </div>
                    </div>
                    <img src="/public/me.jpg" style={{display: "none"}}></img>


                    <div className="originalLine">
                        <div className="sometext enlargeCursor2">
                            I've always had a passion for product development and creating something really cool.
                            Now I have a strong desire to learn new
                            technologies and work on real projects.
                        </div>
                        <div style={{width:"60%", textAlign: "right"}}>
                            <div
                                style={{margin: "5px", textAlign: "right"}}
                            >
                                What I have an experience with:
                            </div>
                            {this.state.experience.map((el, key)=>(
                                <div className="expElement" key={key}
                                    onMouseOver={(e)=>{
                                        e.target.style.background = "rgb(59, 59, 59)"
                                    }}
                                    onMouseOut={(e)=>{
                                        e.target.style.background = "rgb(36, 36, 36)"
                                    }}
                                >
                                    {el}
                                </div>
                            ))}
                        </div>
                    </div>

                        
                    {/* <div className="contactMe">MY LINKS:</div> */}
                    <div className="secretLinks">
                        <a href="https://t.me/vergelding" target="_blank">
                            <div
                                onMouseOver={this.letsRockOn}
                                onMouseOut={this.letsRockOff}
                                className="enlargeCursor"
                            >
                                <span>T</span>
                                <span>E</span>
                                <span>L</span>
                                <span>E</span>
                                <span>G</span>
                                <span>R</span>
                                <span>A</span>
                                <span>M</span>
                            </div>
                        </a>
                        <a href="https://github.com/MichaelisMur" target="_blank">
                            <div
                                onMouseOver={this.letsRockOn}
                                onMouseOut={this.letsRockOff}
                                className="enlargeCursor"
                            >
                                <span>G</span>
                                <span>I</span>
                                <span>T</span>
                                <span>H</span>
                                <span>U</span>
                                <span>B</span>
                            </div>
                        </a>
                        <a href="https://www.instagram.com/4am_sunset/" target="_blank">
                            <div
                                onMouseOver={this.letsRockOn}
                                onMouseOut={this.letsRockOff}
                                className="enlargeCursor"
                            >
                                <span>I</span>
                                <span>N</span>
                                <span>S</span>
                                <span>T</span>
                                <span>A</span>
                                <span>G</span>
                                <span>R</span>
                                <span>A</span>
                                <span>M</span>
                            </div>
                        </a>
                    </div>
                </div>
            </Scrollbars>
        )
    }
    shakeThat(e){
        let x = e.clientX - document.querySelector(".secretDescriptionPicture").getBoundingClientRect().left - 275;
        let y = e.clientY - document.querySelector(".secretDescriptionPicture").offsetTop - 240 + window.pageYOffset;
        document.querySelector(".secretDescriptionPicture>img").style.transform = `perspective(1000px) 
        rotateX(${-y/window.innerHeight*5}deg) 
        rotateY(${x/window.innerWidth*5}deg)`
    }
    cursor(e){
        let cursor = this.myRef.current;
        cursor.style.left = e.clientX - 15 + "px";
        cursor.style.top = e.clientY + this.state.scrollTop + window.pageYOffset -15 + "px";
    }
    componentDidMount(){
        document.querySelectorAll(".secretDescriptionWord>span").forEach(el=>{
            let deg = Math.floor(Math.random()*90)*(-1)**Math.floor(Math.random()*2)
            let x = Math.floor(Math.random()*140)*(-1)**Math.floor(Math.random()*2)
            let y = Math.floor(Math.random()*140)*(-1)**Math.floor(Math.random()*2)
            el.style.transform = `rotate(${deg}deg) translate(${x}px, ${y}px)`
        })
        window.addEventListener("mousemove", this.cursor)
        document.querySelectorAll(".enlargeCursor").forEach(el=>{
            el.addEventListener("mouseover", ()=>{
                document.querySelector(".cursor>.curs").style.transform = "scale(2.2)"
            })
            el.addEventListener("mouseout", ()=>{
                document.querySelector(".cursor>.curs").style.transform = "scale(1)"
            })
        })
        document.querySelectorAll(".yoItsMe").forEach(el=>{
            el.addEventListener("mouseover", ()=>{
                document.querySelector(".cursor>.curs").style.transform = "scale(14)"
                document.querySelector(".cursor>.curs").style.width = "50px"
                document.querySelector(".cursor>.curs").style.borderRadius = "0"
                document.querySelector(".cursor>.curs").style.backgroundImage = "url(/public/me.jpg)"
                document.querySelector(".cursor>.curs").style.backgroundColor = "black"
            })
            el.addEventListener("mouseout", ()=>{
                document.querySelector(".cursor>.curs").style.transform = "scale(1)"
                document.querySelector(".cursor>.curs").style.borderRadius = "30px"
                document.querySelector(".cursor>.curs").style.width = "30px"
                document.querySelector(".cursor>.curs").style.backgroundImage = ""
                document.querySelector(".cursor>.curs").style.backgroundColor = "white"
            })
        })
        setTimeout(()=>{
            document.querySelector(".secret").style.opacity = "1"
            document.querySelectorAll(".secretDescriptionWord>span").forEach(el=>{
                el.style.transform = `rotate(0deg) translate(0px, 0px)`;
            })
        }, 0)
    }
    componentWillUnmount(){
        document.querySelectorAll(".enlargeCursor").forEach(el=>{
            el.removeEventListener("mouseover", ()=>{
                document.querySelector(".cursor>.curs").style.transform = "scale(2.2)"
            })
            el.removeEventListener("mouseout", ()=>{
                document.querySelector(".cursor>.curs").style.transform = "scale(1)"
            })
        })
        window.removeEventListener("mousemove", this.cursor)
    }
}