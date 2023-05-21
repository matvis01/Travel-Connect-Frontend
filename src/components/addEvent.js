import React, { useEffect, useState, useMemo, useLayoutEffect } from "react"
import { Modal, Box, Typography, TextField, Button } from "@mui/material"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import api from "../api/api"
import Autocomplete from "@mui/material/Autocomplete"
import dayjs from "dayjs"

export default function AddEvent(props) {
  const [places, setPlaces] = useState([])
  const [thisEvent, setThisEvent] = useState({
    name: "",
    description: "",
    startsAt: "",
    endsAt: "",
    touristPlaceId: "",
  })

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const res = await api.post("/Events", thisEvent, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      props.handleClose(thisEvent)
    } catch (err) {
      console.log(err)
    }
  }

  const canSubmit = () => {
    if (
      thisEvent.name == "" ||
      thisEvent.startsAt == "" ||
      thisEvent.endsAt == "" ||
      thisEvent.touristPlaceId == ""
    ) {
      return false
    } else {
      return true
    }
  }

  useEffect(() => {
    async function fetchPlaces() {
      try {
        const res = await api.get("/TouristPlace", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        setPlaces(() => {
          return res.data.map((place) => {
            return {
              id: place.id,
              label: place.name,
            }
          })
        })
      } catch (err) {
        console.log(err)
      }
    }
    fetchPlaces()
  }, [])

  return (
    <>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            gap: "20px",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Event
          </Typography>
          <TextField
            id="Name"
            name="Name"
            label="Place name"
            variant="standard"
            onChange={(event) => {
              setThisEvent((prev) => ({ ...prev, name: event.target.value }))
            }}
            required
          />
          <TextField
            id="Description"
            name="Description"
            label="Description"
            variant="standard"
            onChange={(event) => {
              setThisEvent((prev) => ({
                ...prev,
                description: event.target.value,
              }))
            }}
            multiline
          />
          <Autocomplete
            disablePortal
            id="combo-box"
            options={places}
            disableClearable
            label="Place"
            name="Place"
            onChange={(event, newValue) => {
              setThisEvent((prev) => ({ ...prev, touristPlaceId: newValue.id }))
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                required
                label="Place"
              />
            )}
          />
          <Typography>starting date</Typography>
          <DateTimePicker
            format="DD/MM/YYYY HH:mm"
            minDateTime={dayjs()}
            onChange={(date) => {
              date = date.format("YYYY-MM-DDTHH:mm:ss.SSS+00:00")
              setThisEvent((prev) => ({ ...prev, startsAt: date }))
            }}
          />
          <Typography>ending date</Typography>
          <DateTimePicker
            format="DD/MM/YYYY HH:mm"
            ampmInClock={false}
            //value={dayjs(event?.startsAt)}
            minDateTime={dayjs(thisEvent?.startsAt)}
            onChange={(date) => {
              date = date.format("YYYY-MM-DDTHH:mm:ss.SSS+00:00")
              setThisEvent((prev) => ({ ...prev, endsAt: date }))
            }}
          />

          <Button type="submit" disabled={!canSubmit()}>
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  )
}
