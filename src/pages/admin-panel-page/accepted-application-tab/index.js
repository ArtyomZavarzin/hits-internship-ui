import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getWhitelist} from '../../../store/actions/whitelistAction'
import CircularLoader from '../../../components/common-components/CircularLoader.js'
import {getAcceptedJobApplications} from '../../../store/actions/jobApplicationAction'
import AcceptedJobApplicationItem from './accepted-application-item'

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
      {acceptedJobApplications?.map(item => (
        <AcceptedJobApplicationItem key={item.id} application={item} />
      ))}
    </>
  )
}

export default AcceptedApplicationTab
