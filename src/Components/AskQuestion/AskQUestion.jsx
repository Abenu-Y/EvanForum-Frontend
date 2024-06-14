import React, { useRef, useState } from 'react'
import classes from './askquestion.module.css'
import Layout from '../../Layout/Layout'
import {useNavigate} from 'react-router-dom'
import axios from '../../Utility/axios'
import { DNA } from 'react-loader-spinner'
import { InfinitySpin } from 'react-loader-spinner'

import { motion } from 'framer-motion'
function AskQUestion() {

  const navigate = useNavigate()
  const [title,setTitle] = useState('')
  const [description,seDescription] = useState('')
  const token = localStorage.getItem('token')
  const titleRef = useRef(null)
  const DescreRef = useRef(null)
  const [dispError,setDispError] =useState(false)
  const [loading , setLoading] =useState(false)


  const GoToQuestionPage = () =>{
                 
          navigate('/home')
  }

  async function postQuestion(e){
      
     e.preventDefault()

     // if(title.length  == 0 ){
     //      titleRef.current.placeholder =`title can't be empty`
     // } 
     // if(description.length <5){
     //      DescreRef.current.placeholder = `Question Detail Description can't be empty`
        
     // }

     if(title.length == 0 || description.length == 0){
          setDispError('Both fields are required.')
     }
     
     try {
          
          setLoading(!(title.length == 0 || description.length == 0))
          
          await axios.post('/questions/new-question',{
              
               title:title,
               description:description,
               tag:'react' },

              { headers:{
                    Authorization:'Bearer '+ token
                    }
              }

          )
          setTimeout(() => { navigate('/home');}, 2000)

     } catch (error) {
          
     }

  }

  return (
    <Layout>
     
        <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              exit={{ scaleY: 0, opacity: 0 }}
              transition={{duration: 1, ease: [0.22, 1, 0.36, 1],opacity: { duration: 0.4, ease: 'ease' }}}
              style={{borderRadius: '10px',padding: '40px',}}  
              className={classes.question_wrapper}
        >
                
                  <div>
                       
                       <div>Steps to write a good question</div>
                       <ul>
                            <li>Summarize your question in one line title</li>
                            <li>Describe your question in detail</li>
                            <li>Describe what you tried and what you expected to happen</li>
                            <li>Review your question and post it to the site</li>
                       </ul>

                  </div>
                  {/* <img src={ansicon} alt="" /> */}
            

                  <div className={classes.question_form_container}>

                         <div>Ask a Public Question</div>
                         <div className={classes.go} onClick={GoToQuestionPage}>Go to the question page </div>
                     
                        <form action="" onSubmit={postQuestion}>
                                  {
                                   dispError && <div className={classes.disperror}>{dispError} </div>
                                  }
                             <div>
                                <input type="text" id={classes.input} ref={titleRef} onChange={(e)=>setTitle(e.target.value)} placeholder='Title'/>
                               
                             </div>

                             <div>
                                <textarea name="" id="" ref={DescreRef } placeholder='Question Description' onChange={(e)=>seDescription(e.target.value)} ></textarea>
                             </div>

                             <button type='submit'> Post Your Question</button>
                         </form>
                   </div>

                        {
                         

                         loading &&   (Math.floor(Math.random()*10) % 2 == 0 ? 
                            <DNA
                              visible={true}
                              height="80"
                              width="80"
                              ariaLabel="dna-loading"
                              wrapperStyle={{}}
                              wrapperClass="dna-wrapper"
                           />: 
                            <InfinitySpin
                              visible={true}
                              width="300"
                              color="#fe8303"
                              ariaLabel="infinity-spin-loading"
                           />)
                  }

        </motion.div>
    
    </Layout>


  )
}

export default AskQUestion