import { useState, useEffect } from 'react'
import './assets/scss/App.scss'

function App() {

	const [resource, setResource] = useState('')
	const [data, setData] = useState<IResource[]>([])

    interface IResource {
        id: number;
        title: string;
    }
   
    useEffect(() => {
        
        if(!resource){
            return 
        }
        
        setData([])
        // Fetch resource 
        const fetchData = async () => {
            const resp = await fetch(`https://jsonplaceholder.typicode.com/${resource}`)

            const payload = await resp.json() as IResource[]

                setData(payload)
        }

        fetchData() 

    }, [ resource ]) // Kallas för dependencies


	return (
		<div className="container">
			<h1 className="mb-3">Fetch</h1>

			<div className="d-flex justify-content-between">
				<button onClick={() => setResource('albums')} className="btn btn-primary">Albums</button>
				<button onClick={() => setResource('photos')} className="btn btn-success">Photos</button>
				<button onClick={() => setResource('posts')} className="btn btn-warning">Posts</button>
				<button onClick={() => setResource('todos')} className="btn btn-danger">Todos</button>
			</div>

			{ resource && (
				<>
					<h2>{resource}</h2>
					<p>There are {data.length} {resource}.</p>
					<ol>
						{ data.map(item => (
							<li key={item.id}>{item.title}</li>
						))}
					</ol>
				</>
			)}
		</div>
	)
}

export default App
