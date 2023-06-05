import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <>
      <h1>Welcome to Hacker News!</h1>
      <Link to="/search">
        <Button variant='primary'>Search</Button>
      </Link>
    </>
  )
}

export default HomePage
