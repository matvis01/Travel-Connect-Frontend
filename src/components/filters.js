import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material"
import FilterListIcon from "@mui/icons-material/FilterList"
import { useState } from "react"

const FilterBar = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [checked, setChecked] = useState({
    filter1: true,
    filter2: true,
    filter3: true,
  })

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleFilterClose = () => {
    setAnchorEl(null)
  }

  const handleFilterChange = (event) => {
    setChecked({ ...checked, [event.target.name]: event.target.checked })
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Page Title</Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="filter"
            onClick={handleFilterClick}
          >
            <FilterListIcon />
          </IconButton>
          <Menu
            id="filter-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleFilterClose}
          >
            <MenuItem>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked.filter1}
                    onChange={handleFilterChange}
                    name="filter1"
                  />
                }
                label="Filter 1"
              />
            </MenuItem>
            <MenuItem>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked.filter2}
                    onChange={handleFilterChange}
                    name="filter2"
                  />
                }
                label="Filter 2"
              />
            </MenuItem>
            <MenuItem>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked.filter3}
                    onChange={handleFilterChange}
                    name="filter3"
                  />
                }
                label="Filter 3"
              />
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default FilterBar
