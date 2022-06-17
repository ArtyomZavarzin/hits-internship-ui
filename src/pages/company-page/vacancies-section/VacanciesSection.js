import {Grid, Typography, Box, Button, Paper} from '@mui/material'
import {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {userRoles} from '../../../common/constants'
import CircularLoader from '../../../components/common-components/CircularLoader'
import {useAuth} from '../../../hooks/use-auth'
import {getCompanyVacancies} from '../../../store/actions/vacancyAction'
import AddIcon from '@mui/icons-material/Add'
import CrudVacancyDialog from './CrudVacancyDialog'
import VacancyItem from './Vacancy'
import ApplyVacancyDialog from './ApplyVacancyDialog'

const VacanciesSection = ({companyId}) => {
  const [crudDialogIsOpen, setCrudDialogIsOpen] = useState(false)
  const [dialogAction, setDialogAction] = useState('')
  const [currentVacancy, setCurrentVacancy] = useState('')
  const dispatch = useDispatch()

  const [applyDialogIsOpen, setApplyDialogIsOpen] = useState(false)

  const {userRole, companyId: userCompanyId} = useAuth()
  const {isLoading, companyVacancies} = useSelector(state => state.vacancy)

  const onEdit = useCallback(vacancy => {
    setCurrentVacancy(vacancy)
    setDialogAction('edit')
    setCrudDialogIsOpen(true)
  }, [])

  const onCreate = useCallback(() => {
    setDialogAction('create')
    setCrudDialogIsOpen(true)
  }, [])

  const onApplyVacancy = useCallback(vacancy => {
    setCurrentVacancy(vacancy)
    setApplyDialogIsOpen(true)
  }, [])

  useEffect(() => {
    dispatch(getCompanyVacancies(companyId))
  }, [dispatch])

  return (
    <>
      <Typography variant="h4" sx={{my: 2}}>
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
                <VacancyItem
                  vacancy={item}
                  editingRight={userRole === userRoles.admin || userCompanyId == companyId}
                  onEdit={onEdit}
                  onApplyVacancy={onApplyVacancy}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      {userRole === userRoles.admin || userCompanyId == companyId ? (
        <>
          <Button sx={{mt: 2}} variant="outlined" endIcon={<AddIcon />} onClick={onCreate}>
            Добавить вакансию
          </Button>
          <CrudVacancyDialog
            isOpen={crudDialogIsOpen}
            onClose={() => setCrudDialogIsOpen(false)}
            companyId={+companyId}
            vacancyId={currentVacancy.id}
            dialogAction={dialogAction}
            getCompanyVacancies={getCompanyVacancies}
          />
        </>
      ) : null}
      {userRole === userRoles.student ? (
        <ApplyVacancyDialog
          vacancy={currentVacancy}
          isOpen={applyDialogIsOpen}
          onClose={() => setApplyDialogIsOpen(false)}
        />
      ) : null}
    </>
  )
}

export default VacanciesSection
