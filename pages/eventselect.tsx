import { prisma } from "@/lib/api/db";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { Box, Typography, TextField, Button, Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from "@mui/material";
import { StyledForm } from "@/components/StyledForm";
import { SyntheticEvent, useState } from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";


export async function getServerSideProps(context: GetServerSidePropsContext) {
    const events = await prisma.event.findMany(/* In the future we may want to restrict admins to only their events */);
    const session = await getServerSession(context.req, context.res, authOptions);
    const user = await prisma.admin.findFirst({ where: { email: session?.user?.email ?? "" } });

    if (user) {
        return { props: { events } }
    } else {
        return {
            redirect: {
                permanent: false,
                destination: "/api/auth/signin"
            }
        }
    }
}

export default function eventSelect({ events }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [notSelected, setselected] = useState(true);

    const handleChange = async (event: SelectChangeEvent) => {
        sessionStorage.setItem("event", event.target.value)
        setselected(false);
    }

    return (
        <Box width="45rem" mx="auto" display="flex" justifyItems="center" flexDirection="column">
            <Typography fontWeight="bold" variant="h4" align="center" mt={5}>Turnstile</Typography>
            <Typography mx="auto" variant="caption" align="center" mt={0.5}>Select an Event</Typography>
            <FormControl required fullWidth >
                <InputLabel id="selectEvent">Event</InputLabel>
                <Select defaultValue="" labelId="selectEvent" label="Event" name="eventSelected" onChange={handleChange} sx={{ width: "100%", mt: 1 }}>
                    {events.length !== 0 ?
                        events.map((event) => <MenuItem key={event.id} value={event.id}>{event.name}</MenuItem>) :
                        <MenuItem key={1} value={"noEvent"}>No events to select</MenuItem>
                    }
                </Select>
            </FormControl>
            <Button component={Link} href="/purchase" disabled={notSelected} variant="contained" sx={{mt: 2, maxWidth: "fit-content"}}>Select</Button>
        </Box>
    )
}