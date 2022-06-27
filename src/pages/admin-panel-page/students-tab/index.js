import {Table, TableBody, TableContainer, TableHead, TableRow, Typography, TableCell, Button} from '@mui/material'
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import CircularLoader from '../../../components/common-components/CircularLoader.js'
import {getAllStudents} from '../../../store/actions/userAction.js'
import {styled} from '@mui/material/styles'
import {Link} from 'react-router-dom'

const StyledTableRow = styled(TableRow)(({theme}) => ({
  backgroundColor: 'transparent',
  transition: 'all 0.15s',
  '&:hover': {
    backgroundColor: 'white',
  },
}))

const StudentsTab = () => {
  const dispatch = useDispatch()

  const {isLoading, allStudents} = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getAllStudents())
  }, [dispatch])

  if (isLoading) {
    return <CircularLoader />
  }

  return (
    <>
      <TableContainer>
        <Table sx={{minWidth: 700}}>
          <TableHead>
            <TableRow sx={{backgroundColor: '#f5f5f7'}}>
              <TableCell>Полное имя</TableCell>
              <TableCell align="right">Курс</TableCell>
              <TableCell align="right">Текущая компания</TableCell>
              <TableCell align="right">Дополнительно</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allStudents.map(row => (
              <StyledTableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {`${row.surname} ${row.middleName} ${row.name}`}
                </TableCell>
                <TableCell align="right">{row.yearOfEducation}</TableCell>
                <TableCell align="right">
                  {row.userCompanies && row.userCompanies.length !== 0
                    ? row.userCompanies.find(el => el.isCurrent)?.company.name
                    : '-'}
                </TableCell>
                <TableCell align="right">
                  <Button component={Link} to={`/student/${row.id}`}>
                    Подробнее
                  </Button>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default StudentsTab
