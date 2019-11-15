import React from 'react'
import Picture from '../Picture'
import Comments from '../Comments'
import Audio from '../Audio'

const Post300 = (props) => {
    return(
        <div className="Post">
            <div className="post-container">
                <div className="post-header">
                    <div className="postTime">{props.header}</div>
                    <div className="postSettings">
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
                    <Comments
                        data={props.comments}
                        shown={0}
                        post_id={props.post_id}
                    />
                </div>
            </div>
        </div>
    )
}

export default Post300;