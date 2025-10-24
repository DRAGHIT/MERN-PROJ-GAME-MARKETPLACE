import { Link } from "react-router-dom";
import { User, LogOut, Home, Grid } from "lucide-react";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { isAuth, user, logout } = useAuth();

  return (
    <nav className="bg-dark-surface border-b border-dark-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-blue-500">
            Game Marketplace
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-2 hover:text-blue-400 transition"
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link
              to="/browse"
              className="flex items-center gap-2 hover:text-blue-400 transition"
            >
              <Grid size={20} />
              <span>Browse</span>
            </Link>

            {isAuth ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 hover:text-blue-400 transition"
                >
                  {user?.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.username}
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <User size={20} />
                  )}
                  <span>{user?.username}</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 text-red-400 hover:text-red-300 transition"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-secondary">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
