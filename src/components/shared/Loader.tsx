import { Backdrop, CircularProgress, Paper } from '@mui/material'

export default function Loader() {
  return (
    <Backdrop open sx={{ zIndex: 99999 }}>
      <Paper sx={{ p: 6 }}>
        <CircularProgress color='primary' />
      </Paper>
    </Backdrop>
  )
}