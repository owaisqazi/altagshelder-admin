import React, { Suspense, lazy, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";

import Loader from "./common/Loader";
import ForgotPass from "./pages/Authentication/forgetPass";
import SignIn from "./pages/Authentication/SignIn";
import Index from "./pages/Dashboard/index";
import routes from "./routes";
import Adduser from "./pages/User/Adduser";

const DefaultLayout = lazy(() => import("./layout/DefaultLayout"));

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/forgotpass" element={<ForgotPass />} />
        <Route element={<DefaultLayout />}>
          <Route index element={<Index />} />
          {routes?.map((routes, index) => {
            const { path, component: Component } = routes;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    <Component />
                  </Suspense>
                }
              />
            );
          })}
        </Route>
      </Routes>
    </>
  );
}

export default App;
