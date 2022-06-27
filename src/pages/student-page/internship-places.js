import {Box, Button, Grid, Typography} from '@mui/material'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import CircularLoader from '../../components/common-components/CircularLoader'
import {getMatchingUserList} from '../../store/actions/userCompanyAction'
import AddInternshipPlaceDialog from './addInternshipPlaceDialog'
import ChangePlaceDialog from './change-place-dialog'
import InternshipPlaceItem from './internship-place-item'

const InternshipPlaces = ({userInfo, isAdmin}) => {
  const [addDialogIsOpen, setAddDialogIsOpen] = useState(false)
  const [changeCurrentDialogIsOpen, setChangeCurrentDialogIsOpen] = useState(false)
  const dispatch = useDispatch()

  const {isLoading, userCompanyMatching} = useSelector(state => state.userCompany)

  useEffect(() => {
    userInfo.id && dispatch(getMatchingUserList(userInfo.id))
  }, [userInfo.id])

  return (
    <>
      <Typography variant="h5" color="primary" mb={2}>
        Места стажировок
      </Typography>
      <Box sx={{position: 'relative', minHeight: '60px', display: 'flex'}}>
        {isLoading ? (
          <CircularLoader />
        ) : userCompanyMatching.length === 0 ? (
          <Box flexGrow="1" sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Typography>Студент не имеет мест стажировки</Typography>
          </Box>
        ) : (
          <Grid container spacing={1}>
            {userCompanyMatching.map(match => (
              <Grid key={match.company.id} item xs={12}>
                <InternshipPlaceItem place={match} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      {isAdmin ? (
        <>
          <Grid container spacing={2} justifyContent="space-around">
            <Grid item>
              <Button variant="outlined" onClick={() => setAddDialogIsOpen(true)}>
                Добавить
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                disabled={isLoading || [null, undefined, 0].includes(userCompanyMatching?.length)}
                onClick={() => setChangeCurrentDialogIsOpen(true)}
              >
                Поменять текущее
              </Button>
            </Grid>
          </Grid>
          <AddInternshipPlaceDialog
            isOpen={addDialogIsOpen}
            onClose={() => setAddDialogIsOpen(false)}
            studentId={userInfo.id}
          />
          <ChangePlaceDialog
            isOpen={changeCurrentDialogIsOpen}
            onClose={() => setChangeCurrentDialogIsOpen(false)}
            studentId={userInfo.id}
            places={userCompanyMatching}
          />
        </>
      ) : null}
    </>
  )
}

export default InternshipPlaces
