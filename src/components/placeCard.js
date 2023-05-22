import * as React from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { Button, CardActionArea, CardActions } from "@mui/material"
import { useRouter } from "next/router"

export default function PlaceCard(props) {
  const router = useRouter()
  const { id } = props.place
  const handleClick = () => {
    router.push(`/destination/${id}`)
  }
  const { name, photoUrl, description } = props.place

  const shorterDescription = () => {
    if (description.length < 100) return description
    let desc = description.split(" ")
    let words = desc.splice(0, 17)
    words.push("...")
    desc = words.join(" ")
    return desc
  }
  return (
    <Card
      sx={{
        margin: "10px",
        flexGrow: 1,
        ":hover": { transform: "scale(1.07)", zIndex: "1" },
        transition: "all 0.15s ease-in-out",
      }}
    >
      <CardActionArea
        // onClick={handleClick}
        href={`/destination/${id}`}
        sx={{ cursor: "pointer", height: "100%" }}
      >
        <CardMedia
          component="img"
          sx={{
            //height: "70%",
            //objectFit: "cover",
            maxHeight: "300px",
          }}
          image={photoUrl || "https://picsum.photos/id/575/2000"}
          alt="image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name || "Nazwa miejsca"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {shorterDescription()}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button
          className="signButton"
          size="small"
          color="primary"
          onClick={handleClick}
          sx={{
            position: "relative",
            bottom: 0,
          }}
        >
          See details
        </Button>
      </CardActions> */}
    </Card>
  )
}
