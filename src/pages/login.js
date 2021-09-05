import React, { useState, useContext,useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import FirebaseContext  from '../context/firebase'
import * as ROUTES from '../constants/routes'

export default function Login(){

const history = useHistory()
const { firebase } = useContext(FirebaseContext)

//email and password input fields
const [emailAdress, setEmailAddress] = useState('')
const [password, setPassword] = useState('')

//if error
const [error, setError] = useState('')

//invalid if email or password is empty
const isInvalid = password === '' || emailAdress === ''

//handle user login
const handleLogin = async (e) => {
  e.preventDefault()
  try{
    //update firebase auth
    await firebase.auth().signInWithEmailAndPassword(emailAdress, password)
    //redirect to dashboard
    history.push(ROUTES.DASHBOARD)
  }
  //empty input fields and set error
  catch(error){
    setEmailAddress('')
    setPassword('')
    setError(error.message)
  }
}

useEffect(() => {
  document.title = 'Login - Instagram'
}, [])

  return(
    <div className="container flex mt-5 mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg"></img>
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col itm-center bg-white p-4 border border-gray-primary rounded mb-4">
          <h1 className="flex justiy-center items-center w-full ">
            Login 
          </h1>
        </div>
        {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

        <form onSubmit={handleLogin} method='post'>
          <input
            aria-label="Enter your email address"
            type='text'
            placeholder='Email address'
            className='text-sm text-gray-base w-full mr-3 py-5 px-4 h2 border border-gray-primary rounded mb-2'
            onChange= {({ target }) => setEmailAddress(target.value)}
          ></input>
          <input
            aria-label="Enter your password"
            type='password'
            placeholder='password'
            className='text-sm text-gray-base w-full mr-3 py-5 px-4 h2 border border-gray-primary rounded mb-2'
            onChange= {({ target }) => setPassword(target.value)}
          ></input>
          <button
          disabled = {isInvalid}
          type = 'submit'
          className = {`bg-blue-medium text-white w-full rounded h-8 font-bold
          ${isInvalid && 'opacity-50'}`}
          >Log in</button>
        </form>
      </div>
      <div className='flex justify-center mt-2 rounded items-center flex-col w-full bg-white border-gray-primary'>
        <p className='text-sm'>
          Dont have an account? 
          <Link to={ROUTES.SIGN_UP} className='font-bold text-blue-medium'>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}