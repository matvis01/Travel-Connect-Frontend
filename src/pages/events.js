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
    //fetchCategories()
  }, [])

  async function fetchEvents(category = {}, tags = []) {
    try {
      const res = await api.get("/Events", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          CategoryId: category?.id,
          FilterValueId: tags[0],
        },
      })
      setEvents(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <NavBar />
      {/* <FilterBar
        categories={categories}
        changePlaces={(elements) => setPlaces(elements)}
        applyFilters={(c, t) => {
          // fetchEvents(c, t)
        }}
      /> */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setAdding(true)}
      >
        Add Event
      </Button>
      <AddEvent
        open={adding}
        handleClose={(thisEvent) => {
          setEvents([...events, thisEvent])
          setAdding(false)
        }}
      />
      <Container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          margin: "10px",
          padding: "10px",
          gap: "10px",
        }}
      >
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </Container>
    </>
  )
}
