import SelectAutoWidth from "@/components/selectAutoWidth"
import { Box } from "@mui/material"
export default function filterBar() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
      }}
    >
      <SelectAutoWidth />
      <SelectAutoWidth />
      <SelectAutoWidth />
      <SelectAutoWidth />
    </Box>
  )
}
//
