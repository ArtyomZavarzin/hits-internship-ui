import {
  Box,
  Typography,
  Grid,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Button,
} from '@mui/material'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {companies} from '../companies/mocks'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const characteristics = [
  {field: 'amuontIntern', name: 'Количество стажеров'},
  {field: 'amuontFulltime', name: 'Количество вышедщих на фултайм'},
  {field: 'amuontVacancy', name: 'Количество вакансий'},
  {field: 'workFormat', name: 'Формат работы'},
]

const CompanyPage = () => {
  const [company, setCompany] = useState(null)
  const {id} = useParams()
  useEffect(() => {
    setCompany(companies.find(item => item.id === +id))
  }, [])
  return (
    <Box>
      <Typography variant="h2" sx={{mb: 2}}>
        {company?.name}
      </Typography>
      <Typography variant="h5" sx={{mb: 2}}>
        {company?.description}
      </Typography>
      <Grid container spacing={3}>
        {characteristics.map(el => {
          return (
            <Grid item xs={12} md={6} lg={4}>
              <Paper variant="outlined" sx={{p: 3, display: 'flex', justifyContent: 'space-between'}}>
                <Typography>{el.name}</Typography>
                <Typography sx={{fontWeight: 'bold'}} ml={3}>
                  {company?.[el.field]}
                </Typography>
              </Paper>
            </Grid>
          )
        })}
      </Grid>
      <Typography variant="h4" sx={{my: 2}}>
        Вакансии
      </Typography>
      {company?.vacancies.map(el => {
        return (
          <Accordion key={el.name}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h5" sx={{textTransform: 'uppercase', fontWeight: 200}}>
                {el.name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                <Grid item xs={12} md={6} lg={4} sx={{fontWeight: 'bold'}}>
                  Требования
                </Grid>
                <Grid item xs>
                  <Typography align="center">{el.requirements}</Typography>
                </Grid>
              </Grid>
              <Divider sx={{my: 2}} />
              <Grid container>
                <Grid item xs={12} md={6} lg={4} sx={{fontWeight: 'bold'}}>
                  Количество мест
                </Grid>
                <Grid item xs>
                  <Typography align="center">{el.amountPlaces}</Typography>
                </Grid>
              </Grid>
              <Divider sx={{my: 2}} />
              <Grid container>
                <Grid item xs={12} md={6} lg={4} sx={{fontWeight: 'bold'}}>
                  Количество претиндетов
                </Grid>
                <Grid item xs>
                  <Typography align="center">{el.amountApplications}</Typography>
                </Grid>
              </Grid>
              <Divider sx={{my: 2}} />
              <Grid container>
                <Grid item xs={12} md={6} lg={4} sx={{fontWeight: 'bold'}}>
                  Количество этапов
                </Grid>
                <Grid item xs>
                  <Typography align="center">{el.amountStages}</Typography>
                </Grid>
              </Grid>
              <Button variant="contained" sx={{mt: 4, width: '100%'}}>
                Подать заявку
              </Button>
            </AccordionDetails>
          </Accordion>
        )
      })}
    </Box>
  )
}

export default CompanyPage
