import React, { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ChatIcon from '@material-ui/icons/Chat'
import GridOnIcon from '@material-ui/icons/GridOn'

import { AppState, RootState } from '../../utils/types'
import { changeSiderVisibility } from '../../store/actions'
import './Sider.scss'

const Sider: FC = (): JSX.Element => {
  const location = useLocation()

  const { siderIsVisible } = useSelector((s: RootState): AppState => s.app)
  const dsp = useDispatch()

  function toggleDrawer() {
    dsp(changeSiderVisibility())
  }

  const list = () => (
    <div role="presentation" className="sider-menu" onClick={toggleDrawer} onKeyDown={toggleDrawer}>
      <List>
        <Link to="/" className="sider-menu__link">
          <ListItem button key="Лента" selected={location.pathname === '/'}>
            <GridOnIcon className="sider-menu__icon" />
            <ListItemText primary="Лента" />
          </ListItem>
        </Link>

        <Link to="/chat" className="sider-menu__link">
          <ListItem button key="Чат" selected={location.pathname === '/chat'}>
            <ChatIcon className="sider-menu__icon" />
            <ListItemText primary="Чат" />
          </ListItem>
        </Link>
      </List>
    </div>
  )

  return (
    <div className="sider">
      <Drawer open={siderIsVisible} onClose={toggleDrawer}>
        {list()}
      </Drawer>
    </div>
  )
}

export default Sider
