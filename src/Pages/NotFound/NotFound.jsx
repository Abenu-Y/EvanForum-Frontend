import React from 'react'
import classes from './notfound.module.css'
import Layout from '../../Layout/Layout'
import { motion } from 'framer-motion'

import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()

    const homepage = () =>{
       navigate('/home')
    }
  return (
    <Layout >
      <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -100 }}
              transition={{duration: 0.8,ease: [0.6, -0.05, 0.01, 0.99]}}
              style={{ borderRadius: '15px',
              boxShadow: '8px 12px 212px rgba(158, 158, 158, 0.12)',
              }}
             
            >
          <div className={classes.notfoundBackground}>
             
              <div className={classes.homepage} onClick={homepage}>Home Page</div>
          </div>
          </motion.div>
    </Layout>
  )
}

export default NotFound