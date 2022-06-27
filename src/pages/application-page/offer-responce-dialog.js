import {Button, Dialog, DialogContent, Slide, DialogTitle, DialogContentText, DialogActions} from '@mui/material'
import {forwardRef, useEffect, useState} from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import {useDispatch} from 'react-redux'
import {editJobApplication, setApplicationStudentStatus} from '../../store/actions/jobApplicationAction'
import {applicationStates} from '../../common/constants'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const OfferResponseDialog = ({isOpen, onClose, update, application, actionType}) => {
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()
  // const {isLoadingEditData, vacancyEditData} = useSelector(state => state.vacancy)

  const handleClose = () => {
    onClose()
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    const form = {
      status: actionType === 'submit' ? applicationStates.submited : applicationStates.rejected,
      id: application.id,
    }
    const {ok} = await dispatch(setApplicationStudentStatus(form))
    setIsLoading(false)
    if (ok) {
      update()
      handleClose()
    }
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth={true} maxWidth="sm" TransitionComponent={Transition}>
      <DialogTitle>{actionType === 'submit' ? 'Принять предложение?' : 'Отклонить принятие?'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {actionType === 'submit'
            ? 'Вы хотите принять предложение о стажировке по данной вакансии?'
            : 'Вы хотите принять отклонить о стажировке по данной вакансии?'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isLoading}>
          Отмена
        </Button>
        <Button onClick={handleSubmit} disabled={isLoading}>
          Подтвердить
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default OfferResponseDialog
