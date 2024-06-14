import React, { createContext, useEffect, useState } from 'react'

import {Routes, Route, useNavigate, useLocation} from 'react-router-dom'
import Landing from './Pages/Landing/Landing'
import axios from './Utility/axios'
import Home from './Pages/Home/Home'
import AskQUestion from './Components/AskQuestion/AskQUestion'
import Detail from './Components/Details/Detail'
import { AnimatePresence } from 'framer-motion'
import NotFound from './Pages/NotFound/NotFound'


// const baseUrl = `http://localhost:1234/api`
export const AppState = createContext()

function Gateway() {
  const [user, setUser] = useState({})
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const location = useLocation()
  // console.log(token)

  async function checkUserValidity(){
    try {

      const {data} =await axios.get(`/users/check`,{
            headers:{
              Authorization:'Bearer '+ token
            }
          })

          // console.log(data)
          setUser(data)
      
    } catch (error) {
       console.log(error.response.data)
       setUser(error.response.data)
        navigate('/')
    }
  }

  useEffect(()=>{
      checkUserValidity()
  },[])

  return (
    <AppState.Provider value={{user,setUser}}>
      <AnimatePresence >
        <Routes location={location} key={location.pathname}>
             <Route path='/' element={<Landing />} />
             <Route path='/home' element={<Home/>} />
             <Route path='/question' element={<AskQUestion />} />
             <Route path='/home/:answerdetail' element={<Detail />} />
             <Route path='*' element={<NotFound />} />
        </Routes>
        </AnimatePresence>
    </AppState.Provider>
  )
}

export default Gateway