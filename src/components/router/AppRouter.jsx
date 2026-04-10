import { BrowserRouter, Routes, Route } from "react-router-dom";

import { MainLayout } from "../templates/MainLayout";
import HomePage from "../pages/HomePage";
import CharactersPage from "../pages/CharactersPage";
import LocationsPage from "../pages/LocationsPage";
import EpisodesPage from "../pages/EpisodesPage";
import NotFoundPage from "../pages/NotFoundPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />
        <Route
          path="/characters"
          element={
            <MainLayout>
              <CharactersPage />
            </MainLayout>
          }
        />
        <Route
          path="/locations"
          element={
            <MainLayout>
              <LocationsPage />
            </MainLayout>
          }
        />
        <Route
          path="/episodes"
          element={
            <MainLayout>
              <EpisodesPage />
            </MainLayout>
          }
        />

        <Route
          path="*"
          element={
            <MainLayout>
              <NotFoundPage />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
