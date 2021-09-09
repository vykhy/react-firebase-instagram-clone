import React,{ useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import { getSuggestedProfiles } from '../../services/firebase'
import SuggestedProfile from './suggested-profile'

/**
 * @returns component with list of suggested profiles
 */
export default function Suggestions({ userId, following, loggedInUserDocId }){

    //list of suggested profiles
    const [profiles, setprofiles] = useState(null)

    //get suggested profiles from firebase services if a user is logged in
    useEffect(() => {
        async function suggestedProfiles(){
            const response = await getSuggestedProfiles(userId, following)
            setprofiles(response)
        }
        if(userId){
            suggestedProfiles()
        }else{
            let a = 0
        }
    }, [userId])

    return !profiles ? (
        <div>
            <p>{ null != {userId}}</p>
            <Skeleton count={5} height={150} className='mt-5'/>
        </div>
        
    ): profiles.length > 0 ?(
        <div className='rounded flex flex-col sm:hidden' >
            <div className='text-sm flex items-center align-items justify-between mb-2'>
                <p className='font-bold text-gray-base'>Suggestions for you</p>
            </div>
            <div className="mt-4 grid gap-4">
                {profiles.map((profile) => (
                    <SuggestedProfile 
                      key={profile.docId}
                      profileDocId={profile.docId}
                      username = {profile.username}
                      profileId={profile.userId}
                      userId={userId}
                      loggedInUserDocId={loggedInUserDocId}
                    />
                ))}
            </div>
        </div>
    ) : null
}

Suggestions.propTypes = {
    userId: PropTypes.string,
    following: PropTypes.array,
    loggedInUserDocId: PropTypes.string
}