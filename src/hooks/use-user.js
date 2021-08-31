import { useState, useEffect, useContext } from 'react'
import UserContext from '../context/user'
import { getUserByUserId } from '../services/firebase'

export default function useUser(){
    const [activeUser, setactiveUser] = useState({})
    const { user }  = useContext(UserContext)

    useEffect(() => {
        async function getUserObjByUserId(){
            //need a function that we can call (firebae service) that getets the user datata based on  id
            console.log(user.uid)
            const [response] = await getUserByUserId(user.uid)
            setactiveUser(response)
        }
        if(user?.uid){
            getUserObjByUserId()
        }
    }, [user])
    
    return { user: activeUser }
}