import React, { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { toast } from 'react-toastify'
import { fetchUser } from '../../store/actions'
import './auth.scss'

const Auth: FC = (): JSX.Element => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const dsp = useDispatch()
  const history = useHistory()

  return (
    <div className="auth">
      <form noValidate autoComplete="off" className="auth__form" onSubmit={(e) => onSubmitHandler(e)}>
        <h2 className="auth__title">Авторизируйтесь:</h2>
        <TextField
          className="auth__input"
          id="login"
          label="Login"
          variant="outlined"
          autoFocus
          required
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <TextField
          className="auth__input"
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" color="primary" variant="contained">
          Войти
        </Button>
      </form>
    </div>
  )

  function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (login === '' || password === '') {
      toast('Поля обязательны для заполнения!', { type: 'error' })
      return
    }
    setPassword('')
    dsp(fetchUser({ login, password, history }))
  }
}

export default Auth
