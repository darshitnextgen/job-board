import { useNavigate } from 'react-router-dom'
import { useJobContext } from '../context/JobContext'

function SavedJobs() {
    const navigate = useNavigate()
    const { state, dispatch } = useJobContext()
    const { savedJobs } = state

    function handleRemove(id) {
        dispatch({ type: 'REMOVE_JOB', payload: id })
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white px-8 py-10">
            <div className="max-w-4xl mx-auto">

                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Saved Jobs</h1>
                        <p className="text-gray-400 text-sm mt-1">
                            {savedJobs.length} job{savedJobs.length !== 1 ? 's' : ''} saved
                        </p>
                    </div>
                    {savedJobs.length > 0 && (
                        <button
                            onClick={() => navigate('/jobs')}
                            className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                            Browse more jobs →
                        </button>
                    )}
                </div>

                {/* Empty State */}
                {savedJobs.length === 0 && (
                    <div className="text-center py-24">
                        <div className="text-6xl mb-4">🔖</div>
                        <h3 className="text-xl font-medium text-white mb-2">
                            No saved jobs yet
                        </h3>
                        <p className="text-gray-400 text-sm mb-6">
                            Browse jobs and save the ones you like
                        </p>
                        <button
                            onClick={() => navigate('/jobs')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm transition-colors">
                            Browse Jobs
                        </button>
                    </div>
                )}

                {/* Saved Jobs Grid */}
                {savedJobs.length > 0 && (
                    <div className="grid grid-cols-2 gap-5">
                        {savedJobs.map((job) => (
                            <div
                                key={job.id}
                                className="bg-gray-900 border border-gray-800 rounded-xl p-5">

                                {/* Card Top */}
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                                        {job.logo}
                                    </div>
                                    <div
                                        className="flex-1 cursor-pointer"
                                        onClick={() => navigate(`/jobs/${job.id}`)}>
                                        <h3 className="text-white font-medium text-sm mb-0.5 hover:text-blue-400 transition-colors">
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
                                </div>

                                {/* Footer */}
                                <div className="flex justify-between items-center">
                                    <span className="text-green-400 text-sm font-medium">
                                        {job.salary}
                                    </span>
                                    <button
                                        onClick={() => handleRemove(job.id)}
                                        className="text-red-400 hover:text-red-300 text-xs border border-red-400/30 hover:border-red-400 px-3 py-1 rounded-lg transition-colors">
                                        Remove
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    )
}

export default SavedJobs;