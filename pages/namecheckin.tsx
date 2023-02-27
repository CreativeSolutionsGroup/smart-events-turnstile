import CheckinCard from "@/components/CheckinCard";
import { readAdminByEmail } from "@/lib/api/admin";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Student } from "@prisma/client";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";
import { authOptions } from "./api/auth/[...nextauth]";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions);
    const user = await readAdminByEmail(session?.user?.email ?? "");

    if (user) {
        return { props: {} }
    } else {
        return {
            redirect: {
                permanent: false,
                destination: "/api/auth/signin"
            }
        }
    }
}

export default function NameCheckIn() {
    const [students, setStudents] = useState<Array<Student>>([]);

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

        const target = event.target as typeof event.target & {
            name: { value: string }
        };

        const endpoint = `/api/student?name=${target.name.value}&evt=36a26786-1f41-46fa-b90b-5b09dc226d67`
        const response = await fetch(endpoint);
        console.log(response)
        const studentsInfo = await response.json();
        setStudents(studentsInfo);
    }

    return (
        <>
            <Typography fontWeight="bold" variant="h4">Turnstile</Typography>
            <Typography variant="caption">Check In</Typography>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
                <form onSubmit={handleSubmit}>
                    <TextField label="Name" name="name" placeholder="Start typing last name..." variant="standard" />
                    <Button type="submit">Search</Button>
                </form>
                <Link href="/idcheckin"><Button >USE 5 DIGIT</Button></Link>
            </Box>
            {students.length !== 0 ? students.map((student, i) => <CheckinCard student={student} checkIn={() => alert("Checked in")} key={i} />) : <p>Press enter to search.</p>}
        </>
    )
}