export interface CommentsData {
    id : number,
    title : String,
    content : String,
    createdAt : Date,
    updatedAt : Date,
    UserId : number,
    User:{
        username : String
    }
}