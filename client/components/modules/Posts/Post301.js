import React from 'react'
import Picture from '../Picture'
import {Link} from 'react-router-dom'
import Audio from '../Audio'

const Post301 = (props) => {
    return(
        <div className="Post">
            <div className="post-container">
                <div className="post-header">
                        <div className="postTime">{props.header}</div>
                        <div className="postSettings">
                            <a href={`http://localhost:3001/public/source/${props.post_id}_${props.img}.jpg`} target="blank">Full size</a>
                        </div>
                </div>
                <Picture
                    img={props.img}
                    hiddenColor={props.hiddenColor}
                    hiddenColorOpacity={props.hiddenColorOpacity}
                    hiddenText={props.hiddenText}
                    hiddenTextColor={props.hiddenTextColor}
                    hiddenTextSize={props.hiddenTextSize}
                    post_id={props.post_id}
                />
                <Audio name={props.audio}
                    musicCB={props.musicCB}
                    playing={props.playing}
                />
                <div className="comments">
                    <div className="logTocomment">
                    <Link to="/login">Log in</Link> to see this post's comments
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post301;