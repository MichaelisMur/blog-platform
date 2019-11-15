import React from 'react'
import {Link} from 'react-router-dom'

export default class NewsObject extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            height: "60px"
        }
    }
    render(){
        return(
            <div className="newContainer"
                onClick={(e)=>{
                    if((e.target.className === "newText" && this.state.height === "60px")) return e.preventDefault
                    this.setState(prevState=>{
                        return({
                            height: prevState.height === "60px" ? "130px" : "60px"
                        })
                    })
                }}
            >
                <div className="new"
                        style={{
                            height: this.state.height
                        }}
                    >
                    <div className="newTitle">
                        {this.props.title}
                    </div>
                    <div className="newLink"
                        style={{
                            transform: this.state.height === "60px" ? "rotate(180deg)" : "rotate(0deg)"
                        }}
                    >
                        <div className="arrowDown">
                        </div>
                    </div>
                    <div className="newText">
                        <div className="newsBody"
                            style={{
                                opacity: this.state.height === "60px" ? "0" : "1"
                            }}
                        >
                            {this.props.body}
                        </div>
                        <div className="newsLink"
                            style={{
                                opacity: this.state.height === "60px" ? "0" : "1",
                                transitionDelay: this.state.height === "60px" ? "0s" : "0.1s"
                            }}
                        >
                            <Link to={`/news/${this.props.link}`}>Open up</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}