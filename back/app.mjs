import { loadSequelize } from "./database.mjs";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

/**
 * Point d'entrée de l'application
 * Vous déclarer ici les routes de votre API REST
 */
async function main() {
    try {
        const sequelize = await loadSequelize();
        const User = sequelize.models.User;
        const Post = sequelize.models.Post;
        const Comment = sequelize.models.Comment;

        const app = express();
        // app.use(cors());
        app.use(cors());
        app.use(express.json());
        app.use(cookieParser());


        const JWT_SECRET = process.env.JWT_SECRET;

        function isLoggedInJWT(User){
            return async (req, res, next)=>{
                const token = req.cookies.token;
                if (!token){
                    return res.status(401).json({message: 'Unauthorized: No token provided'});
                }
                try {
                    const decoded = jwt.verify(token, JWT_SECRET);
                    req.userId = decoded.userId;
                    req.user = await User.findByPk(req.userId);
                    if (!req.user) {
                        return res.status(401).json({ message: 'Unauthorized' });
                    }
                    next();
                } catch (error) {
                    return res.status(401).json({message: 'Unauthorized: Invalid token'});
                }
            }
        };

        app.get("/",(req,res)=>{
            res.json({message:"ThreadAPI !"})
        })


        app.post('/register', async (req, res)=>{ 
            const { username, email, password, passwordConfirmation } = req.body;
            console.log("oui")

            if(!username || !email || !password || !passwordConfirmation){
                 return res.status(400).json({message: 'Username, Email, Password and Password confirmation field are required'});
            }
            if (password !== passwordConfirmation) {
                return res.status(400).json({message: 'Password and Password confirmation do not match'});
            }
            try {
                const newUser = await User.create({username, email, password});
                res.status(201).json({message: 'User registered succesfully', userId: newUser.id});
            } catch (error) {
                res.status(500).json({ message: 'Error registering user', error: error.message });
            }
            res.send
        })



        app.post('/login', async (req, res)=>{
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({message: 'Email and password are required'});
            }
            try {
                const user = await User.findOne({where: {email} });
                const isPasswordRight = bcrypt.compareSync(password, user.password)

                if (!user || !isPasswordRight){
                    return res.status(401).json({ message: 'Invalid email or password'});
                }

                const token = jwt.sign({userId: user.id}, JWT_SECRET, { expiresIn: '2h'});

                res.cookie('token', token, {httpOnly: true});
                res.json({message: 'Login succesful'});
            } catch (error) {
                res.status(500).json({message: 'Error logging in', error: error.message});
            }
        });
        

        app.use(isLoggedInJWT(User));



        //Post while loggedin
        app.post('/logout', async (req, res)=>{
            res.clearCookie('token');
            res.json({message: 'Logout succesful' });
        });

        app.post('/post', async (req, res)=>{
            const newPostData = req.body;
            try {
                const newPost = await Post.create({
                    title: newPostData.title,
                    content: newPostData.content,
                    UserId: req.userId,
                });
                res.json(newPost);
            } catch (error) {
                res.status(500).json({error: "Error during the creation of the post"});
            }
        });

        app.post('/posts/:postId/comments', async (req, res)=>{
            const newCommentData = req.body;
            const comments = await Comment.create({
                PostId: req.params.postId,
                UserId: req.userId,
                content: newCommentData.content
            })
            res.json(comments);
        });


        //Get while loggedin
        app.get('/posts', async (req, res)=>{
            const posts = await Post.findAll({
                where: {UserId: req.userId}
            })
            res.json(posts);
        });


        app.get('/users/:userId/posts', async (req, res)=>{
            const params = req.params;
            const posts = await Post.findAll({
                where: {
                    UserId: params.userId
                }
            })
            res.json(posts);
        });


        //Delete while loggedin
        app.delete('/posts/:postsId', async (req, res)=>{
            const postId = req.params.postsId;
            const delPost = await Post.destroy({
                where: {id: postId}
            });
            res.json(delPost);
        });

        app.delete('/comments/:commentsId', async (req, res)=>{
            const commentId = req.params.commentsId;
            const delComment = await Comment.destroy({
                where: {id: commentId}
            });
            res.json(delComment);
        });









        app.listen(3000, () => {
            console.log("Serveur démarré sur http://localhost:3000");
        });


    } catch (error) {
        console.error("Error de chargement de Sequelize:", error);
    }
}
main();