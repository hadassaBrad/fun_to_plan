import './App.css'
import Home from './pages/home'
import HomeLayout from './components/homeLayout'
import About from './pages/about'
import Sites from './pages/sites'
import Gallery from './pages/gallery'
import Site from './pages/site'
import Admin from './pages/admin'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="home" element={<HomeLayout />}>
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/sites" element={<Sites />} />
          <Route path="/sites/:siteId" element={<Site />} />
          <Route path="/tripRoute" element={<TripRoute />} />
          

          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
