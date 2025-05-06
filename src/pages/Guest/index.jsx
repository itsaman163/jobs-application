import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import routesList from "../../routes";
import Loader from "../../components/Loader/Loader";

const Guest = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {routesList.map((row, index) => {
          if (row.allowWithoutLogin) {
            return (
              <Route
                key={index}
                exact
                path={row.path}
                item={row}
                element={<row.component />}
              />
            );
          }
        })}
      </Routes>
    </Suspense>
  );
};

export default Guest;
