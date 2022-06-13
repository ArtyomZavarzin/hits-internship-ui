import {Grid, Typography} from '@mui/material'
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import WhitelistItem from './whitelist-item/index.js'
import {getWhitelist} from '../../../store/actions/whitelistAction'
import CircularLoader from '../../../components/common-components/CircularLoader.js'

const WhitelistTab = () => {
  const dispatch = useDispatch()
  const {isLoading, whitelist} = useSelector(state => state.whitelist)

  useEffect(() => {
    dispatch(getWhitelist())
  }, [dispatch])

  if (isLoading) {
    return <CircularLoader />
  }

  return (
    <>
      {whitelist?.map(item => (
        <WhitelistItem userDetails={item} />
      ))}
    </>
  )
}

export default WhitelistTab
