import {Container, Typography} from '@mui/material'
import {Box} from '@mui/system'

const Footer = () => {
  return (
    <Box sx={{backgroundColor: '#000', color: '#d2d2d7'}}>
      <Container sx={{my: 3}} maxWidth="lg">
        <Typography variant="body2">Российская Федерация, 634050, г. Томск, пр. Ленина, 36, корпус №2</Typography>
      </Container>
    </Box>
  )
}

export default Footer
