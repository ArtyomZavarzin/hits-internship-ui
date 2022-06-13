import {Grid, Typography, Box, Button, Paper} from '@mui/material'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {userRoles} from '../../../common/constants'
import CircularLoader from '../../../components/common-components/CircularLoader'
import {useAuth} from '../../../hooks/use-auth'
import {getCompanyVacancies} from '../../../store/actions/vacancyAction'
import AddIcon from '@mui/icons-material/Add'
import AddVacancyDialog from './AddVacancyDialog'
import VacancyItem from './Vacancy'

const companyVacanciesMock = [
  {
    id: 0,
    description: `· минимум 2-3 языка программирования, например, C#, Js, Python, SQL (познакомившись с одним, осваивать другой будет проще)
· проектирование систем, состоящих из множества взаимосвязанных элементов;
· тестирование кода – проверка работы программы целиком и её отдельных блоков, чтобы выяснить, соответствуют ли они требованиям заказчика;`,
    maxCountStudents: 3,
    salary: 15000,
    positionName: 'Backend dev',
    currentYear: true,
  },
  {
    id: 0,
    description: 'Defhjdksfh sdjkfh skjflsd fkjshfkshf sdhjfkhskf',
    maxCountStudents: 3,
    salary: 15000,
    positionName: 'Мобильный разработчик (Android)',
    currentYear: true,
  },
  {
    id: 0,
    description: 'Defhjdksfh sdjkfh skjflsd fkjshfkshf sdhjfkhskf',
    maxCountStudents: 3,
    salary: 15000,
    positionName: 'Front dev (Vue.js)',
    currentYear: true,
  },
]

const VacanciesSection = ({companyId}) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const dispatch = useDispatch()

  const {userRole, companyId: userCompanyId} = useAuth()
  const {isLoading, companyVacancies} = useSelector(state => state.vacancy)

  useEffect(() => {
    dispatch(getCompanyVacancies(companyId))
  }, [dispatch])

  return (
    <>
      <Typography variant="h4" sx={{mb: 2}}>
        Вакансии
      </Typography>
      <Box sx={{minHeight: '50px', position: 'relative'}}>
        {isLoading ? (
          <CircularLoader />
        ) : // ниже поменять с мока
        companyVacancies.length === 0 ? (
          <Typography variant="h6">На данный момент вакансий нет</Typography>
        ) : (
          <Grid container spacing={2}>
            {companyVacancies.map(item => (
              <Grid key={item.id} item xs={6}>
                <VacancyItem vacancy={item} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      {userRole === userRoles.admin || userCompanyId == companyId ? (
        <>
          <Button sx={{mt: 2}} variant="outlined" endIcon={<AddIcon />} onClick={() => setDialogIsOpen(true)}>
            Добавить вакансию
          </Button>
          <AddVacancyDialog isOpen={dialogIsOpen} onClose={() => setDialogIsOpen(false)} companyId={+companyId} />
        </>
      ) : null}
    </>
  )
}

export default VacanciesSection
