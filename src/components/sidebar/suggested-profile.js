import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { updateLoggedInUserFollowing, updateFollowedUserFollowers } from '../../services/firebase'

export default function SuggestedProfile(
    { profileDocId: profileDocId, username, profileId, userId, loggedInUserDocId }
){

    //toggle whether this profile is being currently followed
    const [followed, setfollowed] = useState(false)

    //update state, UI and firestore db when followed/unfollowed
    async function handleFollowUser(){
        setfollowed(true)

        //update following array
        await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false)
        //update followers array
        await updateFollowedUserFollowers(profileDocId, userId)

    }

    return !followed ? (
        // suggested profile image and name
        <div className='flex flex-row items-center align-item justify-between '>
            <div className='flex items-center justify-between'>
                <img 
                    className='rounded-full w-8 flex mr-3'
                    src={`/images/avatars/${username}.jpg`}
                    alt='user'
                />
                {/* link to suggested profile */}
                <Link to={`/p/${username}`}>
                    <p className='font-bold text-sm'>{username}</p>
                </Link>
            </div>
            {/* button to follow suggested profile */}
              <button className='text-sm font-bold text-blue-medium'
                type='button'
                onClick={() => handleFollowUser() }
             > Follow </button>
        </div>
    ) : null
    }

SuggestedProfile.propTypes = {
    profileDocId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    profileId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    loggedInUserDocId: PropTypes.string.isRequired
}