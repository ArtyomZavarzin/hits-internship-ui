import {Button} from '@mui/material'
import {styled} from '@mui/system'

const StyledButton = styled(Button)(({theme}) => ({
  borderRadius: '50px',
  padding: '5px 15px',
}))

const RoundedButton = ({onClick, children, variant = 'outlined', size = 'small'}) => {
  return (
    <StyledButton size={size} variant={variant} onClick={onClick}>
      {children}
    </StyledButton>
  )
}

export default RoundedButton
