import './Comment.css'
import {CommentsData} from "../types/CommentsData.interface"

//  type CommentProps = { userName: string, commentText: string, commentDate: String };

export function Comment({commentData}: {commentData : CommentsData}) {

    const commentDate = new Date(commentData.updatedAt).toLocaleString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className="comment">
            <p className="comment-text">{commentData.content}</p>
            <p className="comment-date">{commentDate}</p>
        </div>
    );
}

