class Auth{
    constructor(){
        this.authenticated = false;
        this.user = "";
    }

    login(cb){
        this.authenticated = true;
        cb();
    }

    logout(cb){
        this.authenticated = false;
        cb();
    }

    isAuthenticated(){
        return this.authenticated;
    }

    setUser(user){
        this.user = user;
    }
}

export default new Auth(); //singleton