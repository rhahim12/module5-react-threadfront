import { Sequelize, DataTypes, where } from "sequelize";
import bcrypt from "bcrypt";

/**
 * 
 * @returns {Promise<Sequelize>}
 */
export async function loadSequelize() {
    try {
        const login = {
            database: "app-database",
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
                allowNull: true
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
        const [post1] = await Post.findOrCreate({
        where: { title: "Les secrets d'une bonne pizza maison" },
        defaults: {
            title: "Les secrets d'une bonne pizza maison",
            content: "Après des années d'expérimentation, j'ai enfin trouvé LA recette parfaite. Le secret ? La température du four et le temps de repos de la pâte.",
            UserId: userTest1.id
        }
        });
        const [post2] = await Post.findOrCreate({
        where: { title: "Mon premier marathon" },
        defaults: {
            title: "Mon premier marathon",
            content: "42km plus tard, je peux dire que c'est l'une des expériences les plus difficiles mais enrichissantes de ma vie. Mes jambes me détestent mais mon cœur est rempli de fierté!",
            UserId: userTest2.id
        }
        });
        const [post3] = await Post.findOrCreate({
        where: { title: "Pourquoi j'ai quitté mon job" },
        defaults: {
            title: "Pourquoi j'ai quitté mon job",
            content: "Après 5 ans dans la même entreprise, j'ai décidé de tout plaquer pour poursuivre ma passion. Meilleure décision de ma vie ou grosse erreur ? Le temps me le dira...",
            UserId: userTest1.id
        }
        });
        const [post4] = await Post.findOrCreate({
        where: { title: "Mes 10 astuces pour économiser" },
        defaults: {
            title: "Mes 10 astuces pour économiser",
            content: "En appliquant ces techniques simples, j'ai réussi à économiser 500€ par mois. Astuce n°1 : arrêter les abonnements inutiles. Astuce n°2 : cuisiner maison...",
            UserId: userTest2.id
        }
        });
        const [post5] = await Post.findOrCreate({
        where: { title: "Apprendre le japonais : mon bilan après 1 an" },
        defaults: {
            title: "Apprendre le japonais : mon bilan après 1 an",
            content: "365 jours d'apprentissage intensif ! Entre les kanjis qui me donnent mal à la tête et la grammaire qui défie toute logique, je commence enfin à voir des progrès. Ganbarimasu!",
            UserId: userTest1.id
        }
        });
        const [post6] = await Post.findOrCreate({
        where: { title: "Le guide ultime du camping sauvage" },
        defaults: {
            title: "Le guide ultime du camping sauvage",
            content: "Dormir à la belle étoile, se réveiller avec le chant des oiseaux... Le camping sauvage c'est le rêve! Mais attention, il y a des règles à respecter pour préserver la nature.",
            UserId: userTest2.id
        }
        });



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