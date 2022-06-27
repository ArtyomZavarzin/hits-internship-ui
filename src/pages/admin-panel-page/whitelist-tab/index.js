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
      {whitelist.length !== 0 ? (
        whitelist?.map((item, index) => <WhitelistItem key={index} userDetails={item} />)
      ) : (
        <Typography>На данный момент новых заявок нет</Typography>
      )}
    </>
  )
}

export default WhitelistTab
