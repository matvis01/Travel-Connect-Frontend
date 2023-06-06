import React, { useState, useEffect } from "react"
import NavBar from "../components/navBar"
import FilterBar from "../components/filterBar"
import api from "../api/api"
import EventCard from "@/components/eventCard"
import { Button, Container } from "@mui/material"
import AddEvent from "../components/addEvent"

export default function Events() {
  const [events, setEvents] = useState([])
  const [categories, setCategories] = useState()
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await api.get("/Category", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        setCategories(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchEvents()
  }, [])

  async function fetchEvents() {
    try {
      const res = await api.get("/Events", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {},
      })
      setEvents(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  async function generateReport() {
    try {
      const res = await api.post(
        "/Events/generate-report",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          //responseType: "blob", // Set the response type to 'blob' to receive binary data
        }
      )
      console.log(res)
      if (res.data.size == 0) {
        console.log("No data")
        return
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <NavBar />
      <FilterBar isPlacesPage={false} addEvents={setEvents} />
      <Button
        variant="contained"
        color="info"
        onClick={() => setAdding(true)}
        sx={{
          marginLeft: "auto",
          marginRight: "auto",
          display: "block",
          marginTop: "30px",
          marginBottom: "30px",
        }}
        title="Add a single event"
      >
        Add Event
      </Button>

      <Container
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          justifyContent: "center",
          justifyItems: "center",
          marginBottom: "30px",
          gap: "30px",
        }}
      >
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </Container>
      <Button
        variant="contained"
        color="primary"
        onClick={generateReport}
        sx={{
          marginLeft: "auto",
          marginRight: "auto",
          display: "block",
          marginTop: "20px",
          marginBottom: "20px",
        }}
        title="Press to generate report"
      >
        {/* idk gdzie to dac */}
        Generate Report
      </Button>
      <AddEvent
        open={adding}
        handleClose={() => {
          // setEvents([...events, thisEvent])
          fetchEvents()
          setAdding(false)
        }}
      />
    </>
  )
}
