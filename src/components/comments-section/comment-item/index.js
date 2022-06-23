import {Box, Divider, Grid, Paper, Rating, Typography} from '@mui/material'

const CommentItem = ({commentItem}) => {
  return (
    <Box>
      <Grid container justifyContent="space-between" alignItems="center" spacing={1} wrap="nowrap">
        <Grid item>
          <Typography variant="subtitle2" component="span">
            {commentItem.user?.fullName}
          </Typography>
        </Grid>
        <Grid item>
          <Rating value={commentItem.rating} readOnly size="small" sx={{verticalAlign: 'middle'}} />
        </Grid>
      </Grid>

      <Typography variant="body1">{commentItem.text}</Typography>
    </Box>
  )
}

export default CommentItem
