import { Paper, Box, Typography, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Student } from "@prisma/client";

export default function CheckinCard({ student, checkIn }: { student: Student, checkIn: Function }) {
  return (
    <Paper sx={{ mt: 2, width: "100%", backgroundColor: grey[200], borderRadius: "12px" }}>
      <Box display="flex" flexDirection="row" minHeight="1rem" p={3}>
        <Typography>{student.name}</Typography>
        <Button sx={{ ml: "auto" }} variant="contained">CHECK IN</Button>
      </Box>
    </Paper>
  )
}