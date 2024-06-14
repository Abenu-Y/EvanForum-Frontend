import React, { useContext, useState } from 'react'
import AuthStyle from './classes.module.css'
import SignIn from './SignIn'
import SignUp from './SignUp'
import { SignContext } from '../State/State'
// import  {Navigate}  from 'react-router-dom'


const Auth = () => {

  // const [signState, setSignState]= useState(false)
  const [{signstate}, dispatch] = useContext(SignContext)



  return (
        <div className={AuthStyle.auth_outer_container}>

            <div className={AuthStyle.auth_inner_container}>

                  {
                    signstate =='SIGN UP' ? <SignUp /> :<SignIn /> 
                  }

                  <div className={AuthStyle.content}>

                        <p>About</p>

                        <div className={AuthStyle.evan_title}>
                            <h2> Evangadi Networks</h2>
                        </div>

                        <div className={AuthStyle.content_description}>
                                    
                                <h4>Join Our Web Q&A Community</h4>
                                    
                                <p>
                                    Connect with fellow web enthusiasts. Ask questions, share answers, and learn together. Whether you're building websites or need online tips, our community is here to help.
                                    <span>
                                        <em>
                                          “Coming together is a beginning; keeping together is progress; working together is success.” 
                                         </em>
                                     </span>– Henry Ford
                                </p>

                                <p>
                                      Our friendly community supports you at every step. Whether you're a beginner or an expert, everyone collaborates to find solutions and share knowledge. Enjoy your web journey with us!
                                </p>

                            

                        </div>

                        <div>
                            <button >HOW IT Works</button>
                        </div>

                  </div>

            </div>

        </div>
        )
}

export default Auth