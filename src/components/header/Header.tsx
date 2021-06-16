import React, { FC, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import PuzzleIcon from '../svg/Puzzle'

import { changeSiderVisibility, resetStore } from '../../store/actions'
import './header.scss'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
)

const Header: FC = (): JSX.Element => {
  const classes = useStyles()

  const [showElems, setShowElems] = useState(true)
  const location = useLocation()
  const dsp = useDispatch()

  useEffect(checkLocation, [location])

  return (
    <div className={classes.root}>
      <AppBar position="static" className="header">
        <Toolbar>
          {showElems ? (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              disableRipple
              onClick={onMenuBtnClickHandler}
            >
              <MenuIcon />
            </IconButton>
          ) : null}
          <PuzzleIcon />
          <Typography variant="h6" className={classes.title} style={{ marginLeft: '10px' }}>
            PuzzleNet
          </Typography>
          {showElems ? (
            <Button color="inherit" onClick={onLogoutBtnHandler}>
              Logout
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  )

  function checkLocation() {
    if (location.pathname !== '/chat' && location.pathname !== '/' && location.pathname !== '/auth') {
      setShowElems(false)
    } else {
      setShowElems(true)
    }
  }

  function onLogoutBtnHandler() {
    localStorage.clear()
    dsp(resetStore())
  }

  function onMenuBtnClickHandler() {
    dsp(changeSiderVisibility())
  }
}

export default Header
