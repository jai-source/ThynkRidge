import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Smart Study Planner</title>
        <meta name="description" content="AI-powered study planning application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen p-4">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Smart Study Planner
        </h1>
      </main>
    </div>
  )
}

export default Home 