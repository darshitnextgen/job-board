import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
            <div className="text-xl font-bold text-blue-600">
                JobBoard
            </div>
            <div className="flex gap-6">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-500"
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/jobs"
                    className={({ isActive }) =>
                        isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-500"
                    }
                >
                    Jobs
                </NavLink>
                <NavLink
                    to="/saved"
                    className={({ isActive }) =>
                        isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-500"
                    }
                >
                    Saved Jobs
                </NavLink>
            </div>
        </nav>
    );
}

export default Navbar;