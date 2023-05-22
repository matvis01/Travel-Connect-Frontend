import { useEffect, useLayoutEffect, useState } from "react"
import { Box } from "@mui/material"
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import api from "../api/api"
import { Filter } from "@mui/icons-material"

export default function FilterBar(props) {
  const { categories } = props
  const [currentCategory, setCurrentCategory] = useState({})
  const [currentTags, setCurrentTags] = useState([])

  useLayoutEffect(() => {
    props.applyFilters(currentCategory, currentTags)
  }, [currentCategory, currentTags])

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
