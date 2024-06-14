import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../Layout/Layout'
import { Link } from 'react-router-dom'
import { AppState } from '../../Router'
import classes from './question.module.css'
import Card from './QuestionCard/Card'
import axios from '../../Utility/axios'

import { motion } from 'framer-motion'
import programming from '../../assets/Image/programming.png'
import programming2 from '../../assets/Image/programming2.png'


function Question() {

     const [data, setData] = useState([])
     const {user}=  useContext(AppState)
     const token = localStorage.getItem('token')
     const [offSet,SetOffSet] = useState(0)
     const [limit,setLimit] = useState(5)
     const [totalQuestion,setTotalQuestion]=useState(0)
// console.log(offSet)
  async function fetchData (){
            
     try{   
          const info = await axios.get(`/questions/getallquestions/${offSet}/${limit}`,{
               headers:{
               Authorization:'Bearer '+ token
               }
          })
          //    console.log(info.data)
             setData(info.data)
          }
          catch (error) {
                console.log("error", error)
          }
 }

 async function NumberOfQuestion (){

     try {
          const num = await axios.get('/questions/noOfquestion',{
               headers:{
               Authorization:'Bearer '+ token
               }}

          
          )
          // console.log(num.data.num)  
          setTotalQuestion(num.data.num) 

     } catch (error) {
          console.log(error)
     }
 
 }

     useEffect(()=>{
     
               fetchData()
               NumberOfQuestion()

     },[,user,offSet,limit])


//   console.log(data)
// console.log(totalQuestion)
const listItems = [];

function Buttons({iter}) {
     return  <button onClick={()=>{SetOffSet(iter*limit)}}>{iter + 1}</button>;
   }

for (let i = 0; i < Math.ceil(totalQuestion/limit); i++) {
     listItems.push(<Buttons key={i} iter={i} />);
   }


  return (
     
    <Layout>   
          <motion.div
               initial={{ scaleY: 0 }}
               animate={{ scaleY: 1 }}
               exit={{ scaleY: 1 }}
               transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
               className={classes.homepage_container}
          >
                 
            {/* <div className={classes.programming}><img src={programming} alt="" /></div> */}
            {/* <div className={classes.programming}><img src={programming} alt="" /></div> */}
                    <div className={classes.quest_user_container}>
                         <button><Link to='/question'>Ask Question</Link></button>
                         <div>Welcome: <span>{user.username}</span> </div>
                    </div>

                    <div className={classes.questions}>
                        Questions
                    </div>

                  <div className={classes.card_wrapper}>
                    {
                              data?.map((eachquestion, index)=>(
                                   <Card info={eachquestion} key={index} ansCount ={true} />
                              ))
                         }

                    <div className={classes.pagination}>

                          <div>
                              {listItems}
                          </div>

                          <div className={classes.perpage}>
                              <div>
                                   <button onClick={()=>{setLimit(5)}}>5</button>
                                   <button onClick={()=>{setLimit(10)}}>10</button>
                                   <button onClick={()=>{setLimit(15)}}>15</button>
                              </div>
                              <div className={classes.perpagetext}>Question per page</div>
                          </div>
                    </div>

                  </div>

                
                 
          </motion.div>
    </Layout>
  
  )
}

export default Question