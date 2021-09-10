import React,{ useContext} from 'react'
import { Link } from 'react-router-dom'

import FirebaseContext from '../context/firebase'
import UserContext from '../context/user'
import * as ROUTES from '../constants/routes'

/**
 * 
 * @returns application header component with-> home, logout/login, buttons
 */
export default function Header(){

    const { firebase } = useContext(FirebaseContext)
    const { user} = useContext(UserContext)


    return (
        <header className='h-16 bg-white border-b border-gray-primary mb-8'>
            <div className='container mx-auto max-w-screen-lg h-full'>
                <div className='flex justify-between h-full'>
                    <div className='text-gray-700 text-center flex items-center align-items cursor-pointer'>
                        <h1 className='flex justify-center w-full'>
                            <Link to={ROUTES.DASHBOARD} aria-label='Instagram logo' >
                                <img src='/images/logo.png' alt='Instagram' className='mt-2 w-6/12'/>
                            </Link>
                        </h1>
                    </div>
                    <div className='text-gray-700 text-center flex items-center align-items'>
                        {user ?(
                            <>
                            <Link to={ROUTES.ADD_POST} aria-label='Add post'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="text-black-light cursor-pointer w-8 mr-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </Link>
                            <Link to={ROUTES.DASHBOARD} aria-label='Instagram logo' >
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                className="text-black-light cursor-pointer w-8 mr-6" 
                                fill="none"
                                viewBox="0 0 24 24" 
                                stroke="currentColor">
                                <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                                />
                                </svg>
                            </Link>

                            <button
                              type='button'
                              title='Sign Out'
                              onClick={() => firebase.auth().signOut()}
                              onKeyDown={ (e) => {
                                  if(e.key === 'Enter'){
                                      firebase.auth().signOut()
                                  }
                              }}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                className="text-black-light cursor-pointer w-8 mr-6" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor">
                                <path strokeLinecap="round"
                                 strokeLinejoin="round" 
                                 strokeWidth={2} 
                                 d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                                 />
                                </svg>
                            </button>
                            <div className='flex item-center cursor-pointer'>
                                <Link to={`/p/${user.displayName}`} >
                                    <img className='rounded-full h-8 w-8 object-cover flex'
                                    src = {`/images/avatars/${user.displayName}.jpg`}
                                    alt = {`${user.displayName} profile`}
                                    />
                                </Link>
                            </div>
                            </>
                        ) : (
                            <>
                            <Link to={ROUTES.LOGIN} >
                              <button className='bg-blue-medium font-bold text-sm rounded text-white
                            w-20 h-8' type='button'>Log in</button> 
                            </Link>
                            <Link to={ROUTES.SIGN_UP}>
                              <button 
                              className='font-bold text-sm rounded w-20 h-8 text-blue-medium'
                              type='button'>Sign Up</button> 
                            </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}