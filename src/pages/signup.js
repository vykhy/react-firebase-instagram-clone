import React, { useState, useContext,useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import FirebaseContext  from '../context/firebase'
import * as ROUTES from '../constants/routes'
import { doesUsernameExist } from '../services/firebase'

export default function Signup(){

const history = useHistory()
const { firebase } = useContext(FirebaseContext)

//username, fullname, email and password input fields
const [username, setUsername] = useState('')
const [fullName, setfullName] = useState('')
const [emailAdress, setEmailAddress] = useState('')
const [password, setPassword] = useState('')

const [error, setErrror] = useState('')

//invalid if email or password is empty
const isInvalid = password === '' || emailAdress === ''

const handleSignup = async (e) => {
  e.preventDefault()

  //check if username already exists
  const userNameExists = await doesUsernameExist(username)

  //if username doesn't already exist //we don't want duplicate usernames
  if(userNameExists.length === 0){
    try{
        const createdUserResult = await firebase
            .auth()
            .createUserWithEmailAndPassword(emailAdress, password)

            //authentication with firebase
                // -> email, pw and username(displayName)
            await createdUserResult.user.updateProfile({
                displayName : username
            })

            //firebase user collection(create a document)
            await firebase.firestore().collection('users').add(
                {
                    userId : createdUserResult.user.uid,
                    username: username.toLowerCase(),
                    fullName,
                    emailAdress: emailAdress.toLowerCase(),
                    following: [],
                    dateCreated: Date.now()
                }
            )
        history.push(ROUTES.DASHBOARD)
    } 
    catch(error){
        setfullName('')
        setUsername('')
        setEmailAddress('')
        setErrror(error.message)
    }
  }
  else{
      setErrror('This username is already taken')
  }
}

useEffect(() => {
  document.title = 'Sign up - Instagram'
}, [])

  return(
    <div className="container flex  mt-5 mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="images/iphone-with-profile.jpg"></img>
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col itm-center bg-white p-4 border border-gray-primary rounded mb-4">
          <h1 className="flex justiy-center items-center w-full ">
            Sign up 
          </h1>
        </div>
        {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

        <form onSubmit={handleSignup} method='post'>
        <input
            aria-label="Enter your username"
            type='text'
            placeholder='Username'
            className='text-sm text-gray-base w-full mr-3 py-5 px-4 h2 border border-gray-primary rounded mb-2'
            onChange= {({ target }) => setUsername(target.value)}
            value = {username}
          ></input>
          <input
            aria-label="Enter your full name"
            type='text'
            placeholder='Full name'
            className='text-sm text-gray-base w-full mr-3 py-5 px-4 h2 border border-gray-primary rounded mb-2'
            onChange= {({ target }) => setfullName(target.value)}
            value = {fullName}
          ></input>
          <input
            aria-label="Enter your email address"
            type='text'
            placeholder='Email address'
            className='text-sm text-gray-base w-full mr-3 py-5 px-4 h2 border border-gray-primary rounded mb-2'
            onChange= {({ target }) => setEmailAddress(target.value)}
            value = {emailAdress}
          ></input>
          <input
            aria-label="Enter your password"
            type='password'
            placeholder='password'
            className='text-sm text-gray-base w-full mr-3 py-5 px-4 h2 border border-gray-primary rounded mb-2'
            onChange= {({ target }) => setPassword(target.value)}
            value = {password}
          ></input>
          <button
          disabled = {isInvalid}
          type = 'submit'
          className = {`bg-blue-medium text-white w-full rounded h-8 font-bold
          ${isInvalid && 'opacity-50'}`}
          >Sign up</button>
        </form>
      </div>
      <div className='flex justify-center mt-2 rounded items-center flex-col w-full bg-white border-gray-primary'>
        <p className='text-sm'>
          Have an account? {` `}
          <Link to={ROUTES.LOGIN} className='font-bold text-blue-medium'>
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}