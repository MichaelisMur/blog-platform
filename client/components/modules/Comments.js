import React from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'universal-cookie'
import Refresh from './Refresh'
import CommentContainer from './CommentContainer'
import { TextArea, Form} from 'semantic-ui-react'
const cookies = new Cookies()

class Comments extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: props.data,
            yourComment: "",
            input: props.shown,
            post_id: props.post_id,
            opened: props.data.length > 3 ? false : true,
            loadMoreShown: props.data.length > 3 ? true : false,
            fetching: false
        }
        this.addComment = this.addComment.bind(this);
        this.onEnterPress = this.onEnterPress.bind(this);
    }
    onEnterPress(e){
        if(e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            this.addComment();
        }
    }
    addComment(){
        if(!this.state.yourComment) return
        this.setState({fetching: true})
        const fun = (refreshFunction) => {
            fetch("/comment", {
                method: "POST",
                body: JSON.stringify({
                    username: cookies.get("username"),
                    access_token: cookies.get("access_token"),
                    post_id: this.state.post_id,
                    comtext: this.state.yourComment
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json())
            .then(response => {
                if(!response.error){
                    this.setState({
                        fetching: false,
                        data: response,
                        yourComment: "",
                        opened: true,
                        loadMoreShown: false
                    });
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
        }
        Refresh(fun);
    }
    render(){
        if(this.state.input!==0){
            return(
                <div>
                    <Form onSubmit={(e)=>{
                            e.preventDefault();
                            this.addComment();
                        }}
                        loading={this.state.fetching?true:false}
                        >
                        <div className="commentsContainer">
                            {/* <div className="fetchingComment"
                                style={{display: this.state.fetching ? "flex" : "none"}}
                            >
                                <Icon size='large' color="grey" loading name='spinner' />
                            </div> */}
                            <div className="comms"
                                style={{
                                    opacity: this.state.fetching ? "0.5" : "1",
                                    padding: this.state.data.length?"4px 10px":"0 10px"
                                }}
                                
                            >
                                <CommentContainer
                                    data={this.state.data}
                                    post_id={this.state.post_id}
                                    opened={this.state.opened}
                                />
                                <div className="showMore"
                                    onClick={()=>{
                                        this.setState({
                                            opened:true,
                                            loadMoreShown: false
                                        })
                                    }}
                                    style={{display: this.state.loadMoreShown?"block":"none"}}
                                >
                                    Show more
                                </div>
                            </div>
                        </div>
                        <div className="addComment">
                            <TextArea
                                placeholder="Type your fun comment here"
                                style={{ minHeight: 43, "border": "none" }}
                                
                                onChange={(e)=>{
                                    this.setState({
                                        yourComment: e.target.value
                                    })
                                }}
                                value={this.state.yourComment}
                                onKeyDown={this.onEnterPress}
                            />
                            {/* <textarea type="text" placeholder="Type your fun comment here"
                            /> */}
                            <button type="submit" className="postCommentButton"
                                style={{
                                    color: this.state.yourComment ? "black" : "lightgray"
                                }}
                            >Post</button>
                        </div>
                    </Form>
                </div>
            )
        } else {
            return(
                <div>
                    
                    <div className="commentsContainer">
                        <div className="comms">
                        
                            <CommentContainer
                                data={this.state.data}
                                post_id={this.state.post_id}
                                opened={this.state.opened}
                            />
                            <div className="showMore"
                                onClick={()=>{
                                    this.setState({
                                        opened:true,
                                        loadMoreShown: false
                                    })
                                }}
                                style={{display: this.state.loadMoreShown?"block":"none"}}
                            >
                                Show more
                            </div>
                        </div>
                    </div>
                    <div className="logTocomment">
                        <Link to="/login">Log in</Link> to comment
                    </div>
                </div>
            )
        }
    }
}

export default Comments;