import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import Header from './header'
import Image from './image'
import Actions from './actions'
import Footer from './footer'
import Comments from './comments'

/**
 * @returns a wrapper component of a post with header, image, footer, actions, likes and comments
 */
export default function Post({ content }){

    const commentInput = useRef(null)

    console.log(content.userLikedPhoto)
    const handleFocus = () => commentInput.current.focus()

    //components->//header, image, actions(like & comment), footer, comments
    return(
        <div className='rounded col-span-4 border bg-white border-gray-primary mb-12'>
            <Header username={content.username} />
            <Image src={content.imageSrc} caption={content.caption} />
            <Actions 
                docId={content.docId}
                totalLikes={content.likes.length}
                likedPhoto={content.userLikedPhoto}
                handleFocus={handleFocus}
            />
            <Footer 
              username={content.username}
              caption={content.caption}
            />
            <Comments
              docId={content.docId}
              comments={content.comments}
              posted={content.dateCreated}
              commentInput={commentInput}
            />
        </div>
    )
}

Post.propTypes = {
    content: PropTypes.shape({
        username: PropTypes.string.isRequired,
        imageSrc: PropTypes.string.isRequired,
        caption: PropTypes.string.isRequired,
        docId: PropTypes.string.isRequired,
        userLikedPhoto: PropTypes.bool.isRequired,
        likes: PropTypes.array.isRequired,
        comments: PropTypes.array.isRequired,
        dateCreated: PropTypes.number.isRequired,
    })

}