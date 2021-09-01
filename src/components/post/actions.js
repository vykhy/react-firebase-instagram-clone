import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import FirebaseContext from '../../context/firebase'
import UserContext from '../../context/user'

export default function Actions({ docId, totalLikes, likedPhoto, handleFocus}){
    const {
        user: {uid: userId = ''}
    } = useContext(UserContext)

    const [toggleLiked, setToggleLiked] = useState(likedPhoto)
    const [likes, setLikes] = useState(totalLikes)
    const { firebase, FieldValue } = useContext(FirebaseContext)

    const handleToggleLiked = async() => {
        setToggleLiked((toggleLiked) => !toggleLiked)

        await firebase.firestore()
            .collection('photos')
            .doc(docId)
            .update({
                likes: toggleLiked ? FieldValue.arrayRemove(userId) :
                FieldValue.arrayUnion(userId)
            })

        setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1))

    }
    
    return (
        <div>
             <div className='flex justify-between p-4'>
                <div className='flex'>
                    <img onClick={ handleToggleLiked } 
                    onKeyDown={(e) => {
                        if(e.key === 'Enter'){
                            handleToggleLiked()
                        }
                    }}
                    className='w-8 mr-4 select-none cursor-pointer'
                    src={toggleLiked ? '/images/assets/heart-filled.png' : '/images/assets/heart.png'}
                    />
                    
                    {/* comment icon */}
                    <img 
                        onClick={handleFocus}
                        onKeyDown={(e) => {
                            if(e.key === 'Enter'){
                                handleFocus()
                            }
                        }}
                        src='/images/assets/comment.png' 
                        className="w-8 mr-4 select-none cursor-pointer" />
                </div>
            </div>
            <div className='p-4 py-0'>
                <p className='font-bold'>
                    {likes == 1 ? `${likes} like` : `${likes} likes`}
                </p>
            </div>
        </div>
       
    )
}

Actions.propTypes = {
    docId: PropTypes.string.isRequired,
    totalLikes: PropTypes.number.isRequired,
    likedPhoto: PropTypes.bool.isRequired,
    handleFocus: PropTypes.func.isRequired
}
