import * as React from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { Button, CardActionArea, CardActions } from "@mui/material"

export default function eventCard() {
  return (
    <Card className="eventCard">
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://picsum.photos/id/575/2000"
          alt="oczko morskie"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           Nazwa miejsca
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Opis miejsca: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non justo leo. Duis nibh libero, imperdiet quis lacus at, egestas lobortis neque.
             Cras nec magna in sapien sollicitudin varius venenatis id lorem. Mauris convallis efficitur leo in imperdiet.
             Morbi vitae nulla sit amet turpis semper pulvinar. Integer congue quam nec purus gravida, at commodo urna efficitur
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button className="signButton" size="small" color="primary">
        See details
        </Button>
      </CardActions>
    </Card>
  )
}
//
