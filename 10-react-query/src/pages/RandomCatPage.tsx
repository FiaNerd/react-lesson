import { useQuery } from "@tanstack/react-query";
import {getRandomCatImage} from '../services/TheCatApi'
// import Image from 'react-bootstrap/Image'
import { Alert, Image } from "react-bootstrap";
import { Cat } from "../types/TheCatApi.types";
// import { CatTypes } from "../types/TheCatApi";

const RandomCatPage = () => {

    const { data, error } = useQuery(['random-cat'], getRandomCatImage)


      if(error) {
        return <Alert variant="error">Oop! There is an error</Alert>
      }


  return (
    <>
      <h1>I 🖤 Random Cat page</h1>
      <p>A random cat page for random cats</p>
 
    {data && (
        <Image src={data.url} alt="Random Cat Image" fluid/>
    )}
    </>
  );
}

export default RandomCatPage;