import { SiAuthy } from "react-icons/si";
import { RiLoginCircleLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function PublicNavbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <SiAuthy className="h-8 w-8 text-green-500" />
            <span className="text-lg font-bold tracking-wide text-teal-600 sm:text-xl">
              ExpenseTracker
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              to="/register"
              className="inline-flex items-center gap-1.5 rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
            >
              <FaRegUser className="h-5 w-5" />
              Register
            </Link>

            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
            >
              <RiLoginCircleLine className="h-5 w-5" />
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}