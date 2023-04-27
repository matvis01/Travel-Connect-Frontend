import React, { useState } from "react"
import NavBar from "../components/navBar"
import AddPlace from "../components/addPlace"
import EventCard from "../components/eventCard"
import FilterBar from "../components/filterBar"
import { Button, Container } from "@mui/material"

export default function Home() {
  const [addPlace, setAddPlace] = useState(false)
  const handleOpen = () => setAddPlace(true)
  const handleClose = () => setAddPlace(false)
  //test commit
  return (
    <>
      <NavBar />
      <FilterBar />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "100px",
          width: "100%",
        }}
      >
        <div className="addCard">
          <Button className="addButton" onClick={handleOpen}>
            add place
          </Button>
        </div>
        <AddPlace open={addPlace} handleClose={handleClose} />
        <EventCard />
        <EventCard />
        <EventCard />
      </Container>
    </>
  )
}
