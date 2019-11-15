import React from 'react'
import Picture from '../Picture'
import Audio from '../Audio'
import PostSettings from '../PostSettings'

const Post201 = (props) => {
    return(
        <div className="Post">
            <div className="post-container">
                <div className="post-header">
                        <div className="postTime">{props.header}</div>
                        <div className="postSettings">
                            <PostSettings id={props.post_id} />
                            <a href={`/public/source/${props.post_id}_${props.img}.jpg`} target="blank">Full size</a>
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
                    <div className="restrictedComs">
                        <img className="restrictedImg" src="/public/lock.png" alt="restircted" />
                        <div className="restrictedLine">
                            This post's comment section is available for the best friends only ^^
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post201;