import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getWhitelist} from '../../../store/actions/whitelistAction'
import CircularLoader from '../../../components/common-components/CircularLoader.js'
import {getAcceptedJobApplications} from '../../../store/actions/jobApplicationAction'
import AcceptedJobApplicationItem from './accepted-application-item'
import {Typography} from '@mui/material'

const AcceptedApplicationTab = () => {
  const dispatch = useDispatch()
  const {isLoadingAcceptedJobApplication, acceptedJobApplications} = useSelector(state => state.jobApplication)

  useEffect(() => {
    dispatch(getAcceptedJobApplications())
  }, [dispatch])

  if (isLoadingAcceptedJobApplication) {
    return <CircularLoader />
  }

  return (
    <>
      {acceptedJobApplications.length !== 0 ? (
        acceptedJobApplications?.map(item => <AcceptedJobApplicationItem key={item.id} application={item} />)
      ) : (
        <Typography>На данный момент список пуст</Typography>
      )}
    </>
  )
}

export default AcceptedApplicationTab
