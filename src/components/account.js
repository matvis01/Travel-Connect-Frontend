import * as React from "react"
import { Box, Button, TextField, Typography } from "@mui/material"
import { useState, useEffect } from "react"


export default function Account() {
  const [name, setName] = useState('Jakub');
  const [surname, setSurname] = useState('Gil');
  const [email, setEmail] = useState('jakub.gil@example.com');
  const [password, setPassword] = useState('');
  const [events, setEvents] = useState([
  {
  id: 1,
  title: 'Event 1',
  date: '2023-03-15',
  description: 'Description of event 1',
  },
  {
  id: 2,
  title: 'Event 2',
  date: '2023-04-20',
  description: 'Description of event 2',
  },
  ]);
  const [currentEvents, setCurrentEvents] = useState([
    {
      id: 1,
      title: 'Current Event 1',
      date: '2023-05-12',
      description: 'Description of current event',
      },
      {
        id: 2,
        title: 'Current Event 2',
        date: '2023-05-13',
        description: 'Description of current event',
        },
    ]);
  
  const handlePasswordChange = () => {
  //to do change user password logic
  };
  
  return (
  <Box sx={{ padding: 2 }}>
  <Typography variant="h4" sx={{ marginBottom: 2 }}>
  User Profile
  </Typography>
  <Box sx={{ marginBottom: 2 }}>
  <Typography variant="h6">Name</Typography>
  <Typography>{name}</Typography>
  </Box>
  <Box sx={{ marginBottom: 2 }}>
  <Typography variant="h6">Surname</Typography>
  <Typography>{surname}</Typography>
  </Box>
  <Box sx={{ marginBottom: 2 }}>
  <Typography variant="h6">Email address</Typography>
  <Typography>{email}</Typography>
  </Box>
  <Box sx={{ marginBottom: 2 }}>
  <Typography variant="h6">Password</Typography>
  <TextField
  type="password"
  label="Current password"
  sx={{ marginBottom: 1 }}
  />
  <TextField
  type="password"
  label="New password"
  sx={{ marginBottom: 1 }}
  />
  <TextField
  type="password"
  label="Confirm new password"
  sx={{ marginBottom: 1 }}
  />
  </Box>
  <Box sx={{ marginBottom: 2 }}>
  <Button variant="contained" onClick={handlePasswordChange}>
  Change password
        </Button>
  </Box>
  <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6">Your current events</Typography>
        {currentEvents.map(event => (
          <Box key={event.id} sx={{ marginBottom: 1 }}>
            <Typography variant="subtitle1">{event.title}</Typography>
            <Typography>{event.date}</Typography>
            <Typography>{event.description}</Typography>
          </Box>
        ))}
      </Box>
      <Box>
        <Typography variant="h6">Event history</Typography>
        {events.map(event => (
          <Box key={event.id} sx={{ marginBottom: 1 }}>
            <Typography variant="subtitle1">{event.title}</Typography>
            <Typography>{event.date}</Typography>
            <Typography>{event.description}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
