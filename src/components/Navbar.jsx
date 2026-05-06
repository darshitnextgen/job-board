import { NavLink } from 'react-router-dom'

function Navbar() {
    const links = [
        { name: 'Home', path: '/' },
        { name: 'Jobs', path: '/jobs' },
        { name: 'Saved Jobs', path: '/saved' },
    ]

    return (
        <nav className="bg-gray-900 border-b border-gray-800 px-8 py-4 flex justify-between items-center sticky top-0 z-50">

            <NavLink to="/" className="text-blue-400 text-xl font-bold">
                JobBoard
            </NavLink>

            <div className="flex gap-8">
                {links.map((link) => (
                    <NavLink
                        key={link.name}
                        to={link.path}
                        end={link.path === '/'}
                        className={({ isActive }) =>
                            isActive
                                ? 'text-blue-400 font-medium text-sm'
                                : 'text-gray-400 hover:text-white text-sm transition-colors'
                        }
                    >
                        {link.name}
                    </NavLink>
                ))}
            </div>

        </nav>
    )
}

export default Navbar