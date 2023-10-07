import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import routesList from "../../routes";
import Loader from "../../components/Loader/Loader";
// import Loader from "../../components/Loader";

const Guest = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const { isLogin } = useContext(LoginContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isLogin) {
//     //   console.log(redirectUrl)
//       navigate('/');
//     }
//   }, [isLogin]);
  return (
    <Suspense  fallback={<Loader />}>
      <Routes>
        {routesList.map((row, index) => {
            if (row.allowWithoutLogin) {
              console.log(row.path, row.component)
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
