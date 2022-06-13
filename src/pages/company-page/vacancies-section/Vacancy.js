import {Box, Divider, Grid, IconButton, Paper, Rating, Typography} from '@mui/material'
import {styled} from '@mui/system'
import EditIcon from '@mui/icons-material/Edit'

const StyledPaper = styled(Paper)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  transition: 'all 0.15s',
  '&:hover': {
    backgroundColor: '#fcfcfc',
    transform: 'scale(1.025)',
  },
}))

const VacancyItem = ({vacancy, editingRight, onEdit}) => {
  return (
    <StyledPaper variant="outlined" sx={{p: 2}}>
      <Grid container spacing={1} sx={{mb: 1}} wrap="nowrap">
        <Grid item xs={true}>
          <Typography variant="h5" color="primary">
            {vacancy.positionName}
          </Typography>
        </Grid>
        {editingRight ? (
          <Grid item>
            <IconButton color="primary" aria-label="edit-vacancy" onClick={() => onEdit(vacancy.id)}>
              <EditIcon />
            </IconButton>
          </Grid>
        ) : null}
      </Grid>

      <Typography sx={{flexGrow: 1, whiteSpace: 'pre-line'}} variant="body1">
        {vacancy.description}
      </Typography>

      <Grid container sx={{my: 1}} spacing={2} justifyContent="space-between">
        <Grid item>
          <Typography variant="body1">Мест - {vacancy.maxCountStudents}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">Оплата - {vacancy.salary}₽</Typography>
        </Grid>
      </Grid>
      {vacancy.currentYear && <Typography variant="subtitle2">Вакансия только для текущего года</Typography>}
    </StyledPaper>
  )
}

export default VacancyItem
