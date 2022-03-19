import React from 'react'
import './waiting.scss'
import { useNavigate } from 'react-router-dom'
import { getUserById, urlUserAvatar } from '../../../APIs/ConnectAPI'

function WaitingCall() {

    const [user, setUser] = React.useState({})

    const navigate = useNavigate()


    const handleToMissCall = (e)=> {
        window.close()
    }

    React.useEffect(()=>{
        if(!localStorage.getItem('accessToken')) {
            navigate('/')
        }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(async ()=> {
        if(localStorage.getItem('userId')) {
            const result = await getUserById(localStorage.getItem('userId'))
            if(result && result.status === 200) {
                setUser(result.data.data)
            }
        }
    }, [])



    return (
        <div className="waiting-vocal-call-wrapper">
            <div className="waiting-vocal-call-user-info-group">
                <img className='waiting-vocal-call-user-avt' src={urlUserAvatar + user.image} alt="" />
                <p className='waiting-vocal-call-user-status'>Đang gọi<span style={{"--value": 1}}>.</span ><span style={{"--value": 2}}>.</span><span style={{"--value": 3}}>.</span></p>  
            </div>
            <div className="waiting-vocal-call-icons-group">
                <div className="waiting-vocal-call-phone-icon waiting-vocal-call-phone-icon-phone-down" onClick={handleToMissCall}>
                    <i class="fa-solid fa-phone-slash"></i>
                </div>
            </div>
        </div>
    )
}

export default WaitingCall