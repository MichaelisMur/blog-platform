import React from 'react'
import Header from './modules/Header'
import { SketchPicker } from 'react-color'
import Post200 from './modules/Posts/Post200'
import Cookies from 'universal-cookie'
import Refresh from './modules/Refresh'
const cookies = new Cookies();

export default class Edit extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id: props.match.params.id,
            hiddenText: "",
            hiddenTextSize: "",
            hiddenTextColor: "",
            hiddenColor: "",
            hiddenColorOpacity: "",
            authCode: "",
            unauthCode: "",
            audioName: "",
            sketchPicker: "",
            img: "",
            comments: [],
            header: "",
            audioDND: "white",
            audioChanged: false
        }
        this.handleChangeComplete = this.handleChangeComplete.bind(this);
        this.handleChangeCompleteText = this.handleChangeCompleteText.bind(this);
        this.loadAudio = this.loadAudio.bind(this);
        this.send = this.send.bind(this);
    }
    componentDidMount(){
        window.scrollTo(0,0)
        let fun = (refreshFunction) => {
            fetch("/getPost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: this.state.id,
                    access_token: cookies.get("access_token"),
                    username: cookies.get("username")
                })
            }).then(res=>res.json())
            .then(data=>{
                if(data.error === "access token expired") return refreshFunction(fun)
                if(!data._id) return window.location="/"
                // console.log(data)
                this.setState({
                    hiddenText: data.hiddenText,
                    hiddenTextSize: data.hiddenTextSize,
                    hiddenTextColor: data.hiddenTextColor,
                    sketchPicker: data.hiddenColor,
                    hiddenColorOpacity: data.hiddenColorOpacity,
                    authCode: data.authCode,
                    unauthCode: data.unauthCode,
                    audioName: data.audio || "",
                    img: data.img,
                    comments: data.comments,
                    header: data.header,
                    allDone: false
                })
            })
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
            formData.append('id', this.state.id);
            formData.append('access_token', cookies.get("access_token"));
            formData.append('username', cookies.get("username"));

            fetch('/uploadAudio', {
                method: 'POST',
                body: formData,
            }).then(res=>res.json())
            .then(data=>{
                if(data.error === "access token expired") return refreshFunction(fun)
                if(!data.err){
                    this.send()
                };
            });
        }
        Refresh(fun)
    }
    send(){
        const fun = (refreshFunction)=>{
            fetch("/update", {
                method: 'POST',
                body: JSON.stringify({
                    id: this.state.id,
                    hiddenColor: this.state.sketchPicker,
                    hiddenColorOpacity: this.state.hiddenColorOpacity,
                    hiddenText: this.state.hiddenText,
                    hiddenTextSize: this.state.hiddenTextSize,
                    hiddenTextColor: this.state.hiddenTextColor,
                    authCode: this.state.authCode,
                    unauthCode: this.state.unauthCode,
                    access_token: cookies.get("access_token"),
                    username: cookies.get("username")
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
    render(){
        if(this.state.allDone) return window.location="/"
        return(
            <div className="shit"
                onDropCapture={(e)=>{
                    e.preventDefault();
                    this.setState({
                        audioDND: "red",
                        audioFile: e.dataTransfer.files[0],
                        audioChanged: true
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
                                if(this.state.audioChanged){
                                    this.loadAudio()
                                } else {
                                    this.send()
                                }
                                console.log(this.state)
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
                                value={decodeURIComponent(this.state.audioName)}
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
                                    post_id={this.state.id}
                                    img={this.state.img}
                                    comments={this.state.comments}
                                    header={this.state.header}
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
    }
}