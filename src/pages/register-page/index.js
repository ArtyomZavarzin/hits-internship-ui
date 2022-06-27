import {TextField, Grid, Container, Paper, Button, Typography, Link as MuiLink} from '@mui/material'
import {Link, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {register} from '../../store/actions/authAction'
// import {login} from '../store/actions/authAction'

// const useStyles = makeStyles(theme => ({
//   root: {
//     padding: theme.spacing(3),
//   },
//   buttonSpacing: {
//     marginLeft: theme.spacing(1),
//   },
// }))

const SignUpPage = () => {
  // const classes = useStyles()
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRegister = () => {
    const form = {name: name, surname: surname, middleName: middleName, email: email, password: pass}
    const ok = dispatch(register(form))
    if (ok) {
      navigate('/login')
    }
    // dispatch(login(loginData))
    //   const auth = getAuth()
    //   signInWithEmailAndPassword(auth, email, password)
    //     .then(({user}) => {
    //       console.log(user)
    //       dispatch(
    //         setUser({
    //           email: user.email,
    //           id: user.uid,
    //           token: user.accessToken,
    //         })
    //       )
    //       push('/')
    //     })
    //     .catch(() => alert('Invalid user!'))
  }

  return (
    <Container maxWidth="xs" sx={{minHeight: '100vh', display: 'flex', alignItems: 'center'}}>
      <Paper variant="outlined" sx={{p: 2, borderRadius: '10px'}}>
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12}>
            <Typography variant="h6">Регистрация</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth={true}
              label="Имя"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Имя"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth={true}
              label="Фамилия"
              value={surname}
              onChange={e => setSurname(e.target.value)}
              placeholder="Фамилия"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth={true}
              label="Отчество"
              value={middleName}
              onChange={e => setMiddleName(e.target.value)}
              placeholder="Отчество"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth={true}
              label="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="email"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              type="password"
              fullWidth={true}
              label="Пароль"
              value={pass}
              onChange={e => setPass(e.target.value)}
              placeholder="Пароль"
            />
          </Grid>

          <Grid item xs={12} container spacing={2}>
            <Grid item>
              <Button variant="contained" color="primary" onClick={() => handleRegister()}>
                Продолжить
              </Button>
            </Grid>
            <Grid item sx={{display: 'flex', alignItems: 'center'}}>
              <MuiLink to="/login" underline="hover" component={Link}>
                Уже есть аккаунт?
              </MuiLink>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default SignUpPage
