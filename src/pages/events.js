import React, { useState, useEffect } from "react"
import NavBar from "../components/navBar"
import FilterBar from "../components/filterBar"
import api from "../api/api"

export default function Events() {
  const [events, setEvents] = useState([])
  const [categories, setCategories] = useState()

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
      console.log(res.data)
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
          // fetchEvents(c, t)
        }}
      />
    </>
  )
}
