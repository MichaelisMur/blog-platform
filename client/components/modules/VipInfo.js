import React from 'react'

const VipInfo = (props) => {
    if(props.code!==undefined){
        let sign;
        switch(props.code){
            case 0:
                sign = "shown to everyone";
                break
            case 1:
                sign = "plebeians cannot see comments";
                break
            case 2:
                sign = "plebeians see pic only";
                break
            case 3:
                sign = "post for ilitka only :3";
                break
            default:
        }
        return(
            // <div>
                <img src="/public/info.png" alt="" className="VipInfo" title={sign}  />
            // {/* </div> */}
        )
    } else {
        return(
            <div></div>
        )
    }
}

export default VipInfo