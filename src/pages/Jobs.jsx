// ── Plugin Imports ──
import { useState, useMemo, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

// ── Local Imports ──
import { jobs } from '../constants/jobsmock';
import useDebounce from '../hooks/useDebounce';

function Jobs() {
    const navigate = useNavigate()
    const searchRef = useRef(null);
    const [search, setSearch] = useState('')
    const [selectedType, setSelectedType] = useState('all')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [currentPage, setCurrentPage] = useState(1)
    const jobsPerPage = 6

    const types = ['all', 'full-time', 'part-time', 'remote', 'contract'];
    const categories = ['all', 'frontend', 'backend', 'fullstack', 'design', 'devops'];
    // search state ની debounced value
    const debouncedSearch = useDebounce(search, 300);

    // ── Logic Task — તમે implement કરો ──
    const filteredJobs = useMemo(() => {
        return jobs.filter((job) => {
            const searchMatch =
                job.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                job.company.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                job.location.toLowerCase().includes(debouncedSearch.toLowerCase())

            const typeMatch =
                selectedType === 'all' || job.type === selectedType

            const categoryMatch =
                selectedCategory === 'all' || job.category === selectedCategory

            return searchMatch && typeMatch && categoryMatch
        })
    }, [debouncedSearch, selectedType, selectedCategory])

    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)

    // ── Logic Task — Pagination ──
    const currentJobs = useMemo(() => {
        const start = (currentPage - 1) * jobsPerPage
        const end = start + jobsPerPage
        return filteredJobs.slice(start, end)
    }, [filteredJobs, currentPage]);

    useEffect(() => {
        searchRef.current.focus();
    }, [])

    function handleTypeChange(type) {
        setSelectedType(type)
        setCurrentPage(1) // filter change = page 1 પર reset
    }

    function handleCategoryChange(category) {
        setSelectedCategory(category)
        setCurrentPage(1)
    }

    function handleSearch(e) {
        setSearch(e.target.value)
        setCurrentPage(1)
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white">

            {/* Header */}
            <div className="bg-gray-900 border-b border-gray-800 px-8 py-8">
                <h1 className="text-3xl font-bold mb-6">All Jobs</h1>

                {/* Search */}
                <input
                    ref={searchRef}
                    type="text"
                    placeholder="Search job title, company, location..."
                    value={search}
                    onChange={handleSearch}
                    className="w-full bg-gray-800 text-white placeholder-gray-500 px-5 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm mb-4"
                />

                {/* Type Filter */}
                <div className="flex gap-2 flex-wrap">
                    {types.map((type) => (
                        <button
                            key={type}
                            onClick={() => handleTypeChange(type)}
                            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors capitalize ${selectedType === type
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 py-8 flex gap-8">

                {/* Sidebar — Category Filter */}
                <div className="w-52 flex-shrink-0">
                    <div className="bg-gray-900 rounded-xl p-5 sticky top-20">
                        <h3 className="text-sm font-medium text-gray-300 mb-4">
                            Category
                        </h3>
                        <div className="flex flex-col gap-1">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => handleCategoryChange(cat)}
                                    className={`text-left px-3 py-2 rounded-lg text-sm capitalize transition-colors ${selectedCategory === cat
                                        ? 'bg-blue-600/20 text-blue-400'
                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                        }`}
                                >
                                    {cat === 'all' ? 'All Categories' : cat}
                                </button>
                            ))}
                        </div>

                        {/* Results count */}
                        <div className="mt-6 pt-4 border-t border-gray-800">
                            <p className="text-xs text-gray-500">
                                {filteredJobs.length} jobs found
                            </p>
                        </div>
                    </div>
                </div>

                {/* Jobs List */}
                <div className="flex-1">

                    {/* Empty State */}
                    {currentJobs.length === 0 && (
                        <div className="text-center py-20">
                            <div className="text-5xl mb-4">🔍</div>
                            <h3 className="text-xl font-medium text-white mb-2">
                                No jobs found
                            </h3>
                            <p className="text-gray-400 text-sm">
                                Try different search terms or filters
                            </p>
                            <button
                                onClick={() => {
                                    setSearch('')
                                    setSelectedType('all')
                                    setSelectedCategory('all')
                                }}
                                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm transition-colors">
                                Clear filters
                            </button>
                        </div>
                    )}

                    {/* Jobs Grid */}
                    {currentJobs.length > 0 && (
                        <div className="grid grid-cols-2 gap-5">
                            {currentJobs.map((job) => (
                                <div
                                    key={job.id}
                                    onClick={() => navigate(`/jobs/${job.id}`)}
                                    className={`bg-gray-900 border rounded-xl p-5 cursor-pointer hover:border-blue-500/50 transition-all group ${job.featured
                                        ? 'border-blue-500/30'
                                        : 'border-gray-800'
                                        }`}
                                >
                                    {/* Featured Badge */}
                                    {job.featured && (
                                        <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded-md mb-3 inline-block">
                                            Featured
                                        </span>
                                    )}

                                    {/* Card Top */}
                                    <div className="flex items-start gap-3 mb-4">
                                        <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                                            {job.logo}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-white font-medium text-sm mb-0.5 truncate">
                                                {job.title}
                                            </h3>
                                            <p className="text-gray-400 text-xs">
                                                {job.company} · {job.location.split(',')[0]}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex gap-2 mb-4 flex-wrap">
                                        <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded-md capitalize">
                                            {job.type}
                                        </span>
                                        <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-1 rounded-md capitalize">
                                            {job.category}
                                        </span>
                                        <span className="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded-md">
                                            {job.experience}
                                        </span>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex justify-between items-center">
                                        <span className="text-green-400 text-sm font-medium">
                                            {job.salary}
                                        </span>
                                        <span className="text-gray-600 text-xs">
                                            {job.postedDate}
                                        </span>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center gap-2 mt-10">
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 rounded-lg text-sm bg-gray-800 text-gray-400 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                                ← Prev
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-9 h-9 rounded-lg text-sm transition-colors ${currentPage === page
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 rounded-lg text-sm bg-gray-800 text-gray-400 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                                Next →
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default Jobs