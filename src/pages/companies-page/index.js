import {Button, Grid, Typography} from '@mui/material'

import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {userRoles} from '../../common/constants.js'
import CompaniesItem from '../../components/companies-item/index.js'

import {useAuth} from '../../hooks/use-auth.js'
import {getAllCompanies} from '../../store/actions/companyAction.js'
import AddIcon from '@mui/icons-material/Add'

import AddCompanyDialog from './addCompanyDialog.js'
import CircularLoader from '../../components/common-components/CircularLoader.js'

const AllCompaniesPage = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const dispatch = useDispatch()

  const {userRole} = useAuth()
  const {isLoading, allCompanies} = useSelector(state => state.company)

  useEffect(() => {
    dispatch(getAllCompanies())
  }, [dispatch])

  if (isLoading) {
    return <CircularLoader />
  }

  return (
    <>
      <Typography variant="h3" mb={4}>
        Компании партнеры
      </Typography>
      <Grid container spacing={4}>
        {allCompanies?.map(item => (
          <Grid key={item.id} item xs={6}>
            <CompaniesItem company={item} />
          </Grid>
        ))}
      </Grid>
      {userRole === userRoles.admin && (
        <>
          <Button sx={{mt: 3}} variant="outlined" endIcon={<AddIcon />} onClick={() => setDialogIsOpen(true)}>
            Добавить компанию
          </Button>
          <AddCompanyDialog isOpen={dialogIsOpen} onClose={() => setDialogIsOpen(false)} />
        </>
      )}
    </>
  )
}

export default AllCompaniesPage
