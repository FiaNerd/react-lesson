import React, { useState } from 'react'

interface IProps {
	onSearch: (location: string) => void
}

const SearchCity: React.FC<IProps> = ({ onSearch }) => {
	const [city, setCity] = useState("")

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		// pass `city` to parent component (App)
		onSearch(city)

		// clear `city` state
		setCity("")
	}

    const toFewCharacters = city.trim().length > 0 && city.trim().length > 3 

	return (
		<div id="search-wrapper">
			<form id="search-form" onSubmit={handleSubmit}>
				<div className="input-group">
					<input
						onChange={e => setCity(e.target.value)}
						value={city}
						type="text"
						className="form-control"
						placeholder="Enter city to search for" aria-label="City" aria-details="Search for city to show current weather for."
					/>

					<button
						type="submit"
						className="btn btn-success"
                        disabled={city.trim().length < 3}
					>🔍</button>
				</div>
                   {toFewCharacters && <div className="form-text">Please Enter at least more then characters</div>}
			</form>
		</div>
	)
}

export default SearchCity
