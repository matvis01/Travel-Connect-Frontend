import * as React from "react"
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from "@mui/material"
import { useState, useEffect } from "react"

import api from "../api/api"
export default function Account() {
  const [name, setName] = useState("Jakub")
  const [surname, setSurname] = useState("Gil")
  const [email, setEmail] = useState("jakub.gil@example.com")
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [isError, setIsError] = useState(false)
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get("/Account", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        setName(res.data.firstName)
        setSurname(res.data.lastName)
        setEmail(res.data.email)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  const handlePasswordChange = async () => {
    try {
      const res = await api.put(
        "/Users/change-password",
        {
          oldPassword: password,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      console.log(res)
      setIsError(false)
    } catch (err) {
      setIsError(true)
      console.log(isError)
      setPassword("")
      //tutaj
    }
  }

  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: "#E8F1F8",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          marginBottom: 5,
          marginTop: 5,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        User Profile
      </Typography>
      <Box
        sx={{
          marginBottom: 2,
          padding: 2,
          border: "1px solid #CCCCCC",
          backgroundColor: "#F7F7F7",
          borderRadius: "4px",
        }}
      >
        <Typography variant="h6">Name</Typography>
        <Typography>{name}</Typography>
      </Box>
      <Box
        sx={{
          marginBottom: 2,
          padding: 2,
          border: "1px solid #CCCCCC",
          backgroundColor: "#F7F7F7",
          borderRadius: "4px",
        }}
      >
        <Typography variant="h6" sx={{}}>
          Surname
        </Typography>
        <Typography>{surname}</Typography>
      </Box>
      <Box
        sx={{
          marginBottom: 2,
          padding: 2,
          border: "1px solid #CCCCCC",
          backgroundColor: "#F7F7F7",
          borderRadius: "4px",
        }}
      >
        <Typography variant="h6" sx={{}}>
          Email address
        </Typography>
        <Typography>{email}</Typography>
      </Box>
      <Box
        sx={{
          marginBottom: 2,
          padding: 2,
          border: "1px solid #CCCCCC",
          backgroundColor: "#F7F7F7",
          borderRadius: "4px",
        }}
      >
        <Typography variant="h6" sx={{}}>
          Password
        </Typography>
        <TextField
          error={isError}
          helperText={isError ? "Wrong current password!" : ""}
          type="password"
          label="Current password"
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          sx={{ marginBottom: 1, width: "100%" }}
        />
        <TextField
          type="password"
          label="New password"
          onChange={(e) => {
            setNewPassword(e.target.value)
          }}
          sx={{ marginBottom: 1, width: "100%" }}
        />
        <TextField
          type="password"
          label="Confirm new password"
          onChange={(e) => {
            setNewPassword(e.target.value)
          }}
          sx={{ marginBottom: 1, width: "100%" }}
        />
        <Button
          variant="contained"
          onClick={handlePasswordChange}
          sx={{
            "&:active": {
              transform: "scale(0.98)",
              boxShadow: "none",
            },
          }}
        >
          Change password
        </Button>
      </Box>
    </Box>
  )
}
