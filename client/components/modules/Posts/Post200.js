import React from 'react'
import Picture from '../Picture'
import Comments from '../Comments'
import Audio from '../Audio'
import VipInfo from '../VipInfo'
import PostSettings from '../PostSettings'


class Post200 extends React.Component{
    constructor(props){
        console.log(props)
        super(props)
        this.state = {
            loaded: false
        }
        this.picLoaded = this.picLoaded.bind(this)
    }
    picLoaded(){
        this.setState({loaded: true})
        console.log("LOADED")
    }
    render(){
        if(!this.props.img){
            return(<div></div>)
        } else
        {
            return(
                <div className="Post">
                    <div className="post-container" style={{
                        display: this.state.loaded ? "block" : "none"
                    }}>
                        <div className="post-header">
                            <div className="postTime">{this.props.header}</div>
                            <div className="postSettings">
                                <PostSettings id={this.props.post_id} />
                                <VipInfo code={this.props.vip ? this.props.authCode : undefined} />
                                <a href={`https://source-shitpost-platform.s3.eu-central-1.amazonaws.com/${this.props.post_id}_${this.props.img}.jpg`} target="blank"
                                    onClick={()=>{
                                        fetch("/fullsized", {
                                            method: "POST",
                                            body: JSON.stringify({
                                                post: `https://source-shitpost-platform.s3.eu-central-1.amazonaws.com/${this.props.post_id}_${this.props.img}.jpg`,
                                            }),
                                            headers: {
                                                "Content-Type": "application/json"
                                            }
                                        })
                                    }}
                                >
                                    Full size
                                </a>
                            </div>
                        </div>
                        <Picture
                            img={this.props.img}
                            hiddenColor={this.props.hiddenColor}
                            hiddenColorOpacity={this.props.hiddenColorOpacity}
                            hiddenText={this.props.hiddenText}
                            hiddenTextColor={this.props.hiddenTextColor}
                            hiddenTextSize={this.props.hiddenTextSize}
                            post_id={this.props.post_id}
                            picLoaded={this.picLoaded}
                        />
                        <Audio
                            name={this.props.audio}
                            musicCB={this.props.musicCB}
                            playing={this.props.playing}
                        />
                        <div className="comments">
                            <Comments
                                data={this.props.comments}
                                post_id={this.props.post_id}
                            />
                        </div>
                    </div>

                    <div className="postPicLoading" style={{
                        display: this.state.loaded ? "none" : "flex"
                    }}>
                        <img src="/public/picloading.gif"></img>
                    </div>
                </div>
            )
        }
    }
}

export default Post200;