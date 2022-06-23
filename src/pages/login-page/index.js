import {TextField, Grid, Container, Button, Typography, Paper, Link as MuiLink} from '@mui/material'
import {Link, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../../store/actions/authAction'
import {red} from '@mui/material/colors'

// const useStyles = makeStyles(theme => ({
//   root: {
//     padding: theme.spacing(3),
//   },
//   buttonSpacing: {
//     marginLeft: theme.spacing(1),
//   },
// }))

const SignInPage = () => {
  // const classes = useStyles()
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const {isLoading, error} = useSelector(state => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async () => {
    const loginData = {email: email, password: pass}
    const ok = await dispatch(login(loginData))
    if (ok) {
      navigate('/')
    }
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
            <Typography variant="h6">Вход в систему</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
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
              label="Password"
              value={pass}
              onChange={e => setPass(e.target.value)}
              placeholder="password"
            />
          </Grid>

          {error ? (
            <Grid item xs={12}>
              <Typography style={{color: red[500]}}>{error}</Typography>
            </Grid>
          ) : null}

          <Grid item xs={12} container spacing={2}>
            <Grid item>
              <Button variant="contained" color="primary" onClick={() => handleLogin()} disabled={isLoading}>
                Продолжить
              </Button>
            </Grid>
            <Grid item sx={{display: 'flex', alignItems: 'center'}}>
              <MuiLink to="/registration" underline="hover" component={Link}>
                Еще нет аккаунта?
              </MuiLink>
              {/* <Button color="inherit" component={Link} to="/registration">
                Registration
              </Button> */}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default SignInPage
