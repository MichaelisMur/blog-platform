import React from 'react';
import Refresh from './Refresh';
import { Transition } from 'semantic-ui-react';
import Cookies from 'universal-cookie';
import {Loader} from 'semantic-ui-react'
const cookies = new Cookies();

export default class Comment extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            visible: false,
            author: props.author,
            username: props.username,
            comment: props.comment,
            id: props.id,
            post_id: props.post_id,
            isMine: props.author === props.username || props.username === "michaelis",
            showOptions: false,
            deleted: false,
            shown: props.shown,
            fetching: false
        }
        this.toggleOptions = this.toggleOptions.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.restoreComment = this.restoreComment.bind(this);
    }
    componentDidUpdate(){
        if(this.props.shown && !this.state.shown) {
            this.setState({shown: true})
        }
    }
    toggleOptions(){
        this.setState(prevState=>({
            visible: prevState.visible ? false : true
        }))
    }
    deleteComment(){
        if(!this.state.isMine) return
        const fun = (refreshFunction)=>{
            this.setState({fetching: true})
            fetch("/deletecomment", {
                method: "POST",
                body: JSON.stringify({
                    post_id: this.state.post_id,
                    username: this.state.username,
                    id: this.state.id,
                    action: "delete",
                    access_token: cookies.get("access_token")
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => response.json())
            .then(data => {
                if(!data.error) {
                    this.setState({
                        deleted: data.deleted,
                        visible: false,
                        fetching: false
                    })
                } else if(data.error==="access token expired"){
                    refreshFunction(fun)
                } else{
                    //=========FIX THIS
                    cookies.remove("username", { path: '/'});
                    cookies.remove("access_token", { path: '/'});
                    cookies.remove("refresh_token", { path: '/'});
                    cookies.remove("admin", { path: '/'});
                    cookies.remove("vip", { path: '/'});
                    window.location = "/";
                }
                this.setState({
                    visible: false
                })
            })
        }
        Refresh(fun)
    }
    restoreComment(){
        if(!this.state.isMine) return
        const fun = (refreshFunction)=>{
            this.setState({fetching: true})
            fetch("/restorecomment", {
                method: "POST",
                body: JSON.stringify({
                    post_id: this.state.post_id,
                    username: this.state.username,
                    id: this.state.id,
                    access_token: cookies.get("access_token")
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => response.json())
            .then(data => {
                if(data.error==="access token expired"){
                    refreshFunction(fun)
                } else if(data.error){
                    //=========FIX THIS
                    cookies.remove("username", { path: '/'});
                    cookies.remove("access_token", { path: '/'});
                    cookies.remove("refresh_token", { path: '/'});
                    cookies.remove("admin", { path: '/'});
                    cookies.remove("vip", { path: '/'});
                    window.location = "/";
                } else {
                    this.setState({
                        visible: false,
                        deleted: data.deleted,
                        fetching: false
                    })
                }
                this.setState({
                    visible: false
                })
            })
        }
        Refresh(fun)
    }
    render(){
        return(
            <div className="comment"
            onMouseOut={()=>{
                this.setState({
                    showOptions: false
                })
            }}
            onMouseOver={()=>{
                this.setState({
                    showOptions: true
                })
            }}
            // style={{background: this.state.shown?"white":"red"}}
            style={{display: this.state.shown?"flex":"none"}}
            >
                <div className="info">
                    <strong
                        style={{
                            opacity: this.state.deleted ? "0.3" : "1"
                        }}
                    >{this.state.author}</strong>
                    <span
                        style={{
                            opacity: this.state.deleted ? "0.3" : "1"
                        }}
                    > {this.state.comment}</span>
                </div>
                <div className="options"
                    onClick={this.toggleOptions}
                >
                    <div className="foo" style={{display: this.state.showOptions ? "flex" : "none"}}>
                        <div style={{display: this.state.fetching ? "none" : "flex"}}>
                            <img src="/public/options.png" alt="options" />
                        </div>
                        <div style={{display: this.state.fetching ? "block" : "none"}}>
                            <Loader active inline size="tiny" />
                        </div>
                    </div>
                </div>
                <Transition visible={this.state.visible} animation='scale' duration={200}>
                    <div className="comOptions">
                        <div className="optionsContainer">
                            <div className="button" style={{display: this.state.isMine && !this.state.deleted ? "flex" : "none"}}
                                onClick={this.deleteComment}
                            >
                                Delete
                            </div>
                            <div className="button" style={{display: this.state.isMine ? "none" : "flex"}}
                                onClick={()=>{
                                    console.log(this.state.id + " report")
                                }}
                            >
                                Report
                            </div>
                            <div className="button" style={{display: this.state.isMine && this.state.deleted ? "flex" : "none"}}
                                onClick={this.restoreComment}
                            >
                                Restore
                            </div>
                        </div>
                    </div>
                </Transition>
                <Transition visible={this.state.visible} animation='scale' duration={200}
                    onClick={this.toggleOptions}
                >
                    <div
                        className="curtain"
                        onClick={this.toggleOptions}
                    >
                    </div>
                </Transition>
            </div>
        )
    }
}