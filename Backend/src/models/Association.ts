//this is file which will be handle mapping between the table and how the foriegn keys will be related to each othe ,
//We Are creating a separate file as , we can do foriegn referencing in the sequelize table itself but then we wont be
//able to use the fucntions like (joins, nested API responses ,cascade delete).A separate association file will help us to use the ORM in
// a better way .

import { User } from "./User";
import { Topic } from "./Topic";
import { Blog } from "./Blog";
import { Comment } from "./Comment";
import { Subscription } from "./Subscription";
import { AdminRequest } from "./AdminRequest";



export class AssociationMapping{
    
    public static initialize():void{
        this.userTopic();
        this.userBlog();
        this.topicBlog();
        this.commentRelations();
        this.subscriptionRelations();
        this.adminRequestRelations();
    }

    
    // realtion of topic and user
    private static userTopic():void{
        Topic.belongsTo(User,{
            foreignKey:"author_id",
            onDelete:"CASCADE",
            onUpdate:"CASCADE"
        });
        User.hasMany(Topic,{
            foreignKey:"author_id",
            onDelete:"CASCADE",
            onUpdate:"cASCADE",
        });
    }
    //relation B/w User->Blog
    private static userBlog():void{
        Blog.belongsTo(User,{
            foreignKey:"author_id",
            onDelete:"CASCADE",
            onUpdate:"CASCADE"
        });
        User.hasMany(Blog,{
            foreignKey:"author_id",
            onDelete:"CASCADE",
            onUpdate:"CASCADE"
        });
    }
    //relation b/w Topic -> blog (direct FK on Blog.topic_id)
    private static topicBlog():void{
        Blog.belongsTo(Topic,{
            foreignKey:"topic_id",
            onDelete:"CASCADE",
            onUpdate:"CASCADE"
        });
        Topic.hasMany(Blog,{
            foreignKey:"topic_id",
            onDelete:"CASCADE",
            onUpdate:"CASCADE"
        });
    }

    private static commentRelations():void{
        Comment.belongsTo(User,{
            foreignKey:"user_id",
            onDelete:"CASCADE",
            onUpdate:"CASCADE"
        });
        Comment.belongsTo(Blog,{
            foreignKey:"blog_id",
            onDelete:"CASCADE",
            onUpdate:"CASCADE"
        });

        User.hasMany(Comment,{
            foreignKey:"user_id"
        });
        Blog.hasMany(Comment,{
            foreignKey:"blog_id"
        });
    }

    // this will define relation of user->Author how subscriptions will work 
    private static subscriptionRelations() {
        
        User.belongsToMany(User,{
            through:Subscription,
            as:"Subscribed_Authors",
            foreignKey:"user_id",
            otherKey:"author_id"
        });

        User.belongsToMany(User,{
            through:Subscription,
            as:"Subscribers",
            foreignKey:"author_id",
            otherKey:"user_id"
        });

        Subscription.belongsTo(User,{
        foreignKey:"user_id",
        as:"Subscriber",
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
        });

        Subscription.belongsTo(User,{
            foreignKey:"author_id",
            as:"Author",
            onDelete:"CASCADE",
            onUpdate:"CASCADE"
        });

        User.hasMany(Subscription,{
            foreignKey:"user_id",
            onDelete:"CASCADE"
        });

        User.hasMany(Subscription,{
            foreignKey:"author_id",
            onDelete:"CASCADE"
        });
    }

    //how will admin be recieving the requests 
    private static adminRequestRelations() {
       AdminRequest.belongsTo(Blog,{
        foreignKey:"blog_id",
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
    });
       AdminRequest.belongsTo(User,{
        foreignKey:"author_id",
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
    });

       User.hasMany(AdminRequest,
        {
            foreignKey:"author_id",
        });
       Blog.hasMany(AdminRequest,
        {
            foreignKey:"blog_id",
        });
    }
}