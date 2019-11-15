import React from 'react';
import Comment from './Comment';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const CommentContainer = (props)=>{
    if(props.data.length===0){
        return(
            <div style={{color: "grey"}}>
            </div>
        )
    } else {
        return(
            <div>
                {props.data.map((el, key)=>{
                    return(
                        <Comment
                            key={key + el.comment}
                            author={el.username}
                            comment={el.comment}
                            id={el._id}
                            username={cookies.get("username")}
                            post_id={props.post_id}
                            shown={props.opened || key<=2 ? true : false}
                        />
                    )
                })}
            </div>
        )
    }
}

export default CommentContainer