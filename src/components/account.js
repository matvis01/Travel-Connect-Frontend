import * as React from "react"
import { Box, Button, TextField, Typography } from "@mui/material"
import { useState, useEffect } from "react"


export default function Account() {
  const [name, setName] = useState('Jan Kowalski');
  const [email, setEmail] = useState('jan.kowalski@example.com');
  const [password, setPassword] = useState('');
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Wydarzenie 1',
      date: '2023-05-15',
      description: 'Opis wydarzenia 1',
    },
    {
      id: 2,
      title: 'Wydarzenie 2',
      date: '2023-05-20',
      description: 'Opis wydarzenia 2',
    },
  ]);

  const handlePasswordChange = () => {
    //to do change user password logic 
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Profil użytkownika
      </Typography>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6">Imię i nazwisko</Typography>
        <Typography>{name}</Typography>
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6">Adres e-mail</Typography>
        <Typography>{email}</Typography>
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6">Zmiana hasła</Typography>
        <TextField
          type="password"
          label="Aktualne hasło"
          sx={{ marginBottom: 1 }}
        />
        <TextField
          type="password"
          label="Nowe hasło"
          sx={{ marginBottom: 1 }}
        />
        <TextField
          type="password"
          label="Potwierdź nowe hasło"
          sx={{ marginBottom: 1 }}
        />
        <Button variant="contained" onClick={handlePasswordChange}>
          Zmień hasło
        </Button>
      </Box>
      <Box>
        <Typography variant="h6">Historia eventów</Typography>
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
