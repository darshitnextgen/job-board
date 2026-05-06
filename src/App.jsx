import { BrowserRouter, Routes, Route } from 'react-router-dom';
/*
  ** Links
*/
import Navbar from './components/Navbar';

/*
  ** Pages
*/
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import SavedJobs from './pages/SavedJobs';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/saved" element={<SavedJobs />} />
      </Routes>
    </BrowserRouter>
  )
  // return (
  //   <>

  //     <Home />
  //     <Jobs />
  //     <JobDetail />
  //     <SavedJobs />
  //   </>
  // );
}

export default App;