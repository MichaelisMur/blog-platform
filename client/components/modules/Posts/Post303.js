import React from 'react';
import {Link} from 'react-router-dom';

class Post303 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            header: props.header,
        }
    }
    render(){
        return(
            <div className="Post">
                <div className="post-container">
                    <div className="post-header">
                        <div className="postTime"></div>
                        <div className="hiddenPostLine">
                            <Link to="/login">Log in</Link><span>to see this post's information</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Post303;