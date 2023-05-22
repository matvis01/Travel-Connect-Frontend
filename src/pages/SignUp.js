import React, { useState } from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import api from "@/api/api"
import { useRouter } from "next/router"
const backgroundImage =
  "https://httoixguhkpljzhckejp.supabase.co/storage/v1/object/public/cover-images/photo-070e7ae2-3135-4629-8ae3-36771086c2cf.jpg"
const theme = createTheme()

export default function SignUp() {
  const [fieldsErrors, setFiledErrors] = useState([])
  const router = useRouter()

  function isCorrectlyFilled(data) {
    let errors = []
    data.forEach((el) => {
      if (el.length == 0) {
        errors.push("field is required")
      } else {
        errors.push(null)
      }
    })
    if (data.get("confirmPassword") != data.get("password")) {
      errors[4] = "passwords don't match"
    }
    setFiledErrors(errors)

    return !errors.some(Boolean)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    if (isCorrectlyFilled(data)) {
      try {
        const res = await api.post("/Account/sign-up", {
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          password: data.get("password"),
        })
        router.push("/signIn")
      } catch (err) {
        console.log(err)
      }
    }

    console.log({
      email: data.get("email"),
      password: data.get("password"),
    })

    // console.log("data:", data)
  }

  function checkError(event) {
    if (event.target.value == 0) {
      console.log(event.target)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          objectFit: "cover",
          overflow: "hidden",
        }}
      >
        <img src={backgroundImage} alt="kms" className="background" />

        <Box
          sx={{
            backgroundColor: "white",
            padding: "40px",
            width: "450px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            "@media (width < 600px)": {
              paddingX: "90px",
              width: "70%",
              height: "100%",
            },
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={checkError}
                  error={fieldsErrors[0] != null}
                  helperText={fieldsErrors[0]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  error={fieldsErrors[1] != null}
                  helperText={fieldsErrors[1]}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={fieldsErrors[2] != null}
                  helperText={fieldsErrors[2]}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={fieldsErrors[3] != null}
                  helperText={fieldsErrors[3]}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="confirmPassword"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  error={fieldsErrors[4] != null}
                  helperText={fieldsErrors[4]}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="./SignIn" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
