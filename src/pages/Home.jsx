import { useState } from 'react';
import { jobs } from '../constants/jobsmock'
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    const featuredJobs = jobs.filter((job) => job.featured);

    function handleSearch() {
        if (search.trim()) {
            navigate(`/jobs?search=${search}`)
        } else {
            navigate('/jobs')
        }
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') handleSearch()
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white">

            {/* Hero Section */}
            <div className="bg-gradient-to-b from-gray-900 to-gray-950 py-24 px-8 text-center">
                <h1 className="text-5xl font-bold text-white mb-4">
                    Find Your Dream Job in India
                </h1>
                <p className="text-gray-400 text-lg mb-10">
                    Search from {jobs.length}+ jobs at top Indian startups
                </p>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto flex gap-3">
                    <input
                        type="text"
                        placeholder="Search job title, company, location..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-gray-800 text-white placeholder-gray-500 px-5 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium text-sm transition-colors">
                        Search
                    </button>
                </div>

                {/* Stats */}
                <div className="flex justify-center gap-12 mt-10">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-white">{jobs.length}+</div>
                        <div className="text-gray-500 text-sm">Jobs Available</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-white">18+</div>
                        <div className="text-gray-500 text-sm">Top Companies</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-white">5</div>
                        <div className="text-gray-500 text-sm">Categories</div>
                    </div>
                </div>
            </div>

            {/* Featured Jobs */}
            <div className="max-w-6xl mx-auto px-8 py-16">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold">Featured Jobs</h2>
                    <button
                        onClick={() => navigate('/jobs')}
                        className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                        View all jobs →
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    {featuredJobs.map((job) => (
                        <div
                            key={job.id}
                            onClick={() => navigate(`/jobs/${job.id}`)}
                            className="bg-gray-800 border border-blue-500/30 rounded-xl p-5 cursor-pointer hover:border-blue-500 transition-all hover:bg-gray-750 group">

                            {/* Card Top */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center text-xl">
                                    {job.logo}
                                </div>
                                <div>
                                    <div className="text-white font-medium text-sm">{job.title}</div>
                                    <div className="text-gray-400 text-xs">{job.company}</div>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="flex gap-2 mb-4">
                                <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded-md">
                                    {job.type}
                                </span>
                                <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-1 rounded-md">
                                    {job.category}
                                </span>
                            </div>

                            {/* Footer */}
                            <div className="flex justify-between items-center">
                                <span className="text-green-400 text-sm font-medium">
                                    {job.salary}
                                </span>
                                <span className="text-gray-500 text-xs">
                                    {job.location.split(',')[0]}
                                </span>
                            </div>

                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Home