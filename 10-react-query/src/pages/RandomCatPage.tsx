import { useQuery } from "@tanstack/react-query";
import {getRandomCatByBreed} from '../services/TheCatApi'
import { Alert, Button, ButtonGroup, Image } from "react-bootstrap";
import { useState } from "react";
import { Breed } from "../types/TheCatApi.types";

const breeds: Breed[] = [
	{ id: '', name: 'Any' },
	{ id: 'ragd', name: 'Ragdoll' },
	{ id: 'sibe', name: 'Siberian' },
	{ id: 'beng', name: 'Bengal' },
	{ id: 'pers', name: 'Persian' },
	{ id: 'norw', name: 'Norwegian Forest' },
]

const RandomCatPage = () => {

    const [ selectedBreed, setSelectedBreed] = useState("") // inehlla ragd, sieb, beng, pers, norw

    // refetch = det enda den gör att att den kör queryn på nytt oavsett om det behövs eller inte, den ignronenr eventuel stale time. Mne den tar inte bort dne från cashen
    const { data, error, isFetching, refetch } = useQuery({
        // För att kunna uppdatera bilderna så måste man lägga in ett id ockskå.. sök på Dynamic Parallel Queries with useQueries, så kommer mer info fram
        queryKey: ['random-cat', selectedBreed], 
        queryFn: () =>  getRandomCatByBreed(selectedBreed),
        staleTime: 5 * 10000,
    })

      if(error) {
        return <Alert variant="error">Oops! There is an error</Alert>
      }
      
  return (
    <>
      <h1>I 🖤 Random Cat page</h1>
      <p>A random cat page for random cats</p>
    
    
    {data && (
        <Image className="mb-3" src={data.url} alt="Random Cat Image" fluid/>
    )}

        <div className="text-center">
             <div className="mb-3">
                <Button
                    variant="primary"
                    onClick={() => refetch()}
                    disabled={isFetching}
                    >
                    {isFetching ? "Loading..." : "Load cats"}
                </Button>

                <ButtonGroup className="ms-2">
						{breeds.map(breed => (
							<Button
								key={breed.id}
								disabled={isFetching || selectedBreed === breed.id}
								onClick={() => setSelectedBreed(breed.id)}
								variant="secondary"
							>
								{breed.name}
							</Button>
						))}
					</ButtonGroup>
            </div>
        </div>
    </>
  );
}

export default RandomCatPage;