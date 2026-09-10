import { BrowserRouter, Route, Routes } from "react-router-dom"
import { NavBar } from "./components/navbar"
import { Home } from "./pages/home"
import { MovieDetail } from "./components/movieDetail"
import { MoviePlay } from "./components/moviePlay"

function App() {

  return (
    <main className="border h-dvh bg-[#030712]">
      <BrowserRouter>
        <NavBar />
        <div className="h-full">
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/movie/:id' element={<MovieDetail />} />
            <Route path='/movie/play/:id' element={<MoviePlay />} />
          </Routes>
        </div>
      </BrowserRouter>
    </main>
  )
}

export default App
