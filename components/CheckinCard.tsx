import { Paper, Box, Typography, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Student } from "@prisma/client";

export default function CheckinCard({ student }: { student: Student }) {
  return (
    <Paper sx={{ mt: 2, mx: "auto", maxWidth: "44rem", p: 2, backgroundColor: grey[200], borderRadius: "18px" }}>
      <Box sx={{ display: "flex", flexDirection: "row" }} minHeight="4rem">
        <Typography>{student.lastName}, {student.firstName}</Typography>
        <Button></Button>
      </Box>
    </Paper>
  )
}