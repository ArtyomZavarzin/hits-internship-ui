import {Box, Button, Grid, Typography, Link as MuiLink} from '@mui/material'
import {Link} from 'react-router-dom'

const InternshipPlaceItem = ({place}) => {
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
