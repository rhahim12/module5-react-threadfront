import { Sequelize, DataTypes, where } from "sequelize";
import bcrypt from "bcrypt";

/**
 * 
 * @returns {Promise<Sequelize>}
 */
export async function loadSequelize() {
    try {
        const login = {
            database: "thread-api",
            username: "root",
            password: "root"
        }
        const sequelize = new Sequelize(login.database, login.username, login.password, {
            host: '127.0.0.1',
            dialect: 'mysql'
        });


        const User = sequelize.define("User", {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                set(clearPassword){
                    const hashedPassword = bcrypt.hashSync(clearPassword, 10);
                    this.setDataValue('password', hashedPassword);
                }
            }
        });

        const Post = sequelize.define("Post", {
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            content: {
                type: DataTypes.STRING,
                allowNull: false
            }
        });

        const Comment = sequelize.define("Comment", {
            content: {
                type: DataTypes.STRING,
                allowNull: false
            }
        })

        //OnetM User-Post
        User.hasMany(Post);
        Post.belongsTo(User);

        //OnetM Post-Comment
        Post.hasMany(Comment);
        Comment.belongsTo(Post);

        //OnetM User-Comment
        User.hasMany(Comment);
        Comment.belongsTo(User);


        await sequelize.sync();
        console.log("Connexion à la BDD effectuée");


        const [userTest1] = await User.findOrCreate(
            {
                where: {username:"admin"},
                defaults: {
                    username: "admin",
                    email: "admin@mail.com",
                    password: "1234"
                }
            }
        )
        const [userTest2] = await User.findOrCreate(
            {
                where: {username:"pote"},
                defaults: {
                    username: "pote",
                email: "pote@mail.com",
                password: "1234"
                }
            }
        )
        
        const [postTest] = await Post.findOrCreate(
            {
                where: {title: "A Bas la hess!"},
                defaults: {
                    title:"A Bas la hess!",
                    content : "On va tout casser! Pas content!",
                    UserId : userTest1.id
                }
            }
        );
        await Comment.findOrCreate(
            {
                where : {content : "Je suis pas d'accord"},
                defaults: { 
                    content : "Je suis pas d'accord",
                    PostId : postTest.id,
                    UserId : userTest2.id
                }
            }
        );

        return sequelize;
    } catch (error) {
        console.error(error);
        throw Error("Échec du chargement de Sequelize");
    }
}