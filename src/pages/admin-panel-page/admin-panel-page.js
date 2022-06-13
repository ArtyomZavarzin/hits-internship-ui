import {Box, Grid} from '@mui/material'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import {useState} from 'react'
import {styled} from '@mui/system'
import StudentsTab from './students-tab'
import WhitelistTab from './whitelist-tab'

const StyledTab = styled(Tab)(({theme}) => ({
  width: 'fit-content',
  marginLeft: 'auto',
  textAlign: 'end',
}))

const StyledPanelTab = styled(Box)(({theme}) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
}))

function TabPanel(props) {
  const {children, value, index, ...other} = props

  return (
    <StyledPanelTab
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </StyledPanelTab>
  )
}

const a11yProps = index => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}

const AdminPanelPage = () => {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <>
      <Typography variant="h3" mb={6}>
        Панель управления
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{borderRight: 1, borderColor: 'divider'}}
          >
            <StyledTab label="Все студенты" {...a11yProps(0)} sx={{width: 'fit-content', ml: 'auto'}} />
            <StyledTab label="Новые заявки" {...a11yProps(1)} sx={{alignItems: 'end'}} />
            <StyledTab label="Одобрение комментариев" {...a11yProps(2)} sx={{alignItems: 'end'}} />
          </Tabs>
        </Grid>
        <Grid item xs={9}>
          <TabPanel value={value} index={0}>
            <StudentsTab />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <WhitelistTab />
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
          <TabPanel value={value} index={3}>
            Item Four
          </TabPanel>
          <TabPanel value={value} index={4}>
            Item Five
          </TabPanel>
          <TabPanel value={value} index={5}>
            Item Six
          </TabPanel>
          <TabPanel value={value} index={6}>
            Item Seven
          </TabPanel>
        </Grid>
      </Grid>
    </>
  )
}

export default AdminPanelPage
