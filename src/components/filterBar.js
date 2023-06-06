import { useEffect, useLayoutEffect, useState, useMemo } from "react"
import { Box } from "@mui/material"
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  TextField,
} from "@mui/material"
import api from "../api/api"
import { Filter } from "@mui/icons-material"

export default function FilterBar(props) {
  const [currentCategory, setCurrentCategory] = useState({})
  const [currentTags, setCurrentTags] = useState([])
  const [places, setPlaces] = useState([])
  const [categories, setCategories] = useState([])
  const [currentName, setCurrentName] = useState("")
  const [events, setEvents] = useState([])
  async function fetchPlaces() {
    try {
      const res = await api.get("/TouristPlace", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          CategoryId: currentCategory?.id,
          FilterValueId: currentTags[0],
          Name: currentName,
        },
      })
      setPlaces(res.data)
      props.addPlaces(res.data)
    } catch (err) {
      console.log(err)
    }
  }
  async function fetchEvents() {
    try {
      const res = await api.get("/Events", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          CategoryId: currentCategory?.id,
          FilterValueId: currentTags[0],
          Name: currentName,
        },
      })
      setEvents(res.data)

      props.addEvents(res.data)
    } catch (err) {
      console.log(err)
    }
  }
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

    fetchCategories()
    fetchPlaces()
  }, [])

  useEffect(() => {
    props.isPlacesPage ? fetchPlaces() : fetchEvents()
  }, [currentCategory, currentTags, currentName])

  const names = useMemo(() => {
    if (props.isPlacesPage) return places?.map((place) => place.name)
    else {
      let e = events?.map((event) => event.name)
      let p = places?.map((place) => place.name)
      return [...e, ...p]
    }
  }, [places])

  const filters = currentCategory?.filters?.map((filter, index) => (
    <FormControl sx={{ minWidth: 120, m: 1 }} key={filter.id}>
      <InputLabel id="filter">{filter.name}</InputLabel>
      <Select
        id={`filter-${filter.id}`}
        label={`filter-${filter.id}`}
        disabled={filter.values == undefined}
        onChange={(event) => {
          setCurrentTags((prev) => {
            const updatedTags = [...prev]
            updatedTags[index] = event.target.value
            return updatedTags
          })
        }}
      >
        {filter.values?.map((tag, i) => {
          return (
            <MenuItem value={tag.id} key={i}>
              {tag.value}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  ))
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        overflowX: "auto",
        px: "30px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Autocomplete
        disablePortal
        options={names}
        label="Name"
        name="Name"
        onChange={(event, newValue) => {
          setCurrentName(newValue)
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            required
            label="Name"
            sx={{ width: "auto", minWidth: 120, m: 1 }}
          />
        )}
      />
      {categories != null && (
        <FormControl sx={{ m: 1, minWidth: 120, width: "auto" }}>
          <InputLabel id="category">Category</InputLabel>
          <Select
            labelId="category"
            id="category"
            label="category"
            sx={{ width: "auto" }}
            onChange={(event) => {
              setCurrentTags([])
              setCurrentCategory(event.target.value)
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {categories?.map((category) => (
              <MenuItem key={category.id} value={category}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {filters}
    </Box>
  )
}
