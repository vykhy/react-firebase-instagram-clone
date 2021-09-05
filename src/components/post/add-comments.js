import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import FirebaseContext from '../../context/firebase'
import UserContext from '../../context/user'

/**
 * 
 * @returns component to add new comment to a post
 */
export default function AddComment({ docId, comments, setComments, commentInput }){

    //value of comment box
    const [comment, setComment] = useState('')

    //to use firabase firestore
    const { firebase, FieldValue } = useContext(FirebaseContext)

    //get current user
    const {
        user: { displayName }
    } = useContext(UserContext)

    //on comment submit
    const handleSubmitComment = e => {
        e.preventDefault();
        
        //set comments array as old plus new comment for ui
        setComments([{ displayName, comment }, ...comments])
        setComment('')

        //update firestore
        return firebase
            .firestore()
            .collection('photos')
            .doc(docId)
            .update({
                //merge array of old comments with new comment for firestore
                comments: FieldValue.arrayUnion({ displayName, comment })
            })
    }

    return (
        <div className="border-t border-gray-primary">
            <form
                className="flex justiy-between n pl-0 pr-5"
                method="POST"
                onSubmit={(e) => comment.length >=1 ? 
                    handleSubmitComment(e) : 
                    e.preventDefault()}
            >
                <input
                  aria-label='Add a comment'
                  autoComplete='off'
                  className="text-sm text-gray-base w-full mr-3 py-5 px-4"
                  type="text"
                  name="add-comment"
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={({ target }) => setComment(target.value)}
                  ref={commentInput}
                />
                <button
                  className={`text-sm font-bold text-blue-medium ${!comment && 'opacity-25'}`}
                  type="button"
                  disabled="comment.length < 1"
                  onClick={handleSubmitComment}
                >
                  Post
                </button>
            </form>
        </div>
    )
}

AddComment.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    setComments: PropTypes.func.isRequired,
    commentInput: PropTypes.object.isRequired
}
