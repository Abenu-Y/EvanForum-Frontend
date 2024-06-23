import React, { useContext, useRef, useState } from 'react'
import AuthStyle from './classes.module.css'
import { SignContext } from '../State/State';
import { stateType } from "../../Utility/reducer";
import axios from '../../Utility/axios'
import ResetImg from '../../assets/Image/reset1.jpg'

function Reset() {
    const [isAnimating, setIsAnimating] = useState(true);
    const [{ signstate }, dispatch] = useContext(SignContext);
    const [sentResetMessage , SetSentResetMessage]=useState(true)
    const resetEmail = useRef(null)

    const handleReset = async(e) =>{
        e.preventDefault();

        const resetEmailValue = resetEmail.current.value;

        if(!resetEmail){
            alert('please insert email')
            return ;
        }

        try {

            await axios.post('/users/reset',{
                email:resetEmailValue
            })

            alert('proceed')
            SetSentResetMessage(false)
            dispatch({type:stateType.UPDATE})
            
        } catch (error) {
            console.log(error)
            alert('something went wrong!')
        }



    }

  return (
    <div className={AuthStyle.form_container}>
         <div className={`${isAnimating ? AuthStyle.slidein : ''}`}>
            {/* {
              sentResetMessage ?  */}
              {/* ( */}
              <form action="" onSubmit={handleReset}>
                      <div className={AuthStyle.reset_title}>Reset your Password</div>

                      <div className={AuthStyle.reset_instuction}>Fill in your e-mail address below and we will send you an email with further instructions.</div>

                      <div>
                        <input type="email" name="" id=""  placeholder='Email Address' ref={resetEmail}/>
                      </div>

                      <div className={AuthStyle.reset_button}>
                        <button type='submit'>Reset your Password</button>
                      </div>

                      <div className={AuthStyle.reset_redirect_link} onClick={()=>dispatch({type: stateType.SIGN_IN,})}>
                        Already have an account?
                        </div>

                      <div className={AuthStyle.reset_redirect_link} onClick={()=>dispatch({type: stateType.SIGN_UP,})}>
                          Don’t have an account?
                      </div>

              </form>
              {/* ): */}
              {/* (
                <div>
                    <p  className={`${AuthStyle.reset_title} ${AuthStyle.reset_message}`}>
                       A reset link has been sent to your email address: 
                        <span>
                            <a href="https://mail.google.com/mail/u/0/#inbox" target="_blank" rel="noopener noreferrer">         {resetEmail.current.value}
                            </a>
                          </span>. 
                        Please check your email to proceed with resetting your password.</p>

                    <div className={AuthStyle.reset_container}>
                          
                          <img src={ResetImg} alt="Reset Image" style={{width:'50%'}}/>
                    </div>
                    <a href="https://mail.google.com/mail/u/0/#inbox" target='_blank' className={AuthStyle.reset_goto_link}> 
                         Go to your email
                    </a>
                </div>
            ) */}
            {/* } */}
         </div>
    </div>
  )
}

export default Reset