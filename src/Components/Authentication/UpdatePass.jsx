import React, { useContext, useRef, useState } from 'react'
import AuthStyle from "./classes.module.css";
import { ThreeDots } from 'react-loader-spinner'
import axios from '../../Utility/axios';
import { SignContext } from '../State/State';
import { stateType } from '../../Utility/reducer';


 function Updatepass() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [process ,setProcess] = useState(false)
    const [isAnimating, setIsAnimating] = useState(true);
    const password = useRef(null)
    const newpassword = useRef(null)
    const resetkey = useRef(null)
    const [errorMessage,setErrorMessage] =useState('')
    const[{signstate},dispatch]= useContext(SignContext)

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
      };

      const handleUpdatePassword= async(e) => {
        e.preventDefault()
         
        const resetKeyValue = resetkey.current.value;
        const passValue = password.current.value;
        const newPassValue = newpassword.current.value;
        // console.log(resetKeyValue,passValue,newPassValue)

        if(!resetKeyValue){
            resetkey.current.style.border = '0.5px solid red';         
            return; 
         }
         else if(!passValue){
           password.current.style.border = '0.5px solid red'; 
           return;
         }
         else if(!newPassValue){
            newpassword.current.style.border = '0.5px solid red'; 
            return;
         }
         
         if(passValue.length < 10 || newPassValue.length < 10){
             setErrorMessage('Your password should be at least 10 characters long.')
             return ;
         }


        if(passValue != newPassValue){ 
            setErrorMessage('Use the same password to confirm.')
            return ;
        }

        try {
          setProcess(true)

            await axios.post('users/reset/update',{
                   newPassword:newPassValue,
                   token:resetKeyValue
            })

            dispatch({type:stateType.SIGN_IN})

            
        } catch (error) {
            console.log(error)
             setProcess(false)
            if(error?.response?.data?.msg){
              setErrorMessage(error?.response?.data?.msg)
            }
        }
      };


    return (
        <div className={AuthStyle.form_container}>
            <div className={`${isAnimating ? AuthStyle.slidein : ''}`}>
                
            <div>
                    <p  className={`${AuthStyle.reset_title} ${AuthStyle.reset_message}`}>
                        {errorMessage && <p style={{color:'red', marginBottom:'10px'}}>{errorMessage} </p>
                        }
                       A reset link has been sent to your email address: 
                     
                        Please check your email to proceed with resetting your password.</p>

                    <a href="https://mail.google.com/mail/u/0/#inbox" target='_blank' className={AuthStyle.reset_goto_link}> 
                         Go to your email
                    </a>
            </div>

                  <form action="" onSubmit={handleUpdatePassword}>

                         <div className={AuthStyle.password_toggle_container}>
                                <input type= "text"  placeholder="Reset Key"
                                      ref={resetkey}  name="resetkey" />
                        </div>


                        <div className={AuthStyle.password_toggle_container}>

                              <input type={passwordVisible ? "text" : "password"} placeholder="Password"
                                      ref={password}  name="password" />

                              <span className={`fa ${passwordVisible ? "fa-eye" : "fa-eye-slash"}  ${AuthStyle.pwd_toggle}`}
                                              onClick={togglePasswordVisibility} aria-hidden="true">
                              </span>
                                
                        </div>

                        <div className={AuthStyle.password_toggle_container}>
                             <input type={passwordVisible ? "text" : "password"} placeholder="Confirm Password"
                                      ref={newpassword}  name="newpassword" />

                            <span className={`fa ${passwordVisible ? "fa-eye" : "fa-eye-slash"}  ${AuthStyle.pwd_toggle}`}
                                              onClick={togglePasswordVisibility} aria-hidden="true">
                            </span>

                        </div>

                        {process && <ThreeDots
                                  visible={true}
                                  height="40"
                                  width="40"
                                  color="#516CF0"
                                  radius="6"
                                  ariaLabel="three-dots-loading"
                                  wrapperStyle={{}}
                                  wrapperClass={AuthStyle.ThreeDotsCenter}
                                  />
                          }

                        <div className={AuthStyle.btn_container}>
                              <button type="submit">Update Password</button>
                        </div>

                  </form>
              </div>
        </div>
  );
}

export default Updatepass