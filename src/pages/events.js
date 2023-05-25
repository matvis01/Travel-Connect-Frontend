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
          // CategoryId: category?.id,
          // FilterValueId: tags[0],
        },
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
      // const url = window.URL.createObjectURL(new Blob([res.data]))

      // const link = document.createElement("a")
      // link.href = url
      // link.setAttribute("download", "report.pdf") // Set the desired file name
      // document.body.appendChild(link)
      // link.click()

      // document.body.removeChild(link)
      // window.URL.revokeObjectURL(url)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <NavBar />
      <FilterBar
        // categories={categories}
        // changePlaces={(elements) => setPlaces(elements)}
        applyFilters={(c, t) => {
          // fetchEvents(c, t)
        }}
      />
                  <Button variant="contained" color="primary" onClick={generateReport}
                    sx={{
                      marginLeft: "auto",
                      marginRight: "auto",
                      display: "block",
                      marginTop: "20px",
                      marginBottom: "20px",
                    }}>
        {/* idk gdzie to dac */}
        Generate Report
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
        color="info"
        onClick={() => setAdding(true)}
        sx={{
          marginLeft: "auto",
          marginRight: "auto",
          display: "block",
          marginTop: "10px",
          marginBottom: "30px",
        }}
      >
      Add Event
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
