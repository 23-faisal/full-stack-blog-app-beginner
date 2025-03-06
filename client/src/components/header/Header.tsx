import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <main className="w-full bg-slate-300">
      <header className="container mx-auto flex justify-between items-center py-4 px-4 sm:px-0 max-w-6xl mx-auto">
        <Link className="text-2xl font-bold text-slate-950" to="/">
          <h1>My Blog</h1>
        </Link>
        <nav className="flex">
          <ul className="flex space-x-4 text-md font-semibold">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>
      </header>
    </main>
  );
};

export default Navbar;
