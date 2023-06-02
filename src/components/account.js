import * as React from "react"
import { Box, Button, TextField, Typography } from "@mui/material"
import { useState, useEffect } from "react"
import api from "../api/api"
export default function Account() {
  const [name, setName] = useState("Jakub")
  const [surname, setSurname] = useState("Gil")
  const [email, setEmail] = useState("jakub.gil@example.com")
  const [password, setPassword] = useState("")
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Event 1",
      date: "2023-03-15",
      description: "Description of event 1",
    },
    {
      id: 2,
      title: "Event 2",
      date: "2023-04-20",
      description: "Description of event 2",
    },
  ])
  const [currentEvents, setCurrentEvents] = useState([
    {
      id: 1,
      title: "Current Event 1",
      date: "2023-05-12",
      description: "Description of current event",
    },
    {
      id: 2,
      title: "Current Event 2",
      date: "2023-05-13",
      description: "Description of current event",
    },
  ])

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

  const handlePasswordChange = () => {
    //to do change user password logic
  }

  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: "#E8F1F8",
      }}
    >
      <Typography variant="h3" sx={{ marginBottom: 5, marginTop: 5, textAlign: "center", fontWeight: "bold" }}>
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
        <Typography variant="h6" sx={{  }}>
          Name
        </Typography>
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
        <Typography variant="h6" sx={{  }}>
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
        <Typography variant="h6" sx={{  }}>
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
  <Typography variant="h6" sx={{  }}>
    Password
  </Typography>
  <TextField
    type="password"
    label="Current password"
    sx={{ marginBottom: 1, width: "100%" }}
  />
  <TextField
    type="password"
    label="New password"
    sx={{ marginBottom: 1, width: "100%" }}
  />
  <TextField
    type="password"
    label="Confirm new password"
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

      <Box
        sx={{
          marginBottom: 2,
          padding: 2,
          border: "1px solid #CCCCCC",
          backgroundColor: "#F7F7F7",
          borderRadius: "4px",
        }}
      >
        <Typography variant="h6">Your current events</Typography>
        {currentEvents.map((event) => (
          <Box key={event.id} sx={{ marginBottom: 1 }}>
            <Typography variant="subtitle1">{event.title}</Typography>
            <Typography>{event.date}</Typography>
            <Typography>{event.description}</Typography>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          padding: 2,
          border: "1px solid #CCCCCC",
          backgroundColor: "#F7F7F7",
          borderRadius: "4px",
        }}
      >
        <Typography variant="h6">Event history</Typography>
        {events.map((event) => (
          <Box key={event.id} sx={{ marginBottom: 1 }}>
            <Typography variant="subtitle1">{event.title}</Typography>
            <Typography>{event.date}</Typography>
            <Typography>{event.description}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
