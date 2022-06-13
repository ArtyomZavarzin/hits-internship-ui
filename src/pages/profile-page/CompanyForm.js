import {TextField, Grid, Container, Button, Typography, Paper, CircularProgress} from '@mui/material'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {red} from '@mui/material/colors'
import {editCompany, getCompanyEditData} from '../../store/actions/companyAction'
import {useAuth} from '../../hooks/use-auth'
import CircularLoader from '../../components/common-components/CircularLoader'
import {userRoles} from '../../common/constants'

const CompanyForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')

  const [isEditing, setIsEditing] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)

  const {companyId, userRole} = useAuth()
  const {isLoading, companyEditData} = useSelector(state => state.company)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCompanyEditData(companyId))
  }, [companyId])

  useEffect(() => {
    setName(companyEditData.name)
    setEmail(companyEditData.email)
    setDescription(companyEditData.description)
  }, [companyEditData])

  const cancelEditing = () => {
    setName(companyEditData.name)
    setEmail(companyEditData.email)
    setDescription(companyEditData.description)

    setIsEditing(false)
  }

  const onSubmit = async () => {
    setSubmitLoading(true)
    const form = {
      id: companyEditData.id,
      name,
      description,
      email,
    }
    const {ok} = await dispatch(editCompany(form))
    if (ok) {
      setIsEditing(false)
    }
    setSubmitLoading(false)
  }

  if (isLoading) {
    return <CircularLoader />
  }
  return (
    <>
      <Typography variant="h3" mb={4}>
        Профиль компании
      </Typography>
      <Grid container maxWidth="md">
        <Grid item container spacing={2} xs={12}>
          <Grid item xs={4} alignItems="center">
            <Typography variant="h5" mb={4}>
              Название компании
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField
              disabled={!isEditing || submitLoading}
              sx={{width: '100%'}}
              hiddenLabel
              size="small"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Grid>
        </Grid>

        <Grid item container spacing={2} xs={12}>
          <Grid item xs={4} alignItems="center">
            <Typography variant="h5" mb={4}>
              Описание
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField
              disabled={!isEditing || submitLoading}
              sx={{width: '100%'}}
              hiddenLabel
              size="small"
              value={description}
              multiline
              rows={5}
              onChange={e => setDescription(e.target.value)}
            />
          </Grid>
        </Grid>

        <Grid container mt={3} justifyContent="end" spacing={2}>
          {isEditing ? (
            <>
              <Grid item>
                <Button onClick={cancelEditing} disabled={submitLoading}>
                  Отмена
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={onSubmit} variant="outlined" disabled={submitLoading}>
                  Подтвердить
                </Button>
              </Grid>
            </>
          ) : (
            <Grid item>
              <Button onClick={() => setIsEditing(true)}>Редактировать</Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default CompanyForm
