import React, { useState } from "react"
import NavBar from "../components/navBar"
import AddPlace from "../components/addPlace"
import { Button } from "@mui/material"

export default function Home() {
  const [addPlace, setAddPlace] = useState(false)
  const handleOpen = () => setAddPlace(true)
  const handleClose = () => setAddPlace(false)
//test
  return (
    <>
      <NavBar />
      <Button onClick={handleOpen}>add place</Button>
      <AddPlace open={addPlace} handleClose={handleClose} />
    </>
  )
}
