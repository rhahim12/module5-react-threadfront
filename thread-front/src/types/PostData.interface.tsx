export interface PostData {
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