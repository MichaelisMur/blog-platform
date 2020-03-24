import React from 'react'
import Header from './modules/Header'
import Cookies from 'universal-cookie'
import Refresh from './modules/Refresh'
const cookies = new Cookies()

export default class User extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username: props.match.params.username,
            isMine: props.match.params.username === cookies.get("access_token")
        }
        const fun = (refreshFunction) => {
            // if(this.state.isMine){
            //     body = JSON.stringify({
            //         username: cookies.get("username"),
            //         access_token: cookies.get("access_token"),
            //         link: this.props.match.params.link
            //     })
            // } else {
            //     body = JSON.stringify({
            //         username: cookies.get("username"),
            //         access_token: cookies.get("access_token"),
            //         link: this.props.match.params.link
            //     })
            // }
            fetch("/userinfo", {
                method: "POST",
                body: JSON.stringify({
                    username: cookies.get("username"),
                    access_token: cookies.get("access_token"),
                    link: this.props.match.params.link
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res=>res.json())
            .then(response=>{
                if(!response.error){
                    this.setState({
                        title: response.title,
                        body: response.body,
                        deleted: response.deleted,
                        loading: 0
                    })
                } else if(response.error==="access token expired"){
                    console.log("НА ВЗЛЕТ ЕБАТЬ");
                    this.setState({fetching: 0})
                    refreshFunction(fun)
                } else if(response.error==="no vip"){
                    window.location = "/news"
                } else {
                    //=========FIX THIS
                    cookies.remove("username", { path: '/'});
                    cookies.remove("access_token", { path: '/'});
                    cookies.remove("refresh_token", { path: '/'});
                    cookies.remove("admin", { path: '/'});
                    window.location = "/";
                }
            })
            .catch(error=>{console.log(error)})
        }
        Refresh(fun);
    }
    render(){
        return(
            <div className="shit">
                <Header
                    line={1}
                />
                <div className="profileBlock">
                    <div>
                        <img className="profileSourcePicture"
                            src="https://media-exp1.licdn.com/dms/image/C560BAQG-vLQJr3J3zg/company-logo_200_200/0?e=2159024400&v=beta&t=cXNxHCDmX7A_e_LGk75XIbL-eVc7VYdHQfSFH39r3Qo"
                        />
                        <div class="pictureUpdateButton">
                            Change profile picture
                        </div>
                    </div>
                    <form
                        onSubmit={(e)=>{
                            e.preventDefault();

                        }}
                    >
                        <div className="profileInputContainer">
                            <div>Public name:</div>
                            <input placeholder="hiddenTextSize"
                                onChange={(e)=>{
                                    this.setState({
                                        hiddenTextSize: e.target.value
                                    })
                                }}
                                value={this.state.hiddenTextSize}
                            />
                        </div>

                        <div className="profileInputContainer">
                            <div>Username:</div>
                            <input placeholder="hiddenTextSize"
                                onChange={(e)=>{
                                    this.setState({
                                        hiddenTextSize: e.target.value
                                    })
                                }}
                                value={this.state.hiddenTextSize}
                            />
                        </div>
                        <div class="profileUpdateButton">
                            Save profile information
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}