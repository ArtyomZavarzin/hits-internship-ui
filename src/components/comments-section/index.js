import {Divider, Grid, Button, MobileStepper, Paper, Rating, TextField, Typography} from '@mui/material'
import {Box} from '@mui/system'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getCompanyReviews} from '../../store/actions/reviewsActions'
import CircularLoader from '../common-components/CircularLoader'
import CommentItem from './comment-item'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NewComment from './new-coment'
import {useAuth} from '../../hooks/use-auth'
import {userRoles} from '../../common/constants'

const commentMock = [
  {
    id: 0,
    rating: 3,
    user: {
      id: 0,
      email: 'string',
      fullName: 'Vasya fk jkl',
    },
    companyName: 'string',
    text: 'fsad fsdf sf ssfds',
    approvalState: 1,
  },
  {
    id: 1,
    rating: 5,
    user: {
      id: 2,
      email: 'string',
      fullName: 'petya fhdjsfs fddfsfdss',
    },
    companyName: 'string',
    text: 'fsd fsd fsd fs fsjdkfjlkfjsdlf klfjsdlkfj sflksdjflks f flkds fjlksd flkfj slkfsd jff djklf sdfld',
    approvalState: 1,
  },
  {
    id: 10,
    rating: 5,
    user: {
      id: 2,
      email: 'string',
      fullName: 'petya fhdjsfs fddfsfdss',
    },
    companyName: 'string',
    text: 'fsd fsd fsd fs fsjdkfjlkfjsdlf klfjsdlkfj sflksdjflks f flkds fjlksd flkfj slkfsd jff djklf sdfld',
    approvalState: 1,
  },
  {
    id: 14,
    rating: 5,
    user: {
      id: 2,
      email: 'string',
      fullName: 'petya fhdjsfs fddfsfdss',
    },
    companyName: 'string',
    text: 'fsd fsd fsd fs fsjdkfjlkfjsdlf klfjsdlkfj sflksdjflks f flkds fjlksd flkfj slkfsd jff djklf sdfld',
    approvalState: 1,
  },
  {
    id: 16,
    rating: 5,
    user: {
      id: 2,
      email: 'string',
      fullName: 'petya fhdjsfs fddfsfdss',
    },
    companyName: 'string',
    text: 'fsd fsd fsd fs fsjdkfjlkfjsdlf klfjsdlkfj sflksdjflks f flkds fjlksd flkfj slkfsd jff djklf sdfld',
    approvalState: 1,
  },
]

const CommentsSection = ({companyId}) => {
  const [creatingState, setCreatingState] = useState(false)

  const dispatch = useDispatch()
  const {isLoading, companyReviews} = useSelector(state => state.reviews)

  const {userRole} = useAuth()

  useEffect(() => {
    dispatch(getCompanyReviews(companyId))
  }, [dispatch])

  return (
    <Paper variant="outlined" sx={{position: 'relative', width: '360px'}}>
      <Typography variant="h5" sx={{p: 2}}>
        Отзывы
      </Typography>
      <Divider />
      <Box sx={{minHeight: '250px', position: 'relative', maxHeight: '300px', overflow: 'auto'}}>
        {isLoading ? (
          <CircularLoader />
        ) : (
          <Box
            sx={{
              m: 2,
              position: 'relative',
              minHeight: '218px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {companyReviews.length === 0 ? (
              <Box flexGrow="1" sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Typography>На данный момент отзывов нет</Typography>
              </Box>
            ) : (
              <>
                <Grid container spacing={1} sx={{flexGrow: 1}}>
                  {companyReviews.map(comment => (
                    <Grid key={comment.id} item xs={12}>
                      <CommentItem commentItem={comment} />
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
            {userRole === userRoles.student ? (
              <Button
                sx={{
                  width: '100%',
                  mt: 2,
                  position: 'sticky',
                  bottom: '16px',
                  left: '0',
                  right: '0',
                }}
                variant="contained"
                onClick={() => setCreatingState(true)}
              >
                Оставить свой отзыв
              </Button>
            ) : null}
          </Box>
        )}
      </Box>
      {/* <Divider /> */}
      {creatingState && <NewComment onCancel={() => setCreatingState(false)} companyId={companyId} />}
    </Paper>
  )
}

export default CommentsSection
