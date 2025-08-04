import { GlobalProvider } from "./context/GlobalContext.jsx";
import DefaultLayout from "../src/layout/DefaultLayout.jsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import TripsPage from "./pages/TripsPage.jsx";
import TripDetailPage from "./pages/TripDetailPage.jsx";
import PhotoPage from "./pages/PhotoPage.jsx";

function App() {

  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/trips" element={<TripsPage />} />
            <Route path="/tripsphotos" element={<PhotoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App