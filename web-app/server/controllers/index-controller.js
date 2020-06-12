const User = require('../models/user-model');
const Post = require('../models/post-model');

module.exports = {
    //this will register the user into the db
    async registerUser(req, res){
        try{
            //register the user to the db
            const user = await User.register(new User(req.body), req.body.password);

            //after registration automatically login the user
            req.login(user, error => {
                if(error){ 
                    console.log('Error on user sign up');
                    return res.redirect('/login'); //if error redirect to login
                }

                console.log('user is logged in');
                // res.redirect('/posts'); 
            });
        
        } catch(err) {
            console.log('Error on user auto login');
            // res.redirect('/register');
        }
    },

    //this will login the user
    async loginUser(req, res){
        const { username, password } = req.body; //make sure the name of input tags are the same
        const { user, error } = await User.authenticate()(username, password); //authenticate

        // handle error of user login
        if(!user && error){
            console.log('Error on manual login');
            // return res.redirect('/login');
        }

        //login user
        req.login(user, error => {
            if(error) return res.redirect('/login');
            console.log('user is logged in');
            // res.redirect('/posts');
        });
    },

    //this will get all the posts of user
    async fetchPosts(req, res){
        const posts = req.user.posts;
        return res.status(200).json({
            success: true,
            data: posts
        });
    }
}