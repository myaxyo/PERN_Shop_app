import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";

const AppRouter = () => {
  const { isAuth } = useSelector((state) => state.user);

  return (
    <div>
      <Routes>
        {isAuth &&
          authRoutes.map(({ path, Component }) => {
            return <Route key={path} element={<Component />} path={path} />;
          })}
        {publicRoutes.map(({ path, Component }) => {
          return <Route key={path} element={<Component />} path={path} />;
        })}
      </Routes>
    </div>
  );
};

export default AppRouter;
