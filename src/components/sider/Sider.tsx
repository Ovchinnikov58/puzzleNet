import React, { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ChatIcon from '@material-ui/icons/Chat'
import GridOnIcon from '@material-ui/icons/GridOn'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

import { AppState, AuthState, RootState } from '../../utils/types'
import { changeSiderVisibility, changeTheme } from '../../store/actions'
import './Sider.scss'

const Sider: FC = (): JSX.Element => {
  const location = useLocation()
  const { siderIsVisible, darkTheme } = useSelector((s: RootState): AppState => s.app)
  const { user } = useSelector((s: RootState): AuthState => s.auth)
  const dsp = useDispatch()

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
        <div className="sider-menu__user-block">
          <AccountCircleIcon fontSize="large" className="sider-menu__user-logo" /> {user}
        </div>
        {list()}
        <div className="sider-menu__theme">
          <FormControlLabel
            control={<Switch checked={darkTheme} onChange={handleChangeSwitch} name="switchChecked" color="primary" />}
            label="Тёмная тема"
          />
        </div>
      </Drawer>
    </div>
  )

  function handleChangeSwitch() {
    dsp(changeTheme())
  }

  function toggleDrawer() {
    dsp(changeSiderVisibility())
  }
}

export default Sider
