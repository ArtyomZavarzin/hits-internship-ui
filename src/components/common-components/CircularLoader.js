import {CircularProgress, Box} from '@mui/material'

const CircularLoader = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        mr: '-50%',
        transform: 'translate(-50%, -50%)',
        color: 'black',
      }}
    >
      <CircularProgress
        sx={{
          color: 'black',
        }}
      />
    </Box>
  )
}

export default CircularLoader
