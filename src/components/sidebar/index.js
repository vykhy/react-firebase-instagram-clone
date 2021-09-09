import React from 'react'
import useUser from '../../hooks/use-user'
import User from './user'
import Suggestions from './suggestions'

/**
 * 
 * @returns current user profile and a list of suggestions of accounts to follow
 */
export default function SideBar() {
    const {
         user: { docId, fullName, username, userId, following }
        } = useUser()
        return (
            <div className=' p-4 invisible md:visible'>
                <User username={username} fullName={fullName}/>
                <Suggestions userId={ userId } following={following} loggedInUserDocId={docId} />
            </div>
        )
    
}

