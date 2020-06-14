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
                    return res.status(400).json({
                        success: false,
                        message: 'User login was unsuccessful'
                    });
                
                } else{
                    return res.status(200).json({
                        success: true,
                        message: 'User login was successful'
                    });

                    //NOTE: should handle redirection in client side
                }
            });
        
        } catch(err) {
            return res.status(401).json({
                success: false,
                message: 'User registration was unsuccessful'
            });
        }
    },

    //this will login the user
    async loginUser(req, res){
        const { username, password } = req.body; //make sure the name of input tags are the same
        const { user, error } = await User.authenticate()(username, password); //authenticate

        // handle error of user login
        if(!user && error){
            return res.status(400).json({
                success: false,
                message: 'Username or Password is incorrect'
            });
        }

        //login user
        req.login(user, error => {
            if(error){
                return res.status(400).json({
                    success: false,
                    message: 'User login was unsuccessful'
                });
            } else{
                console.log('user logged in');
                return res.status(200).json({
                    success: true,
                    message: 'User login was successful',
                    user: req.user
                });
            }
        });
    },

    //this will get all the posts of user
    async fetchPosts(req, res){
        let userId = Object.keys(req.body)[0];
        await User.findById(userId).populate('posts').exec((err, user) => {
            if(err){
                return res.status(400).json({
                    success: false,
                    message: `Was not able to fetch the posts of ${req.user}`
                });
            } else{
                return res.status(200).json({
                    success: true,
                    message: `Fetching ${req.user}'s post successful`,
                    data: user.posts
                });
            }
        });
    },

    //this will create the post and save it to the db
    async createPost(req, res){
        let user = await User.findById(req.user.id);
        let post = await Post.create(req.body);

        user.posts.push(post);
        await user.save();

        if(!post){
            return res.status(400).json({
                success: false,
                message: 'Post Creation Unsuccessful.'
            });
        
        } else{
            return res.status(200).json({
                success: true,
                message: 'Post Creation Successful!'
            })
        }
    }
}