import {Box, Button, Grid, Typography, Link as MuiLink, IconButton} from '@mui/material'
import {Link} from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {deleteMatching} from '../../store/actions/userCompanyAction'

const InternshipPlaceItem = ({place}) => {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const handleDelete = async () => {
    setIsLoading(true)
    const form = {userId: place.user.id, companyId: place.company.id}
    await dispatch(deleteMatching(form))
    setIsLoading(false)
  }
  return (
    <Grid container spacing={1} wrap="nowrap" justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h5" component="span">
          {place.company.name}
        </Typography>
        {place.isCurrent && (
          <Typography variant="body1" component="span">
            {' '}
            (Текущее место стажировки)
          </Typography>
        )}
        {/* <IconButton
          color="primary"
          aria-label="delete-place"
          sx={{verticalAlign: 'sub', ml: 1}}
          onClick={handleDelete}
          disabled={isLoading}
        >
          <DeleteIcon />
        </IconButton> */}
      </Grid>
      <Grid item xs="auto">
        <MuiLink component={Link} underline="hover" to={`/companies/${place.company.id}`}>
          Перейти к комании
        </MuiLink>
      </Grid>
    </Grid>
  )
}

export default InternshipPlaceItem
