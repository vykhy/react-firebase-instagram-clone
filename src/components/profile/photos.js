import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'

export default function Photos( photos ){

    console.log(photos)
    const phot = {photos}   
    console.log( phot ) 
    return(
        <div>
            Photos
            
        </div>
    )
}

Photos.propTypes = {
    photos: PropTypes.array.isRequired
}