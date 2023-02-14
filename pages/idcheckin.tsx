import CheckinCard from "@/components/CheckinCard";
import { Box, Paper, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import { Student } from "@prisma/client";

export default function IdCheckIn({ students }: { students: Array<Student> }) {
    return (
    <>
        <Typography fontWeight="bold" variant="h4">Turnstile</Typography>
        <Typography variant="caption">Check In</Typography>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
            <TextField label="Last Name" variant="standard" />
            <Button>USE 5 DIGIT ID</Button>
        </Box>
        {students.map((student, i) => <CheckinCard student={student} key={i} />)}
    </>
    )
}

// add already checked in v. check in functionality to button