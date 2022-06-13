import {Box, Divider, Grid, Paper, Rating, Typography} from '@mui/material'
import {styled} from '@mui/system'

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

const VacancyItem = ({vacancy}) => {
  return (
    <StyledPaper variant="outlined" sx={{p: 2}}>
      <Typography variant="h5" color="primary" sx={{mb: 1}}>
        {vacancy.positionName}
      </Typography>

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
