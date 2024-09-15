import React from "react";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import css from "./App.module.css";

const Navigation = lazy(() => import("../components/Navigation/Navigation"));
const CatalogPage = lazy(() => import("../pages/CatalogPage/CatalogPage"));
const CatalogDetailsPage = lazy(() =>
  import("../pages/CatalogDetailsPage/CatalogDetailsPage")
);
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));
const HomePage = lazy(() => import("../pages/HomePage/HomePage"));

const App = () => {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={css.app}>
        <nav className={css.nav}>
          <Navigation />
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/campers" element={<CatalogPage />} />
          <Route path="/campers/:id/*" element={<CatalogDetailsPage/>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      
  </Suspense>
  );
};

export default App;
