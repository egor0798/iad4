export function log_in(login, password) {
    return{
        type: "LOGIN",
        login,
        password
    }
}

export function exit(login, password) {
    return{
        type: "EXIT",
        login,
        password
    }
}
