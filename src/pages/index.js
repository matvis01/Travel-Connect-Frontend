import React, { useState, useEffect } from "react"
import NavBar from "../components/navBar"
import AddPlace from "../components/addPlace"
import PlaceCard from "../components/placeCard"
import FilterBar from "../components/filterBar"
import { Button, Container } from "@mui/material"
import api from "../api/api"

export default function Home() {
  const [addPlace, setAddPlace] = useState(false)
  const handleOpen = () => setAddPlace(true)
  const handleClose = () => setAddPlace(false)
  const [categories, setCategories] = useState()
  const [places, setPlaces] = useState([])

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

    fetchPlaces()
    fetchCategories()
  }, [])

  async function fetchPlaces(category = {}, tags = []) {
    try {
      const res = await api.get("/TouristPlace", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          CategoryId: category?.id,
          FilterValueId: tags[0],
        },
      })
      setPlaces(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <NavBar />
      <FilterBar
        categories={categories}
        changePlaces={(elements) => setPlaces(elements)}
        applyFilters={(c, t) => {
          fetchPlaces(c, t)
        }}
      />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "100px",
          marginTop: "0px",
          width: "100%",
          gap: "30px",
          pt: "30px",
        }}
      >
        <div className="addCard">
          <Button onClick={handleOpen} variant="contained">
            add place
          </Button>
        </div>
        <AddPlace
          open={addPlace}
          handleClose={handleClose}
          categories={categories}
        />
        {places?.length > 0 &&
          places.map((place) => <PlaceCard key={place.id} place={place} />)}
      </Container>
    </>
  )
}
