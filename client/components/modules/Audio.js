import React from 'react'
import encodeurl from 'encodeurl'

export default class Audio extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: props.name,
            playing: false,
            size: "22px",
            sec: "00",
            min: "0",
            durSec: "00",
            durMin: "0",
            musicCB: props.musicCB,
        }
        this.progress = this.progress.bind(this);
        this.load = this.load.bind(this);
        this.play = this.play.bind(this);
        this.stop = this.stop.bind(this);
        this.myRef = React.createRef()
    }
    componentDidUpdate(props){
        if(this.state.playing !== props.playing){
            this.setState({playing: props.playing})
        }
        if(!this.myRef.current) return
        if(props.playing){
            this.myRef.current.play()
        } else {
            this.myRef.current.pause()
        }
    }
    progress(e){
        let target = e.target;
        this.setState(prevState=>{
            let min = Math.floor(target.currentTime/60).toString()
            let sec = Math.floor(target.currentTime%60).toString()
            return({
                min,
                sec: sec.length === 1 ? `0${sec}` : sec,
            })
        });
    }
    load(e){
        let target = e.target;
        this.setState(()=>{
            let durMin = Math.floor(target.duration/60).toString();
            let durSec = Math.floor(target.duration%60).toString();
            return({
                durMin, durSec: durSec.length === 1 ? `0${durSec}` : durSec
            })
        })
    }
    play(){
        this.myRef.current.play()
        this.state.musicCB(this.state.name)
    }
    stop(){
        this.myRef.current.pause()
        this.state.musicCB("!!!GOVNOCODE!!!")
    }
    render(){
        if(this.state.name) return(
            <div style={{width: "100%"}}>
                <div className="audioContainer">
                    <audio
                        src={`https://audio-shitpost-platform.s3.eu-central-1.amazonaws.com/${this.state.name}.mp3`}
                        onTimeUpdate={this.progress}
                        onLoadedMetadata={this.load}
                        ref={this.myRef}
                        onEnded={this.stop}
                    />
                    <div className="playContainer">
                        <div className="playpause"
                            onClick={(e)=>{
                                // this.setState(prevState=>{
                                if(this.state.playing){
                                    this.stop()
                                } else {
                                    this.play()
                                }
                                // })

                            }}
                            onMouseOver={()=>this.setState({size: "24px"})}
                            onMouseLeave={()=>this.setState({size: "22px"})}
                            style={{
                                backgroundImage: this.state.playing ? "url(/public/pause2.png)" : "url(/public/play2.png)",
                                width: this.state.size,
                                height: this.state.size
                            }}
                        ></div>
                    </div>
                    <div className="songTitle">
                        {decodeURIComponent(this.state.name)}
                    </div>
                    <a href={`https://audio-shitpost-platform.s3.eu-central-1.amazonaws.com/${this.state.name}.mp3`} target="_blank" rel="noopener noreferrer" download={`${this.state.name}.mp3`}>
                        <img className="downloadAudio" src="/public/down2.png" alt="d" />
                    </a>
                    <div className="time">
                        {this.state.min}
                    </div>
                    :
                    <div className="time">
                        {this.state.sec}
                    </div>
                    /
                    <div className="time">
                        {this.state.durMin}
                    </div>
                    :
                    <div className="time">
                        {this.state.durSec}
                    </div>
                </div>
            </div>
        )
        return(
            <div></div>
        )
    }
}