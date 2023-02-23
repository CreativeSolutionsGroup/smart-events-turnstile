import { Paper, Box, Typography, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Student } from "@prisma/client";

export default function CheckinCard({ student, checkIn }: { student: Student, checkIn: Function }) {
  return (
    <Paper sx={{ mt: 2, mx: "auto", maxWidth: "44rem", p: 2, backgroundColor: grey[200], borderRadius: "18px" }}>
      <Box sx={{ display: "flex", flexDirection: "row" }} minHeight="1rem">
        <Typography>{student.name}</Typography>
        <Button sx={{ ml: "auto", my: 2 }} variant="contained">CHECK IN</Button>
      </Box>
    </Paper>
  )
}