import Head from 'next/head'
import { PrismaClient } from '@prisma/client'

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/eventselect",
      permanent: true
    }
  }
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Smart Events Turnstile</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}
