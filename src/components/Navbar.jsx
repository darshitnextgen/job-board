import { NavLink } from 'react-router-dom'
import { useCallback } from 'react'
import { useJobContext } from '../context/JobContext'

function Navbar() {
    const { state } = useJobContext()

    const getSavedCount = useCallback(() => {
        return state.savedJobs.length
    }, [state.savedJobs])

    const savedCount = getSavedCount()

    const links = [
        { name: 'Home', path: '/' },
        { name: 'Jobs', path: '/jobs' },
        {
            name: savedCount > 0 ? `Saved Jobs (${savedCount})` : 'Saved Jobs',
            path: '/saved'
        },
    ]

    return (
        <nav className="bg-gray-900 border-b border-gray-800 px-8 py-4 flex justify-between items-center sticky top-0 z-50">

            <NavLink to="/" className="text-blue-400 text-xl font-bold">
                JobBoard
            </NavLink>

            <div className="flex gap-8">
                {links.map((link) => (
                    <NavLink
                        key={link.path}
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

export default Navbar;