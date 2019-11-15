import React from 'react';

class Post203 extends React.Component{
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
                        <div className="hiddenPostLine">
                            <span style={{color: "gray"}}>This post is for the best friends only :)</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Post203;