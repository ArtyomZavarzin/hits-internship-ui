import {TextField, Grid, Container, Button, Typography, Paper, CircularProgress} from '@mui/material'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {red} from '@mui/material/colors'
import {getUserEditData} from '../../store/actions/userAction'
import {useAuth} from '../../hooks/use-auth'
import CircularLoader from '../../components/common-components/CircularLoader'
import {userRoles} from '../../common/constants'
import CompanyForm from './CompanyForm'
import CompanyPage from '../company-page'

// const useStyles = makeStyles(theme => ({
//   root: {
//     padding: theme.spacing(3),
//   },
//   buttonSpacing: {
//     marginLeft: theme.spacing(1),
//   },
// }))

const ProfilePage = () => {
  // const classes = useStyles()
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isEditing, setIsEditing] = useState(false)

  const {userId, userRole, companyId} = useAuth()
  // const {isLoading, userEditData} = useSelector(state => state.user)

  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(getUserEditData(userId))
  // }, [userId, dispatch])

  // useEffect(() => {
  //   setName(userEditData.name)
  //   setMiddleName(userEditData.middleName)
  //   setSurname(userEditData.surname)
  //   setPhone(userEditData.phone)
  //   setEmail(userEditData.email)
  //   setPassword(userEditData.password)
  // }, [userEditData])

  // if (isLoading) {
  //   return <CircularLoader />
  // }

  if (userRole === userRoles.company) {
    return <CompanyPage companyId={companyId} />
  }

  return (
    <>
      <Typography variant="h3" mb={4}>
        Профиль студента
      </Typography>
    </>
    // <Container maxWidth="xs" sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    //   {isLoading ? (
    //     <CircularProgress />
    //   ) : (
    //     <>
    //       <Typography>Профиль</Typography>
    //     </>
    //     // <Paper elevation={15} sx={{p: 2}}>
    //     //   <Grid container spacing={3} mb={3}>
    //     //     <Grid item xs={12}>
    //     //       <Typography variant="h6">Профиль</Typography>
    //     //     </Grid>
    //     //   </Grid>
    //     //   <Grid container spacing={2}>
    //     //     <Grid item xs={12}>
    //     //       <TextField
    //     //         fullWidth={true}
    //     //         label="Name"
    //     //         value={name}
    //     //         onChange={e => setName(e.target.value)}
    //     //         placeholder="name"
    //     //         disabled={!isEditing}
    //     //       />
    //     //     </Grid>

    //     //     <Grid item xs={12}>
    //     //       <TextField
    //     //         fullWidth={true}
    //     //         label="Surname"
    //     //         value={surname}
    //     //         onChange={e => setSurname(e.target.value)}
    //     //         placeholder="surname"
    //     //         disabled={!isEditing}
    //     //       />
    //     //     </Grid>

    //     //     <Grid item xs={12}>
    //     //       <TextField
    //     //         fullWidth={true}
    //     //         label="Middlename"
    //     //         value={middleName}
    //     //         onChange={e => setMiddleName(e.target.value)}
    //     //         placeholder="middlename"
    //     //         disabled={!isEditing}
    //     //       />
    //     //     </Grid>

    //     //     <Grid item xs={12}>
    //     //       <TextField
    //     //         fullWidth={true}
    //     //         label="Phone"
    //     //         value={phone}
    //     //         onChange={e => setPhone(e.target.value)}
    //     //         placeholder="phone"
    //     //         disabled={!isEditing}
    //     //       />
    //     //     </Grid>

    //     //     <Grid item xs={12}>
    //     //       <TextField
    //     //         fullWidth={true}
    //     //         label="Email"
    //     //         type="email"
    //     //         value={email}
    //     //         onChange={e => setEmail(e.target.value)}
    //     //         placeholder="email"
    //     //         disabled={!isEditing}
    //     //       />
    //     //     </Grid>

    //     //     <Grid item xs={12}>
    //     //       <TextField
    //     //         type="password"
    //     //         fullWidth={true}
    //     //         label="Password"
    //     //         value={password}
    //     //         onChange={e => setPassword(e.target.value)}
    //     //         placeholder="password"
    //     //         disabled={!isEditing}
    //     //       />
    //     //     </Grid>

    //     //     {/* {error ? (
    //     //     <Grid item xs={12}>
    //     //       <Typography style={{color: red[500]}}>{error}</Typography>
    //     //     </Grid>
    //     //   ) : null} */}

    //     //     <Grid item xs={12} container spacing={2}>
    //     //       <Grid item>
    //     //         <Button variant="contained" color="primary" onClick={() => {}} disabled={isLoading}>
    //     //           Редактировать
    //     //         </Button>
    //     //       </Grid>
    //     //     </Grid>
    //     //   </Grid>
    //     // </Paper>
    //   )}
    // </Container>
  )
}

export default ProfilePage
