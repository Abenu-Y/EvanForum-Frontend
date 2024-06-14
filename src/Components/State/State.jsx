import React,{createContext, useReducer} from "react";


export const SignContext = createContext();

export const DataProvider =({children,reducer,intialState})=>{
    
       return (
              <SignContext.Provider value ={useReducer(reducer, intialState)}>
                     {children}
              </SignContext.Provider>
       )
}

