import React, { FC } from 'react'
import GitHubIcon from '@material-ui/icons/GitHub'
import './footer.scss'

const Footer: FC = (): JSX.Element => {
  return (
    <div className="footer">
      <a className="footer__link" href="https://github.com/Ovchinnikov58" target="_blank" rel="noreferrer">
        <GitHubIcon />
        &nbsp; gitHub
      </a>
    </div>
  )
}

export default Footer
