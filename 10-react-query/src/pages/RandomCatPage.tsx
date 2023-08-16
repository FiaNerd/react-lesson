import { useQuery } from "@tanstack/react-query";
import {getRandomCatImage} from '../services/TheCatApi'
import Image from 'react-bootstrap/Image'

const RandomCatPage = () => {

    const { data } = useQuery(
        ['random-cats', getRandomCatImage ], 
      );


  return (
    <>
      <h1>I 🖤 Random Cat page</h1>
      <p>A random cat page for random cats</p>
 
 {data && (
    <Image src={data.url} alt="Random Cat Image" />
 )}
    </>
  );
}

export default RandomCatPage;