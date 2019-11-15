import React from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const Logout = (props) => {
    return(
        <div className="UserMenuButtons"
            onClick={()=>{
                cookies.remove("username", { path: '/'});
                cookies.remove("access_token", { path: '/'});
                cookies.remove("refresh_token", { path: '/'});
                cookies.remove("admin", { path: '/'});
                cookies.remove("vip", { path: '/'});
                window.location = "/";
            }}
        >
            
            <div className="UserMenuButtonsText"
                onMouseOver={props.mouseOver}
                onMouseOut={props.mouseOut}
            >
                Log out
                <div className="UserMenuButtonsLine"></div>
            </div>
        </div>
    )
}

export default Logout;