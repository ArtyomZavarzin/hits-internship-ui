import {Button, Card, CardActions, CardContent, Typography} from '@mui/material'
import {styled} from '@mui/system'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../../hooks/use-auth'
import RoundedButton from '../common-components/RoundedButton'

const StyledCard = styled(Card)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  '& .MuiCardContent-root': {
    flexGrow: 1,
  },
  height: '100%',
  // background: 'rgba(255, 255, 255, 0.2)',
  // backdropFilter: 'blur(5px)',
  transition: 'all 0.15s',
  '&:hover': {
    backgroundColor: '#fcfcfc',
    transform: 'scale(1.05)',
    // transform: 'translateX(8px) translateY(-8px)',
    // boxShadow: `-1px 1px #ededed, -2px 2px #ededed, -3px 3px #ededed, -4px 4px #ededed, -5px 5px #ededed, -6px 6px #ededed, -7px 7px #ededed, -8px 8px #ededed`,
    // boxShadow: (() => {
    //   const shadows = []
    //   for (let i = 0; i < 8; i++) {
    //     shadows.push(`-${i + 1}px ${i + 1}px #f5f5f7`)
    //   }
    //   return shadows.join(', ')
    // })(),
  },
}))

const CompaniesItem = ({company}) => {
  const navigate = useNavigate()
  const {companyId} = useAuth()

  const handleClick = () => {
    if (companyId === company.id) {
      navigate('/profile')
    } else {
      navigate(`${company.id}`)
    }
  }

  return (
    <StyledCard variant="outlined">
      <CardContent>
        <Typography gutterBottom variant="h4">
          {company.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: '3',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {company.description}
        </Typography>
      </CardContent>
      <CardActions>
        <RoundedButton onClick={handleClick}>Подробнее</RoundedButton>
      </CardActions>
    </StyledCard>
  )
}

export default CompaniesItem
