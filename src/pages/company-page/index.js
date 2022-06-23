import {Button, Grid, Typography} from '@mui/material'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useParams} from 'react-router-dom'
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
          <Grid container mb={5} spacing={4} flexWrap="nowrap">
            <Grid item xs={true}>
              {isOwner ? (
                <>
                  <Grid container mb={1} spacing={1} justifyContent="end">
                    <Grid item>
                      <Button variant="outlined" onClick={() => setDialogIsOpen(true)}>
                        Редактировать
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="outlined"
                        component={Link}
                        to={userRole === userRoles.admin ? `/employees/${id}` : `/employees`}
                      >
                        Открыть список стажеров
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="outlined"
                        component={Link}
                        to={userRole === userRoles.admin ? `/company-application/${id}` : `/application`}
                      >
                        Открыть заявки
                      </Button>
                    </Grid>
                  </Grid>
                  {/* <Button sx={{mt: 1}} variant="outlined" onClick={() => setDialogIsOpen(true)}>
                        Редактировать
                      </Button> */}
                </>
              ) : null}
              <Typography variant="h3" mb={3}>
                {company.name}
              </Typography>

              <Typography variant="body1" sx={{whiteSpace: 'pre-line'}}>
                {company.description}
              </Typography>
            </Grid>
            <Grid item xs="auto">
              <CommentsSection companyId={[null, undefined].includes(companyId) ? paramsId : companyId} />
            </Grid>
          </Grid>
          <VacanciesSection companyId={[null, undefined].includes(companyId) ? paramsId : companyId} />
        </>
      )}
      {isOwner ? (
        <>
          <EditCompanyDialog
            isOpen={dialogIsOpen}
            onClose={() => setDialogIsOpen(false)}
            companyId={id}
            isAdmin={userRole === userRoles.admin}
          />
        </>
      ) : null}
    </>
  )
}

export default CompanyPage
