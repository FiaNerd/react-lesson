import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
      <h1>No Hacker news on this page!</h1>
      <Link to="/search">
        <Button variant='primary'>Not Found</Button>
      </Link>
    </>
  )
}

export default NotFound
