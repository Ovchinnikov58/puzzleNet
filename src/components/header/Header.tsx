import React, { FC } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import PuzzleIcon from '../svg/Puzzle'

import { changeSiderVisibility } from '../../store/actions'
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
  const dsp = useDispatch()

  return (
    <div className={classes.root}>
      <AppBar position="static" className="header">
        <Toolbar>
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
          <PuzzleIcon />
          <Typography variant="h6" className={classes.title} style={{ marginLeft: '10px' }}>
            PuzzleNet
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  )

  function onMenuBtnClickHandler() {
    dsp(changeSiderVisibility())
  }
}

export default Header
