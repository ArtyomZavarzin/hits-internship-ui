import {Button, Grid, Typography} from '@mui/material'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {userRoles} from '../../common/constants.js'
import CommentsSection from '../../components/comments-section/index.js'
import CircularLoader from '../../components/common-components/CircularLoader.js'
import {useAuth} from '../../hooks/use-auth.js'
import {getCompany} from '../../store/actions/companyAction.js'
import EditCompanyDialog from './EditCompanyDialog.js'
import VacanciesSection from './vacancies-section/VacanciesSection.js'

const CompanyPage = ({companyId}) => {
  const [isOwner, setIsOwner] = useState(false)
  const [id, setId] = useState(false)
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  const dispatch = useDispatch()
  const {id: paramsId} = useParams()

  const {userRole, companyId: userCompanyId} = useAuth()
  const {isLoading, company} = useSelector(state => state.company)

  useEffect(() => {
    setId([null, undefined].includes(companyId) ? paramsId : companyId)
    dispatch(getCompany([null, undefined].includes(companyId) ? paramsId : companyId))
  }, [])

  useEffect(() => {
    if (userRole === userRoles.admin || userCompanyId === id) {
      setIsOwner(true)
    }
  }, [id, userRole, userCompanyId])

  return (
    <>
      {isLoading ? (
        <CircularLoader />
      ) : (
        <>
          <Grid container spacing={4}>
            <Grid item xs={8}>
              <Grid container mb={4} spacing={1} wrap="nowrap" alignItems="center">
                <Grid item xs={true}>
                  <Typography variant="h3">{company.name}</Typography>
                </Grid>
                <Grid item>
                  {isOwner ? (
                    <>
                      <Button sx={{mt: 1}} variant="outlined" onClick={() => setDialogIsOpen(true)}>
                        Редактировать
                      </Button>
                    </>
                  ) : null}
                </Grid>
              </Grid>

              <Typography variant="body1" sx={{whiteSpace: 'pre-line'}}>
                {company.description}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <CommentsSection companyId={[null, undefined].includes(companyId) ? paramsId : companyId} />
            </Grid>
          </Grid>
          <VacanciesSection companyId={[null, undefined].includes(companyId) ? paramsId : companyId} />
        </>
      )}
      {isOwner ? (
        <>
          <EditCompanyDialog isOpen={dialogIsOpen} onClose={() => setDialogIsOpen(false)} companyId={id} />
        </>
      ) : null}
    </>
  )
}

export default CompanyPage
