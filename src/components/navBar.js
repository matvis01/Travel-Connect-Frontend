import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Badge from "@mui/material/Badge"
import MenuItem from "@mui/material/MenuItem"
import Menu from "@mui/material/Menu"
import AccountCircle from "@mui/icons-material/AccountCircle"
import NotificationsIcon from "@mui/icons-material/Notifications"
import MoreIcon from "@mui/icons-material/MoreVert"
import { Button } from "@mui/material"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import api from "../api/api"

export default function NavBar() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [anchorNotification, setAnchorNotification] = useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)

  const router = useRouter()

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [numOfNewNotifications, setNumOfNewNotifications] = useState(0)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get("/Notification", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        setNotifications(res.data)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    setNumOfNewNotifications(0)
    notifications.forEach((notification) => {
      notification.isSeen || setNumOfNewNotifications((prev) => prev + 1)
    })
  }, [notifications])

  const handleNotificationsOpen = (event) => {
    setAnchorNotification(event.currentTarget)
    setIsNotificationsOpen(true)
  }

  const handleNotificationsClose = () => {
    setAnchorNotification(null)
    setIsNotificationsOpen(false)
  }
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  function logOut() {
    localStorage.removeItem("token")
    router.push("/SignIn")
  }

  const menuId = "primary-search-account-menu"
  const renderProfileMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          router.push("/profile")
        }}
      >
        Profile
      </MenuItem>
      <MenuItem onClick={logOut}>Log Out</MenuItem>
    </Menu>
  )

  // useEffect(() => { // na backu nie dziala
  //   async function setAsSeen() {
  //     try {
  //       const res = await api.post("/Notification", {
  //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //       })
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   }
  //   isNotificationsOpen || setAsSeen()
  // }, [isNotificationsOpen])

  function handleNotificationClicked(id) {
    console.log(id)
  }

  const renderNotificationsMenu = (
    <Menu
      anchorEl={anchorNotification}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isNotificationsOpen}
      onClose={handleNotificationsClose}
    >
      {notifications?.map((notification) => (
        <MenuItem
          key={notification.id}
          sx={{ backgroundColor: !notification.isSeen ? "white" : "gray" }}
          onClick={() => handleNotificationClicked(notification.id)}
        >
          {notification.topic}
        </MenuItem>
      ))}
    </Menu>
  )

  const mobileMenuId = "primary-search-account-menu-mobile"
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={handleNotificationsOpen}
        // disabled={numOfNewNotifications == 0}
      >
        <IconButton size="large" color="inherit">
          <Badge badgeContent={numOfNewNotifications} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  )

  return (
    <Box sx={{ flexGrow: 1, height: "64px" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Button
            variant="text"
            sx={{
              color: "white",
              fontSize: 18,
              w: 30,
              height: "64px",
              textDecorationLine: router.route == "/" && "underline",
              ":hover": { textDecorationLine: "underline" },
            }}
            href="/"
          >
            PLACES
          </Button>
          <Button
            variant="text"
            href="/events"
            sx={{
              color: "white",
              fontSize: 18,
              w: 30,
              textDecorationLine: router.route == "/events" && "underline",
              ":hover": { textDecorationLine: "underline" },
            }}
          >
            Events
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={handleNotificationsOpen}
              // disabled={numOfNewNotifications == 0}
            >
              <Badge badgeContent={numOfNewNotifications} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderProfileMenu}
      {renderNotificationsMenu}
    </Box>
  )
}
