import { GlobalProvider } from "./context/GlobalContext.jsx";
import DefaultLayout from "../src/layout/DefaultLayout.jsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import StepsPage from "./pages/StepsPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import TripsPage from "./pages/TripsPage.jsx";
import EventPage from "./pages/EventPage.jsx";


function App() {

  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/trips" element={<TripsPage />} />
            <Route path="/trips/:id" element={<StepsPage />} />
            <Route path="/trips/:id/:id" element={<EventPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App