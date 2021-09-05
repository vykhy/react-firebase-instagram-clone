import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Header from '../components/header'
import { getUserByUsername } from '../services/firebase'
import * as ROUTES from './../constants/routes'
import UserProfile  from '../components/profile/index'

export default function Profile(){
    //get profile username from url parameter
    const { username } = useParams()
    //get target profile user
    const [user, setUser] = useState(null)
    const history = useHistory()

    //get target user details, redirect to not found if user not found
    useEffect(() => {
        async function checkUserExists(){
            const [user] = await getUserByUsername(username)
            if(user.userId){
                setUser(user)
            } else {
                history.push(ROUTES.NOT_FOUND)
            }
        }

        checkUserExists()
    }, [username, history])

    //console.log(user)

    return user?.username? (
        <div className="bg-gray-background">
            <Header />
            <UserProfile user={user} />
            {/* <div className="mx-auto max-w-screen-lg">
                {username}
            </div> */}
        </div>
    ) :
    null
}