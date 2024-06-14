import React, { useContext } from 'react'
import Images from '../Constant/Images/Images'
import FooterStyle from './classes.module.css'

import { Link } from 'react-router-dom';
import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";


function Footer() {
  return (
       <div className={FooterStyle.footer_outer_container} id='footer' >
             <div className={FooterStyle.footer_inner_container}>
                   <div>

                         <div>
                             <img src={Images.WhiteLogo} alt="Evangadi Logo" />
                         </div>

                         <div className={FooterStyle.footer_icons}>

                            <Link to="https://www.facebook.com/evangaditech" target='_blank'> <FiFacebook  size={25}/> </Link>
                            <Link to="https://www.instagram.com/evangaditech/" target='_blank'> <FaInstagram size={25} /></Link>
                            <Link to="https://youtube.com/@EvangadiTech" target='_blank'><AiOutlineYoutube size={25} /> </Link>

                                  
                         </div>
                   </div>

                   <div>

                        <ul>
                            <h4>Useful Link</h4>
                            <li><Link to="#header" >How it works</Link></li>
                            <li><Link to="">Terms of Service</Link></li>
                            <li><Link to="">Privacy Policy</Link></li>
                        </ul>

                   </div>

                   <div className={FooterStyle.contact_us}>
                        <ul>
                            <h4>Contact info</h4>
                            <li>Evangadi Networks</li>
                            <li>support@evangadi.com</li>
                            <li>+1-202-386-2702</li>
                        </ul>
                   </div>
             </div>



       </div>
  )
}

export default Footer