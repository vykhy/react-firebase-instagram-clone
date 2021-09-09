import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'

/**
 * 
 * @returns component with current user's photo , username and link to profile
 */
const User = ({ username, fullName }) => (

    !username || !fullName ? (
        <Skeleton count={1} height={61} />
    )
    :(
        <Link to={`/p/${username}`} className='grid grid-cols-4 gap-4 mb-6 items-center'>
            <div className='flex items-center justify-between col-span-1'>
                <img
                    className="rounded-full absolute w-10 h-10 object-cover flex  mr-3"
                    src={`/images/avatars/${username}.jpg`}
                    alt="profile pic"
                />
            </div>
            <div className='col-span-3'>
                <p className='fontnt-bold text-sm'>{username}</p>
                <p className = 'text-sm' >{fullName}</p>
            </div>
            <p>{ username }</p>
        </Link>
    )
)


export default User

User.propTypes = {
    username: PropTypes.string,
    fullName: PropTypes.string
}
