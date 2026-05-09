import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { JobProvider } from './context/JobContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import JobDetail from './pages/JobDetail'
import SavedJobs from './pages/SavedJobs'

function App() {
  return (
    <JobProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/saved" element={<SavedJobs />} />
        </Routes>
      </BrowserRouter>
    </JobProvider>
  )
}

export default App