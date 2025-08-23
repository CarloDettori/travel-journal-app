import { GlobalProvider } from "./context/GlobalContext.jsx";
import DefaultLayout from "../src/layout/DefaultLayout.jsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import StepsPage from "./pages/StepsPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import TripsPage from "./pages/TripsPage.jsx";
import EventPage from "./pages/EventPage.jsx";
import MomentPage from "./pages/MomentPage.jsx";
import AllPhotoPage from "./pages/AllPhotoPage.jsx";

function App() {

  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/trips" element={<TripsPage />} />                {/* Lista viaggi */}
            <Route path="/trips/:tripId" element={<StepsPage />} />        {/* Lista tappe */}
            <Route path="/trips/:tripId/:stepId" element={<EventPage />} /> {/* Lista eventi */}
            <Route path="/trips/:tripId/:stepId/:eventId" element={<MomentPage />} /> {/* Lista momenti */}
            <Route path="/photos" element={<AllPhotoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;