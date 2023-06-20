import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth/index";

import Layout from "./components/Layout/index";
import Main from "./pages/Main/index";
import About from "./pages/About/index";
import Signin from "./pages/Signin/index";
import Signup from "./pages/Signup/index";

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="about" element={<RequireAuth element={<About />} />} />
        </Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}
