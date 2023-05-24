import React, {useState} from 'react'

interface IProps {
    onSearchCity: (city: string) => void
}

const SearchCity:  React.FC<IProps> = ({ onSearchCity }) => {
    const [ findCity, setFindCity ] = useState("")    

    const handleSubmit =  ( e: React.FormEvent ) => {
        e.preventDefault()
        
        onSearchCity(findCity)

        setFindCity("")
    }

	return (
		<div id="search-wrapper">
			<form id="search-form" onSubmit={handleSubmit}>
				<div className="input-group">
					<input
						type="text"
						className="form-control"
						placeholder="Enter city to search for" aria-label="City" aria-details="Search for city to show current weather for."
                        onChange={e => setFindCity(e.target.value)}
                        value={ findCity }
                    />

					<button
						type="submit"
						className="btn btn-success"
					>🔍</button>
				</div>
			</form>
		</div>
	)
}

export default SearchCity
