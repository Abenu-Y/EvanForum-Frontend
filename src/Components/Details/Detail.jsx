import React, { useContext, useEffect, useRef, useState } from 'react'
import Layout from '../../Layout/Layout'
import classes from './details.module.css'
import { useParams , useNavigate, Link} from 'react-router-dom'
import axios from '../../Utility/axios'
import Card from '../Question/QuestionCard/Card'
import { DNA } from 'react-loader-spinner'
import { InfinitySpin } from 'react-loader-spinner'
import { AppState } from '../../Router'
import { BsThreeDots } from "react-icons/bs";
import { GoTrash } from "react-icons/go";
import { MdEdit } from "react-icons/md";
import { CiShoppingTag } from "react-icons/ci";
import { motion } from 'framer-motion'
import NotFound from '../../Pages/NotFound/NotFound'

const Detail = () => {

  const [postanswer, setPostAnswer] = useState('')
  const [getanswer, setGetAnswer] = useState([])
  const [getTitleandDescription, setTitleandDescription] = useState([])
  const [isloading , setLoading] =useState(false)
  const{answerdetail} = useParams()
  const navigate = useNavigate()
  const ansRef = useRef()
  const token = localStorage.getItem('token')

  const {user} = useContext(AppState)
  const menuRef = useRef(null)
  const titleRef = useRef(null)
  const [titUpdate, setTitUpdate]= useState(false)
  // const [title, setTitle] = useState(' ')
  // const [description, setDescription] = useState(' ')
  // console.log(user.username)
  const [{title,description}, setState] = useState({
    title: ' ',
    description: ' '
  })
  const [isOpen, setIsOpen] = useState(false);
  const [warn, setWarning] = useState(false);
  // console.log(answerdetail)
  // console.log(typeof answerdetail)

  // const urlHardcoded = `/answers/179`;
const urlVariable = `/answers/${answerdetail}`;
const urlUpdatequestion =`/questions/update/${answerdetail}`
const urltitDescription =`/questions/titdescription/${answerdetail}`
const urldeleteQuestion=`/questions/delete/${answerdetail}`
// console.log(urlHardcoded === urlVariable);1


const GoToQuestionPage = () =>{
                 
  navigate('/home')
}

const displayMenu = () =>{
    menuRef.current.classList.toggle(`${classes.disp}`)
    setIsOpen(!isOpen)
}
 
// console.log(title, description)
async function UpdateQUestion(e){

    e.preventDefault()

    setLoading(!(title.length == 0 || description.length == 0))
          
    try { 
      await axios.put(urlUpdatequestion,{
        
         title:title,
         description:description,
         tag:'react' },

         {
          headers:{
                Authorization:'Bearer '+ token
                }
          }

    )
    setTimeout(() => { window.location.reload(); }, 2000)

} catch (error) {
  // console.log('smtg went wrong')
  
    if(description ==''){
                 ansRef.current.placeholder=error.response.data.msg;
                 ansRef.current.style.border = '1px solid red';
    }

    if(title ==''){
      titleRef.current.placeholder=error.response.data.msg;
      titleRef.current.style.border = '1px solid red';
}
  
  console.log(error)
}
}

const DeleteQuestion = async ()=> {

    try {
                   setLoading(true) 
                   setWarning(false)
                    await axios.delete(urldeleteQuestion,
                          {
                          headers:{
                                Authorization:'Bearer '+ token
                                }
                          }
                    )
                    setTimeout(() => { GoToQuestionPage();}, 1000)
  
              } catch (error) {
                    console.log(error)
              }
  
  }


async function PostAnswer(e) {
           
     e.preventDefault()

     if(postanswer.length == 0){
       ansRef.current.placeholder = `you can't sent empty answer`
      
       ansRef.current.classList.add(`${classes.red_placeholder}`)
     }
    
     try {
          setLoading(!(postanswer.length == 0))
            await axios.post('/answers/new-answer',{
                
                answer:postanswer,
                questionID:answerdetail },

                {
                headers:{
                      Authorization:'Bearer '+ token
                      }
                }
            )
            setTimeout(() => { window.location.reload();}, 3000)

      } catch (error) {
            console.log(error)
 }

  }
  // console.log(answer)

  async function fetchTitleandDescription(){
            
    try{   
     
         const response = await axios.get(urltitDescription ,{
              headers:{
              Authorization:'Bearer '+ token
              }
         })
           //  console.log(response.data[0])
            
            setTitleandDescription(response.data[0])
            // setDescription(response.data[0]?.description)
            // setTitle(response.data[0]?.title)

            setState({
              title:response.data[0]?.title,
              description:response.data[0]?.description
            })
         }
         catch (error) {
               console.log("error", error)
         }
}


  async function fetchAnswers (){
            
     try{   
      
          const response = await axios.get(urlVariable ,{
               headers:{
               Authorization:'Bearer '+ token
               }
          })
            //  console.log(response.data[0])
            setGetAnswer(response.data)
          }
          catch (error) {
                console.log("error", error)
          }
 }




 useEffect(()=>{
     fetchTitleandDescription()
     fetchAnswers()
   
 }, [])



const toggleTitle = () => {
  setTitUpdate(prevState => !prevState);
  menuRef.current.classList.remove(`${classes.disp}`)
  setIsOpen(false)
};

const closeMenu = () =>{
  menuRef.current.classList.remove(`${classes.disp}`)
  setIsOpen(false)
 setWarning(false)
}

const delWarnMessage = () =>{
  menuRef.current.classList.remove(`${classes.disp}`)
  setWarning(!warn)
  setIsOpen(true)
}

const noUpdate = ()=>{
  ansRef.current.value=''
  setTitUpdate(false)
}

 
if(getanswer.length !== 0){
  
  return (
        <Layout>
          
          <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -100 }}
              transition={{duration: 0.8,ease: [0.6, -0.05, 0.01, 0.99]}}
              style={{ borderRadius: '15px',padding: '30px',
              boxShadow: '8px 12px 212px rgba(158, 158, 158, 0.12)',
              }}
             className={classes.details_container} 
            >

                 <div className={classes.threeDot_Container}>
                      <div className={classes.question_bold}>Question</div>
                      <div className={classes.question_in_brief}>{getTitleandDescription?.title} ?</div>
                      <div className={classes.question_in_detail}>{getTitleandDescription?.description}</div>
                      <div className={classes.three_dots_menu} onClick={displayMenu}><BsThreeDots  /></div>
                      <div className={classes.three_dots_menu_list} ref={menuRef} >
                                 <button><CiShoppingTag size={20}/> {getTitleandDescription?.tag}</button>
                                 { getTitleandDescription.username == user.username &&
                                  <>
                                      <a href="#answer"><button onClick={toggleTitle} ><MdEdit size={20}  /> Edit</button></a>
                                      <button onClick={delWarnMessage}><GoTrash size={20} /> Del </button>
                                  </>
                                 }
                      </div>

                 </div>

                 <div className={classes.answers_from_community}>
                     Answer From The Community
                 </div>

                 {
                      getanswer?.map((eachanswer,index)=>{
                        // console.log(eachanswer)
                          return (
                            <Card info={eachanswer} key={index} />
                            
                          )
                        })
                 }
                 <div id="answer"></div>
                 <div className={classes.new_answer_container} id="answer">

                           <div style={titUpdate ? {color: '#da7000'} : {}}  >{titUpdate ?'Update your Question':'Answer The Top Question'}</div>
                           <div className={classes.goto}> <button  onClick={GoToQuestionPage}>Go to Question Page</button></div>
                           {
                         

                       isloading &&  (Math.floor(Math.random()*10) % 2 == 0 ? 
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
                        <div>
                            <form action="" onSubmit={titUpdate ?UpdateQUestion :  PostAnswer}>
                                {
                                      titUpdate && <div  >
                                                        <input type="text" value={title} ref={titleRef}  onChange={(e)=>setState(prevState => ({...prevState, title: e.target.value}))}/>
                                                  </div>
                                }
                                  <textarea name=""  ref={ansRef}  value={titUpdate ? description : undefined}    onChange={titUpdate  ? (e) => setState(prevState => ({ ...prevState, description: e.target.value })) : (e) => setPostAnswer(e.target.value)}></textarea>
                                  <button type='submit' style={titUpdate ? {backgroundColor: '#fe8303'} : {}}>{titUpdate ?'Update your Question':'Post Your Answer'}</button>

                                  {titUpdate && <button onClick={noUpdate} style={{marginLeft:'10px'}}> Cancel</button>}
                            </form>
                        </div>

                            
                 </div>

              {warn && <div className={classes.warning}> 
                             <p>Are you sure you want to delete this question?</p> 
                             <div> 
                                   <button onClick={DeleteQuestion}>Yes</button>
                                   <button onClick={()=>setWarning(false)}>NO</button>
                              </div> 
                        </div>}
               
          </motion.div>

          {isOpen &&  <div className={classes.backdrop} onClick={closeMenu}></div>}

          
        </Layout>
  )
}
else{
 return <NotFound />
}
}

export default Detail