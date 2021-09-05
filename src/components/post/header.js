import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

/**
 * @returns section above a photo with username, userphoto and link to user profile
 */
export default function Header({ username }){

    return (
        <div className='flex border-b border-gray-primary h-4 py-8'>
            <div className='flex items-center'>
                <Link to={`/p/${username}`} className="flex - items center">
                  <img 
                    className="rounded-full h-8 w-8 flex mr-3"
                    src={`/images/avatars/${username}.jpg`}
                    alt={`${username} profile picture`}
                  />
                  <p className="font-bold">{username}</p>
                </Link>
            </div>
        </div>
    )
}

Header.propTypes = {
    username: PropTypes.string.isRequired
}