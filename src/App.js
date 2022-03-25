import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import Navigation from "./components/Navigation";

import FrenchRegion from "./pages/RegionPage/FrenchRegion";
import FranceTransition from "./pages/TransitionPage/FranceTransition";
import FrenchCities from "./pages/CityPage/FrenchCities";

import SpainTransition from "./pages/TransitionPage/SpainTransition";
import SpainRegion from "./pages/RegionPage/SpainRegion";

import Africa from "./pages/ContinentTransitionPage/Africa";
import Asia from "./pages/ContinentTransitionPage/Asia";
import Europe from "./pages/ContinentTransitionPage/Europe";
import NorthAmerica from "./pages/ContinentTransitionPage/NorthAmerica";
import Oceania from "./pages/ContinentTransitionPage/Oceania";
import SouthAmerica from "./pages/ContinentTransitionPage/SouthAmerica";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" exact element={<Home />} />
          {/* France */}
          <Route path="/FrenchRegion" exact element={<FrenchRegion />} />
          <Route path="/FranceChoice" exact element={<FranceTransition />} />
          <Route path="/FrenchCities" exact element={<FrenchCities />} />

          {/* Espagne */}
          <Route path="/SpainChoice" exact element={<SpainTransition />} />
          <Route path="/SpainRegion" exact element={<SpainRegion />} />

          {/* ContinentPageTransition */}

          <Route path="/Europe" exact element={<Europe />} />
          <Route path="/SouthAmerica" exact element={<SouthAmerica />} />
          <Route path="/NorthAmerica" exact element={<NorthAmerica />} />
          <Route path="/Asia" exact element={<Asia />} />
          <Route path="/Africa" exact element={<Africa />} />
          <Route path="/Oceania" exact element={<Oceania />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
