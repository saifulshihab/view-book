import React from 'react';

const CommentSection = () => {
    return (
        <div className="commentSection">
        <p>Comments</p>
        <div className="input_box">
        <input placeholder="Write a comment..." />
        <i className="fa fa-paper-plane" aria-hidden="true"></i>
        </div>
        </div>
    )
}

export default CommentSection;