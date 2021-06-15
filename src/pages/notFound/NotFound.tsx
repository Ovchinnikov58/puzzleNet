import React, { FC } from 'react'
import './notFound.scss'

const NotFound: FC = (): JSX.Element => {
  return (
    <div className="notFound">
      <h2 className="notFound__message">Page not found</h2>
    </div>
  )
}

export default NotFound
