import { Box, TextField } from "@mui/material";
import { Student } from "@prisma/client";

export default function PurchaseForm({ student}: { student: Student}) {
    console.log(student)
    return (
        <>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
        <TextField label="Name" variant="filled" defaultValue={student.name}></TextField>
        {/* <TextField label="Last Name" variant="filled">{student.lastName}</TextField> */}
        </Box>
        <TextField label="Year" variant="filled" defaultValue={student.year}></TextField>
        <TextField label="Email" variant="filled" defaultValue={student.email}></TextField>
        <TextField label="7 Digit Student ID" variant="filled" defaultValue={student.redwoodId}></TextField> 
        </>
    )
  }

