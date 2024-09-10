'use client'

import { Card, CardContent, CardHeader, CardMedia, Grid, Typography } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {

  const [characters, setCharacters] = useState([])

  useEffect(() => {
    axios.get("https://rickandmortyapi.com/api/character")
      .then(response => response.data.results)
      .then((results) => {
        results.map(character => {
          axios.get(character.episode[0])
            .then((episode) => {
              character.episode = episode.data.name
            })
            .then(() => {
              setCharacters(results)
            })
        })
      })
  }, [])


  return (
    <div className="h-full w-full flex flex-col items-center my-5">
      <h6 className="text-white w-full text-center text-5xl">Rick And Morty Characters</h6>
      <Grid container spacing={2} marginTop={5} className="px-5">
        {characters.map((character) => (
          <Grid item xs={13} sm={7} md={5} lg={3} key={character.id}>
            <Card className="p-3 flex flex-col items-center bg-[#3c3e44] h-full rounded-md">
              <Image
                src={character.image}
                alt={character.name}
                sx={{ marginBottom: 2 }}
                width={200}
                height={200}
              />
              <CardContent className="flex flex-col items-center justify-center">
                <Typography variant="h5" className="text-white">{character.name}</Typography>
                <div className="w-full flex-col items-start justify-between">
                  <Typography className="text-gray-400 text-lg">{character.status} - {character.species}</Typography>
                  <Typography className="text-gray-400 text-lg">Last Know Location:</Typography>
                  <Typography className="text-gray-400 text-lg">{character.location.name}</Typography>
                  <Typography className="text-gray-400 text-lg">First Seen in:</Typography>
                  <Typography className="text-gray-400 text-lg">{character.episode}</Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}