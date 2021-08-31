import { useState, useEffect, useContext } from 'react'
import FirebaseContext from '../context/firebase'

export default function useAuthListener(){
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')))
    const { firebase } = useContext(FirebaseContext)

    useEffect(() => {
        const listener = firebase.auth().onAuthStateChanged((authUser) => {
            //if we have user, we store in localstorage
            if(authUser){
                localStorage.setItem('authUser', JSON.stringify(authUser))
                setUser(authUser)
            }else{
                // if no user, nullify it
                localStorage.removeItem('authUser')
                setUser(null)
            }
        })
        
        return () => listener()

    }, [firebase])
    
    return { user }
}