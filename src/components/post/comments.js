import React, {useState } from 'react'
import PropTypes from 'prop-types'
import { formatDistance } from 'date-fns'
import { Link } from 'react-router-dom'
import AddComment from './add-comments'

export default function Comments({ docId, comments: allComments, posted, commentInput }){

    //show all comments or no(3 comments and show all button)
    const [showAll, setShowAll] = useState(false)
    //all comments of the post
    const [comments, setComments] = useState(allComments)

    return(
        <div>
            <div className='p-4 pt-1 pb-4' >
              {/* if more than 3 comments, show 3 and a link to see all */}
              {!showAll && comments.length >= 3 && (
                  <p className="text-sm text-gray-base mb-1 cursor-pointer" onClick={() => setShowAll(true)}>
                      View all {comments.length} comments
                  </p>
              )}
              {/* show 3 comments always */}
              {!showAll && comments.slice(0, 3).map((item) => (
                  <p key={`${item.comment}-${item.displayName}`} 
                    className="mb-1" >
                      {/* link to commenter profile */}
                      <Link to={`/p/${item.displayName}`} >
                          <span className="mr-1 font-bold">
                            {item.displayName}
                          </span>
                      </Link>
                      <span>
                        {item.comment}
                      </span>
                  </p>
              ))}
              {/* when was the post posted */}
              <p className="text-gray-base uppercase text-xs">
                {formatDistance(posted, new Date())} ago
              </p>
            </div>
            {/* form to add new comment */}
            <AddComment
              docId={docId}
              comments={comments}
              setComments={setComments}
              commentInput={commentInput}
            />
            {/* show all comments if showall is true, with option to hide */}
            {showAll &&
            <p className="text-sm text-bold text-gray-base pl-4 mb-1 cursor-pointer" onClick={() => setShowAll(false)}>Hide all</p>}
            {showAll &&
             comments.map((item, i) => (
              <div key={`${i}-comment`} className="p-4 pt-1 pb-4">
                  <p key={`${item.comment}-${item.displayName}`} 
                    className="mb-1" >
                      {/* link to commenter profile */}
                      <Link to={`/p/${item.displayName}`}>
                          <span className="mr-1 font-bold">
                            {item.displayName}
                          </span>
                      </Link>
                      <span>
                        {item.comment}
                      </span>
                  </p>
              </div>
              ))}
        </div>
    )
}

Comments.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    posted: PropTypes.number.isRequired,
    commentInput: PropTypes.object.isRequired
}