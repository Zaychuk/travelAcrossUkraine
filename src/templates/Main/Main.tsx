import React, { FC } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MapIcon from '@mui/icons-material/Map'
import CollectionsIcon from '@mui/icons-material/Collections'
import CategoryIcon from '@mui/icons-material/Category'
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation'
import HomeIcon from '@mui/icons-material/Home'
import GroupIcon from '@mui/icons-material/Group'
import LogoutIcon from '@mui/icons-material/Logout'
import { Link, Outlet } from 'react-router-dom'

const drawerWidth = 200

const Main: FC = () => {
  const userRole = localStorage.getItem('role')
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position='fixed' sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>
            екоМандри
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
        variant='permanent'
      >
        <Toolbar />
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to='/'>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary='Головна' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to='/map'>
              <ListItemIcon>
                <MapIcon />
              </ListItemIcon>
              <ListItemText primary='Карта' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to='/collections'>
              <ListItemIcon>
                <CollectionsIcon />
              </ListItemIcon>
              <ListItemText primary='Колекції' />
            </ListItemButton>
          </ListItem>
          {userRole === 'Admin' && (
            <React.Fragment>
              <ListItem disablePadding>
                <ListItemButton component={Link} to='/categories'>
                  <ListItemIcon>
                    <CategoryIcon />
                  </ListItemIcon>
                  <ListItemText primary='Категорії' />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to='/locations'>
                  <ListItemIcon>
                    <NotListedLocationIcon />
                  </ListItemIcon>
                  <ListItemText primary='Нові локації' />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to='/users'>
                  <ListItemIcon>
                    <GroupIcon />
                  </ListItemIcon>
                  <ListItemText primary='Користувачі' />
                </ListItemButton>
              </ListItem>
            </React.Fragment>
          )}
        </List>
        <Divider />
        <List sx={{ marginTop: 'auto' }}>
          <ListItem disablePadding>
            <ListItemButton component={Link} to='/sign-in'>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary='Вийти' />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component='main' sx={{ flexGrow: 1 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}

Main.displayName = 'Main'

export { Main }
