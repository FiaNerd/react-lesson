import { useQuery } from '@tanstack/react-query'
import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button"
import LoadingSpinner from '../components/LoadingSpinner'
import { getRandomDadJoke } from '../services/ICanHazDadJokeAPI'

// Tar emot tre stycker parametrar (den sista är valfri, om man tex vill ändra några inställningar. De två första är inte valfria): 
// 1: Tar emot en qyery nyckel - ["random-dad-joke"] (måste ge den array med en sträng som tillsammans kommer bilda en query nyckel. Det är här den vet om det har data inne i sin cash sedan innan. )
// 2: Tar emot en funktion som gör vår data hämtning - sedan skickar man in en query funktion, där den hämtar data. (Snyggare att hämta data fån en annan fil)
const ICanHazDadJokePage = () => {
	const {
		data,
		isError,
        isFetching,
		isLoading,
		isStale,
		isSuccess,
		refetch,
		status,
	} = useQuery(["random-dad-joke"], getRandomDadJoke)
    // OBS! Man kallar inte på den getRandomDadJoke(), då hade den kallats på varje gång, utan lägger brara in den getRandomDadJoke
	return (
		<>
			<h1>Random Dad Joke</h1>

			<pre className="bg-light py-2 px-3">
				isError: {isError ? "true" : "false"}<br />
				isFetching: {isFetching ? "true" : "false"}<br />
				isLoading: {isLoading ? "true" : "false"}<br />
				isStale: {isStale ? "true" : "false"}<br />
				isSuccess: {isSuccess ? "true" : "false"}<br />
				status: {status}
			</pre>

			{isFetching && <LoadingSpinner />}

			{isError && <Alert variant="warning">ERROR! ERROR! ERROR!</Alert>}

			<div>
				{data && (
					<p className="display-5 text-center my-5">
						{data.joke}
					</p>
				)}
			</div>

			<div className="d-flex justify-content-center">
				<Button
					variant="primary"
					disabled={isFetching}
					onClick={() => refetch()}
				>
					MOAR!
				</Button>
			</div>
		</>
	)
}

export default ICanHazDadJokePage
