import React, { useState, useEffect, useMemo } from "react"
import NavBar from "../components/navBar"
import AddPlace from "../components/addPlace"
import PlaceCard from "../components/placeCard"
import FilterBar from "../components/filterBar"
import { Button, Container } from "@mui/material"
import api from "../api/api"

export default function Home() {
  const [addPlace, setAddPlace] = useState(false)
  const [categories, setCategories] = useState()
  const [places, setPlaces] = useState([])
  const handleOpen = () => setAddPlace(true)
  const handleClose = (place) => {
    //setPlaces((prev) => [place, ...prev])
    setAddPlace(false)
  }

  return (
    <>
      <NavBar />
      <FilterBar
        // categories={categories}
        // applyFilters={(c, t) => {
        //   fetchPlaces(c, t)
        // }}
        // placesNames={names}
        isPlacesPage={true}
        addPlaces={setPlaces}
      />
      <Button
        color="info"
        onClick={handleOpen}
        variant="contained"
        sx={{
          marginLeft: "auto",
          marginRight: "auto",
          display: "block",
          marginTop: "20px",
        }}
        title="Add a single place"
      >
        add place
      </Button>

      <Container
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          justifyContent: "center",
          marginBottom: "10px",
          marginTop: "0px",
          width: "100%",
          gap: "30px",
          pt: "30px",
        }}
      >
        <AddPlace
          open={addPlace}
          handleClose={handleClose}
          categories={categories}
          setPlaces={setPlaces}
        />
        {places?.length > 0 &&
          places.map((place) => <PlaceCard key={place.id} place={place} />)}
      </Container>
      <div className="abstract-shape"></div>
    </>
  )
}
