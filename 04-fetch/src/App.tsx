import { useEffect, useState } from 'react'
import { getResource } from './services/API'
import { IResource } from './types'
import './assets/scss/App.scss'
import ResourceList from './components/ResourceList'

function App() {
	const [resource, setResource] = useState('')
	const [data, setData] = useState<IResource[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	useEffect(() => {
		const fetchData = async () => {

            // Har vi inte en error så avbryter vi med hjälp av return. Så då går den vidare  
			if (!resource) {
				return
			}

			// empty data & error before fetching new
			// and set loading
            // Tömmer Data innan man hämtar datan
			setError('')
			setData([])
			setLoading(true)

			try {
				const payload = await getResource(resource)

				// update data state with resource payload
				setData(payload)
				setLoading(false)

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
            // Kan inte direkt ha någon annat än any här
			} catch (e: any) {
				setError(e.toString())
				setLoading(false)

			}
		}

		// call function
		fetchData()
	}, [resource])

	return (
		<div className="container">
			<h1 className="mb-3">Fetch</h1>

			<div className="d-flex justify-content-between mb-3">
				<button onClick={() => setResource('albums')} className="btn btn-primary">Albums</button>
				<button onClick={() => setResource('photos')} className="btn btn-success">Photos</button>
				<button onClick={() => setResource('posts')} className="btn btn-warning">Posts</button>
				<button onClick={() => setResource('todos')} className="btn btn-danger">Todos</button>
				<button onClick={() => setResource('memes')} className="btn btn-info">Memes 😂</button>
			</div>

			<ResourceList
				error={error}
				loading={loading}
				resource={resource}
				data={data}
			/>
		</div>
	)
}

export default App
