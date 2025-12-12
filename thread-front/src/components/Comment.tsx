import './Comment.css'

type CommentProps = { userName: string, commentText: string, commentDate: string }

export function Comment(props: CommentProps) {
    const { userName, commentText, commentDate } = props;
    
    
    return (
        <div className="comment">
            <h1 className="comment-name">{userName}</h1>
            <p className="comment-text">{commentText}</p>
            <p className="comment-date">{commentDate}</p>
        </div>

    );
}

