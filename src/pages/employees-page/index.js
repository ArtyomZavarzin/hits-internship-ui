import {Table, TableBody, TableContainer, TableHead, TableRow, Typography, TableCell, Button} from '@mui/material'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import CircularLoader from '../../components/common-components/CircularLoader.js'
import {styled} from '@mui/material/styles'
import {Link, useParams} from 'react-router-dom'
import {getMatchingCompanyList} from '../../store/actions/userCompanyAction'
import {useAuth} from '../../hooks/use-auth.js'
import {userRoles} from '../../common/constants.js'

const StyledTableRow = styled(TableRow)(({theme}) => ({
  backgroundColor: 'transparent',
  transition: 'all 0.15s',
  '&:hover': {
    backgroundColor: 'white',
  },
}))

const EmployeesPage = () => {
  const [id, setId] = useState(null)
  const dispatch = useDispatch()

  const {companyId, userRole} = useAuth()
  const {id: companyParamsId} = useParams()
  const {isLoading, userCompanyMatching} = useSelector(state => state.userCompany)

  useEffect(() => {
    if (userRole === userRoles.company) {
      setId(companyId)
    } else if (userRole === userRoles.admin) {
      setId(companyParamsId)
    }
  }, [companyId, companyParamsId, userRole])

  useEffect(() => {
    id && dispatch(getMatchingCompanyList(id))
  }, [id])

  // const dispatch = useDispatch()

  // const {id: companyId} = useParams()
  // const {isLoading, userCompanyMatching} = useSelector(state => state.userCompany)

  // useEffect(() => {
  //   companyId && dispatch(getMatchingCompanyList(companyId))
  // }, [companyId])

  if (isLoading) {
    return <CircularLoader />
  }

  return (
    <>
      <Typography variant="h3" mb={4}>
        Стажеры компании
      </Typography>
      <TableContainer>
        <Table sx={{minWidth: 700}}>
          <TableHead>
            <TableRow sx={{backgroundColor: '#f5f5f7'}}>
              <TableCell>Полное имя</TableCell>
              <TableCell align="right">Текущий стажер</TableCell>
              <TableCell align="right">Дополнительно</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userCompanyMatching.map((row, index) => (
              <StyledTableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.user.fullName}
                </TableCell>
                <TableCell align="right">{row.isCurrent ? 'Да' : 'Нет'}</TableCell>
                <TableCell align="right">
                  <Button component={Link} to={`/student/${row.user.id}`}>
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

export default EmployeesPage
