const initialState = {
    login: sessionStorage.getItem("loggedUser") ? sessionStorage.getItem("loggedUser"):"",
    password: ""
};
const userReducer = function(state = initialState, action){
    switch(action.type){
        case "LOGIN":
            return Object.assign({}, state, {login: action.login, password: action.password});
        case "EXIT":
            return Object.assign({}, state, {login: '', password: ''});
    }
    return state;
};

export default userReducer;