import { useParams, useNavigate } from 'react-router-dom'
import { jobs } from '../constants/jobsmock'
import { useJobContext } from '../context/JobContext'

function JobDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { state, dispatch } = useJobContext()

    const job = jobs.find((j) => j.id === Number(id))
    const isSaved = state.savedJobs.some((j) => j.id === job.id)

    function handleSave() {
        if (isSaved) {
            dispatch({ type: 'REMOVE_JOB', payload: job.id })
        } else {
            dispatch({ type: 'SAVE_JOB', payload: job })
        }
    }

    if (!job) {
        return (
            <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white">
                <div className="text-6xl mb-4">😕</div>
                <h2 className="text-2xl font-bold mb-2">Job not found</h2>
                <p className="text-gray-400 mb-6">This job may have been removed.</p>
                <button
                    onClick={() => navigate('/jobs')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm transition-colors">
                    Back to Jobs
                </button>
            </div>
        )
    }

    const similarJobs = jobs
        .filter((j) => j.category === job.category && j.id !== job.id)
        .slice(0, 3)

    return (
        <div className="min-h-screen bg-gray-950 text-white">

            {/* Back Button */}
            <div className="max-w-5xl mx-auto px-8 pt-8">
                <button
                    onClick={() => navigate(-1)}
                    className="text-gray-400 hover:text-white text-sm flex items-center gap-2 transition-colors mb-6">
                    ← Back
                </button>
            </div>

            <div className="max-w-5xl mx-auto px-8 pb-16">

                {/* Job Header */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 mb-6">
                    <div className="flex items-start justify-between gap-6">
                        <div className="flex items-start gap-5">
                            <div className="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                                {job.logo}
                            </div>
                            <div>
                                {job.featured && (
                                    <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded-md mb-2 inline-block">
                                        Featured
                                    </span>
                                )}
                                <h1 className="text-2xl font-bold text-white mb-1">
                                    {job.title}
                                </h1>
                                <p className="text-gray-400 mb-4">
                                    {job.company} · {job.location}
                                </p>
                                <div className="flex gap-2 flex-wrap">
                                    <span className="bg-blue-500/20 text-blue-400 text-xs px-3 py-1 rounded-md capitalize">
                                        {job.type}
                                    </span>
                                    <span className="bg-amber-500/20 text-amber-400 text-xs px-3 py-1 rounded-md capitalize">
                                        {job.category}
                                    </span>
                                    <span className="bg-green-500/20 text-green-400 text-xs px-3 py-1 rounded-md">
                                        {job.salary}
                                    </span>
                                    <span className="bg-gray-800 text-gray-400 text-xs px-3 py-1 rounded-md">
                                        {job.experience}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3 flex-shrink-0">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg font-medium text-sm transition-colors">
                                Apply Now
                            </button>
                            <button
                                onClick={handleSave}
                                className="border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-2.5 rounded-lg text-sm transition-colors">
                                {isSaved ? '♥ Saved' : 'Save Job'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-3 gap-6">

                    {/* Left — Description + Requirements */}
                    <div className="col-span-2 flex flex-col gap-6">

                        {/* Description */}
                        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                            <h2 className="text-lg font-semibold mb-4">Job Description</h2>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                {job.description}
                            </p>
                        </div>

                        {/* Requirements */}
                        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                            <h2 className="text-lg font-semibold mb-4">Requirements</h2>
                            <ul className="flex flex-col gap-3">
                                {job.requirements.map((req, index) => (
                                    <li key={index} className="flex items-start gap-3 text-sm text-gray-400">
                                        <span className="text-blue-400 mt-0.5 flex-shrink-0">→</span>
                                        {req}
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>

                    {/* Right Sidebar */}
                    <div className="flex flex-col gap-4">

                        {/* Job Info */}
                        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                            <h3 className="text-sm font-semibold mb-4">Job Info</h3>
                            <div className="flex flex-col gap-3">
                                {[
                                    { label: 'Job Type', value: job.type },
                                    { label: 'Category', value: job.category },
                                    { label: 'Salary', value: job.salary },
                                    { label: 'Experience', value: job.experience },
                                    { label: 'Location', value: job.location },
                                    { label: 'Posted', value: job.postedDate },
                                ].map(({ label, value }) => (
                                    <div key={label} className="flex justify-between items-center py-2 border-b border-gray-800 last:border-0">
                                        <span className="text-gray-500 text-xs">{label}</span>
                                        <span className="text-white text-xs font-medium capitalize text-right max-w-32 truncate">
                                            {value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Similar Jobs */}
                        {similarJobs.length > 0 && (
                            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                                <h3 className="text-sm font-semibold mb-4">Similar Jobs</h3>
                                <div className="flex flex-col gap-3">
                                    {similarJobs.map((similar) => (
                                        <div
                                            key={similar.id}
                                            onClick={() => navigate(`/jobs/${similar.id}`)}
                                            className="flex items-center gap-3 cursor-pointer hover:bg-gray-800 rounded-lg p-2 transition-colors">
                                            <div className="text-xl">{similar.logo}</div>
                                            <div className="min-w-0">
                                                <p className="text-white text-xs font-medium truncate">
                                                    {similar.title}
                                                </p>
                                                <p className="text-gray-400 text-xs">{similar.company}</p>
                                                <p className="text-green-400 text-xs">{similar.salary}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDetail