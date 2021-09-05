import React from 'react'
import PropTypes from 'prop-types'

/**
 * @returns image component of a post
 */
export default function Image({ src, caption }){

    return(
        <div className=''>
            <img src={src} alt={caption} />
        </div>
    )
}

Image.propTypes = {
    src: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired
}

