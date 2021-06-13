

export const reducer=(state={loggedIn:false},action)=>{
    switch (action.type) {
        case "UPDATE_USER":
            
            return {...state,...action.payload};
    
        default:
            return state;
    }
}  