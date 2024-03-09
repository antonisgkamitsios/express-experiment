import { Link } from 'react-router-dom';
export function Header() {
  return (
    <nav>
      <ul>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/profile">Profile</Link>
      </ul>
    </nav>
  );
}
