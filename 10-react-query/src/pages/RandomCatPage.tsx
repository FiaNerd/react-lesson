import { useQuery } from "@tanstack/react-query";
import {getRandomCatImage} from '../services/TheCatApi'
// import Image from 'react-bootstrap/Image'
import { Alert, Button, Image } from "react-bootstrap";

const RandomCatPage = () => {

    // refetch = det enda den gör att att den kör queryn på nytt oavsett om det behövs eller inte, den ignronenr eventuel stale time. Mne den tar inte bort dne från cashen
    const { data, error, refetch } = useQuery(['random-cat'], getRandomCatImage)


      if(error) {
        return <Alert variant="error">Oop! There is an error</Alert>
      }


  return (
    <>
      <h1>I 🖤 Random Cat page</h1>
      <p>A random cat page for random cats</p>

      
 
    {data && (
        <Image className="mb-3" src={data.url} alt="Random Cat Image" fluid/>
    )}

        <div className="mb-3">
            <Button 
                variant="primary"
                onClick={() => refetch()}>Load cats</Button>
        </div>
    </>
  );
}

export default RandomCatPage;