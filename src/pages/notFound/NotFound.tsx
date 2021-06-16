import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import './notFound.scss'

const NotFound: FC = (): JSX.Element => {
  return (
    <div className="notFound">
      <h2 className="notFound__message">Page not found</h2>
      <Link to="/" className="notFound__link">
        На Главную
      </Link>
    </div>
  )
}

export default NotFound
