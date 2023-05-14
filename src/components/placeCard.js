import * as React from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { Button, CardActionArea, CardActions } from "@mui/material"
import { useRouter } from "next/router"

export default function placeCard(props) {
  const router = useRouter()
  const { id } = props.place
  const handleClick = () => {
    router.push(`/destination/${id}`)
  }
  const { name, photoUrl, description } = props.place
  return (
    <Card className="eventCard">
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={photoUrl || "https://picsum.photos/id/575/2000"}
          alt="image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name || "Nazwa miejsca"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Opis miejsca:
            {description ||
              "Reprehenderit officia consectetur ad ullamco cillum velit magna amet tempor id eiusmod id elit velit. Consequat ea consequat deserunt sunt. Eu sint ullamco qui tempor nulla esse in dolor veniam fugiat velit."}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          className="signButton"
          size="small"
          color="primary"
          onClick={handleClick}
        >
          See details
        </Button>
      </CardActions>
    </Card>
  )
}
