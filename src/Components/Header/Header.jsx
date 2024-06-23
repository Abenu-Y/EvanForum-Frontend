import React, { useContext, useEffect, useState } from 'react'
import HeaderStyle from './Classes.module.css'
import Images from '../Constant/Images/Images'
import { SignContext } from '../State/State'
import { stateType } from '../../Utility/reducer'
import { RiMenu3Line } from "react-icons/ri";
import {Link, useNavigate} from 'react-router-dom'
import { AppState } from '../../Router'

function Header() {

    const [{signstate}, dispatch] = useContext(SignContext)
    const {user} = useContext(AppState)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 769)
    const [visible , SetVisible] = useState(false)
    const goto = useNavigate()


    let msg = user.msg;
    const handleSignState = () => {
      dispatch({ type :  signstate == 'SIGN UP' ? stateType.SIGN_IN : stateType.SIGN_UP})
     }

     const handleLogOut = () =>{
        localStorage.removeItem("token");
        setTimeout(() => { window.location.reload(); goto('/')}, 3000)
        
     }

 
    useEffect(() => {

        const handleResize = () => {
          setIsMobile(window.innerWidth < 800);
        };

       window.addEventListener('resize', handleResize);
      
      // Cleanup event listener on component unmount
       return () => window.removeEventListener('resize', handleResize);

   }, [])

   useEffect(()=>{},[user])

 
  return (
         <div className={HeaderStyle.header_outer_container} id='header'>
               
               
               <div className={HeaderStyle.header_inner_container}>
                    
                       <div className={HeaderStyle.logo_container} >
                            <Link to={`${msg =='valid user'?'/home':'/'}`}>
                                <img src={Images.BlackLogo} alt="Evangadi Logo" />
                            </Link>
                       </div>

                 

                       {isMobile ?(
                          <div className={HeaderStyle.header_canvas_container}>
                                  <div ><RiMenu3Line size={35} color='#FF8500' onClick={()=>SetVisible(!visible)}/></div>
                            
                                  <div className={`${HeaderStyle.header_canvas_inner_container} 
                                                 ${ visible ?  HeaderStyle.display:''} `} 
                                    >

                                       <div><Link to="#" onClick={()=>dispatch({type:stateType.SIGN_UP})}>Home</Link></div>
                                       <div><a href="#footer" >How it Works</a></div>
                            {
                               ( msg == 'NO AUTORIZATION' || msg == 'NULL AUTORIZATION' || msg == 'INVALID USER') ? (
                                    <div>
                                          <button onClick={handleSignState}>
                                                  {signstate == 'SIGN UP' ?'SIGN IN': 'SIGN UP'}
                                          </button>
                                    </div>
                               ):(
                                   <div>
                                          <button onClick={handleLogOut}>
                                                 Log Out
                                          </button>
                                    </div>
                               )
                            }


                                  </div>

                                  {visible && <div className={HeaderStyle.headerbackdrop} onClick={()=>SetVisible(!visible)}></div>}
                          </div>
                       ) :
                       (
                          <div className={HeaderStyle.header_links}>
                                <div><Link to="#" onClick={()=>dispatch({type:stateType.SIGN_UP})}>Home</Link></div>
                                <div><a href="#footer" >How it Works</a></div>
                               {
                               ( msg == 'NO AUTORIZATION' || msg == 'NULL AUTORIZATION' || msg == 'INVALID USER') ? (
                                    <div>
                                          <button onClick={handleSignState}>
                                                  {signstate == 'SIGN UP' ?'SIGN IN': 'SIGN UP'}
                                          </button>
                                    </div>
                               ):(
                                   <div>
                                          <button onClick={handleLogOut}>
                                                 Log Out
                                          </button>
                                    </div>
                               )
                               }
                              
                          </div>
                      )}

               </div>


         </div>
  )

}

export default Header