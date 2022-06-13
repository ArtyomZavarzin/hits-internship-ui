import {Grid, Typography} from '@mui/material'
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import CommentsSection from '../../components/comments-section/index.js'
import CircularLoader from '../../components/common-components/CircularLoader.js'
import {useAuth} from '../../hooks/use-auth.js'
import {getCompany} from '../../store/actions/companyAction.js'
import VacanciesSection from './vacancies-section/VacanciesSection.js'

const CompanyPage = ({companyId}) => {
  const dispatch = useDispatch()
  const {id} = useParams()

  const {isLoading, company} = useSelector(state => state.company)

  useEffect(() => {
    dispatch(getCompany([null, undefined].includes(companyId) ? id : companyId))
  }, [])

  if (isLoading) {
    return <CircularLoader />
  }

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={8}>
          <Typography variant="h3" mb={4}>
            {company.name}
          </Typography>
          <Typography variant="body1" sx={{whiteSpace: 'pre-line'}}>
            {company.description}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <CommentsSection companyId={[null, undefined].includes(companyId) ? id : companyId} />
        </Grid>
      </Grid>
      <VacanciesSection companyId={[null, undefined].includes(companyId) ? id : companyId} />
    </>
  )
}

export default CompanyPage
