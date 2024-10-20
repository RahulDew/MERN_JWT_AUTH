import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <Link to="/signup" className="text-2xl bg-slate-400 p-2">
        Signup
      </Link>
      <Link to="/login" className="text-2xl bg-blue-400 p-2">
        Signin
      </Link>
    </div>
  );
}

export default HomePage;
