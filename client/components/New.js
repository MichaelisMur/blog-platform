import React from 'react'
import Header from './modules/Header'
import Refresh from './modules/Refresh'
import moment from 'moment'
import Post200 from './modules/Posts/Post200'
import { SketchPicker } from 'react-color'
import {Link} from 'react-router-dom'
import Cookies from 'universal-cookie'
const cookies = new Cookies();

class New extends React.Component{
    constructor(){
        super();
        this.state={
            hiddenText: "Sample",
            authCode: 0,
            unauthCode: 0,
            hiddenTextSize: "30",
            hiddenTextColor: "black",
            hiddenColorOpacity: "0.5",
            DNDstatus: "white",
            img: "",
            imageSent: false,
            imageUrl: "",
            post_id: "",
            comments: [],
            allDone: false,
            red: 255,
            green: 255,
            blue: 255,
            sketchPicker: "#fff",
            audioDND: "white",
            fetchingAudio: false,
            audioName: ""
        }
        this.send = this.send.bind(this);
        this.loadNudes = this.loadNudes.bind(this);
        this.handleChangeComplete = this.handleChangeComplete.bind(this);
        this.handleChangeCompleteText = this.handleChangeCompleteText.bind(this);
    }
    send(){
        console.log(cookies.get("access_token"));
        const fun = (refreshFunction)=>{
            fetch("/new", {
                method: 'POST',
                body: JSON.stringify({
                    id: this.state.post_id,
                    hiddenColor: this.state.sketchPicker,
                    hiddenColorOpacity: `${this.state.hiddenColorOpacity}`,
                    hiddenText: `${this.state.hiddenText}`,
                    hiddenTextSize: this.state.hiddenTextSize,
                    hiddenTextColor: this.state.hiddenTextColor,
                    authCode: this.state.authCode,
                    unauthCode: this.state.unauthCode,
                    access_token: cookies.get("access_token"),
                    username: cookies.get("username"),
                }),
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .then(response => {
                if(response.error === "access token expired") return refreshFunction(fun)
                this.setState({
                    allDone: true
                })
            })
            .catch(error => console.error('Error:', error));
        }
        Refresh(fun)
    }
    loadNudes(){
        const fun = (refreshFunction)=>{
            const formData = new FormData();
            formData.append('file', this.state.data);
            formData.append('name', this.state.name);
            formData.append('access_token', cookies.get("access_token"));
            formData.append('username', cookies.get("username"));

            fetch('/upload', {
                method: 'POST',
                body: formData,
            }).then(res=>res.json())
            .then(data=>{
                if(data.error === "access token expired") return refreshFunction(fun)
                if(!data.error){
                    this.setState({
                        imageSent: true,
                        img: data.img,
                        post_id: data.id
                    })
                } else {
                    window.location = "/"
                }
            });
        }
        Refresh(fun)
    }
    handleChangeComplete = (color) => {
        this.setState({ sketchPicker: color.hex });
    };
    handleChangeCompleteText = (color) => {
        this.setState({ hiddenTextColor: color.hex });
    };
    loadAudio(){
        const fun = (refreshFunction)=>{
            this.setState({fetchingAudio: true})
            const formData = new FormData();
            formData.append('file', this.state.audioFile);
            formData.append('name', this.state.audioName);
            formData.append('id', this.state.post_id);
            formData.append('access_token', cookies.get("access_token"));
            formData.append('username', cookies.get("username"));

            fetch('/uploadAudio', {
                method: 'POST',
                body: formData,
            }).then(res=>res.json())
            .then(data=>{
                if(data.error === "access token expired") return refreshFunction(fun)
                if(!data.error){
                    this.send()
                };
            });
        }
        Refresh(fun)
    }
    render(){
        if(!this.state.imageSent && !this.state.allDone){
            if(this.state.DNDstatus === "red"){
                this.loadNudes()
            }
            return(
                <div className="shit"
                    onDropCapture={(e)=>{
                        e.preventDefault();
                        this.setState({
                            DNDstatus: "red",
                            data: e.dataTransfer.files[0]
                        })
                    }}
                    onDragOver={(event) => {
                        event.preventDefault();
                        this.setState({
                            DNDstatus: "blue"
                        })
                    }}
                    onDragLeave={()=>{
                        this.setState({
                            DNDstatus: "white"
                        })
                    }}
                >
                    <Header
                        line={1}
                    />
                    <div className="newForm">
                        <div className="dnd"
                            style={{background: this.state.DNDstatus}}
                            onDoubleClick={()=>{
                                document.querySelector(".newForm>.picInput").click()
                            }}
                        >
                        </div>
                        <input type="file" className="picInput" style={{display: "none"}} 
                            onChange={(e)=>{
                                this.setState({
                                    DNDstatus: "red",
                                    data: e.target.files[0]
                                })
                            }}
                        />
                    </div>
                </div>
            )
        } else if(!this.state.allDone) {
            console.log(this.state.hiddenColor || `rgb(${this.state.red}, ${this.state.green}, ${this.state.blue})`)
            return(
                <div className="shit"
                onDropCapture={(e)=>{
                    e.preventDefault();
                    this.setState({
                        audioDND: "red",
                        audioFile: e.dataTransfer.files[0]
                    })
                }}
                onDragOver={(event) => {
                    event.preventDefault();
                    this.setState({
                        audioDND: "blue"
                    })
                }}
                onDragLeave={()=>{
                    this.setState({
                        audioDND: "white"
                    })
                }}
                >
                    <Header
                        line={1}
                    />
                    <div className="newForm">
                        <form
                            onSubmit={(e)=>{
                                e.preventDefault();
                                if(this.state.audioFile){
                                    this.loadAudio()
                                } else {
                                    this.send()
                                }
                            }}
                        >
                            <label>hiddenText:</label>
                            <textarea placeholder="hiddenText"
                                onChange={(e)=>{
                                    this.setState({
                                        hiddenText: `${e.target.value}`
                                    })
                                }}
                                value={this.state.hiddenText}
                            />
                            <label>hiddenTextSize:</label>
                            <input placeholder="hiddenTextSize"
                                onChange={(e)=>{
                                    this.setState({
                                        hiddenTextSize: e.target.value
                                    })
                                }}
                                value={this.state.hiddenTextSize}
                            />
                            <label>hiddenTextColor</label>
                            <input placeholder="hiddenTextColor"
                                onChange={(e)=>{
                                    this.setState({
                                        hiddenTextColor: e.target.value
                                    })
                                }}
                                value={this.state.hiddenTextColor}
                            />
                            <label>hiddenColor:</label>
                            <input placeholder="hiddenColor"
                                onChange={(e)=>{
                                    this.setState({
                                        sketchPicker: e.target.value
                                    })
                                }}
                                value={this.state.sketchPicker}
                            />
                            <label>hiddenColorOpacity:</label>
                            <input placeholder="hiddenColorOpacity"
                                onChange={(e)=>{
                                    this.setState({
                                        hiddenColorOpacity: e.target.value
                                    })
                                }}
                                value={this.state.hiddenColorOpacity}
                            />
                            <label>authCode:</label>
                            <input placeholder="authCode"
                                onChange={(e)=>{
                                    this.setState({
                                        authCode: e.target.value
                                    })
                                }}
                                value={this.state.authCode}
                            />
                            <label>unauthCode:</label>
                            <input placeholder="unauthCode"
                                onChange={(e)=>{
                                    this.setState({
                                        unauthCode: e.target.value
                                    })
                                }}
                                value={this.state.unauthCode}
                            />
                            <div className="audioDND"
                                style={{background: this.state.audioDND}}
                                onDoubleClick={()=>{
                                    document.querySelector(".newForm>form>.audioInput").click()
                                }}
                            >
                            </div>
                            
                            <input placeholder="audioName"
                                onChange={(e)=>{
                                    this.setState({
                                        audioName: e.target.value
                                    })
                                }}
                                value={this.state.audioName}
                            />
                            
                            <input type="file" className="audioInput" style={{display: "none"}} 
                                onChange={(e)=>{
                                    this.setState({
                                        audioDND: "red",
                                        audioFile: e.target.files[0]
                                    })
                                }}
                            />
                            <input type="submit" />
                        </form>

                        <div className="palette">
                            <div>
                            <SketchPicker
                                color={ this.state.sketchPicker }
                                onChangeComplete={ this.handleChangeComplete }
                                width="200px"
                            />
                            <br></br>
                            <SketchPicker 
                                color={ this.state.hiddenTextColor }
                                onChangeComplete={ this.handleChangeCompleteText }
                                width="200px"
                            />
                            </div>

                            <div className="example">
                                <Post200
                                    post_id={this.state.post_id}
                                    img={this.state.img}
                                    comments={this.state.comments}
                                    header={moment().format('MMMM Do YYYY, h:mm a')}
                                    hiddenColor={this.state.sketchPicker}
                                    hiddenColorOpacity={this.state.hiddenColorOpacity}
                                    hiddenText={this.state.hiddenText}
                                    hiddenTextColor={this.state.hiddenTextColor}
                                    hiddenTextSize={this.state.hiddenTextSize}
                                />
                            </div>
                        </div>
                        
                        

                    </div>
                    
                </div>
            )
        } else {
            window.scrollTo(0, 0);
            return(
                <div className="shit">
                    <Header
                        line={1}
                    />
                    <div className="allDone">
                        <h2>THat's all!</h2>
                        <br></br>
                        <Link to="/">
                            <h3>Go home</h3>
                        </Link>
                    </div>
                </div>
            )
        }
        
    }
}

export default New;