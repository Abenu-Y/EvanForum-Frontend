export const stateType = {
    SIGN_IN:'SIGN IN',
    SIGN_UP:'SIGN UP',
    LOG_OUT:'LOG OUT',
    RESET:'RESET',
    UPDATE:'UPDATE'
}

export const initialState = {
    signstate:'SIGN IN'
}


export const reducer =(state, action) => {
  
      switch(action.type){

        case stateType.SIGN_IN:
            return { signstate:'SIGN IN'}

        case stateType.SIGN_UP:
            return { signstate:'SIGN UP'}   

        case stateType.LOG_OUT:
            return {signstate:'LOG OUT'}   

        case stateType.RESET:
            return {signstate:'RESET'}   

        case stateType.UPDATE:
            return {signstate:'UPDATE'}   

            
         default:
           return state;   
      }


}