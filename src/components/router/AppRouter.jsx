import { BrowserRouter, Routes, Route } from "react-router-dom";

import { MainLayout } from "../templates/MainLayout";
import HomePage from "../pages/HomePage";
import SearchPage from "../pages/SearchPage";
import CalendarPage from "../pages/CalendarPage";
import StatisticsPage from "../pages/StatisticsPage";
import DocumentationPage from "../pages/DocumentationPage";
import NotFoundPage from "../pages/NotFoundPage";
import ForumPage from "../pages/ForumPage";
import UserPage from "../pages/UserPage";

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
          path="/documentation"
          element={
            <MainLayout>
              <DocumentationPage />
            </MainLayout>
          }
        />
        <Route
          path="/search"
          element={
            <MainLayout>
              <SearchPage />
            </MainLayout>
          }
        />
        <Route
          path="/calendar"
          element={
            <MainLayout>
              <CalendarPage />
            </MainLayout>
          }
        />
        <Route
          path="/Statistics"
          element={
            <MainLayout>
              <StatisticsPage />
            </MainLayout>
          }
        />
        <Route
          path="/Forum"
          element={
            <MainLayout>
              <ForumPage />
            </MainLayout>
          }
        />
        <Route
          path="/user"
          element={
            <MainLayout>
              <UserPage />
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
