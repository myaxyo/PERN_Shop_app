import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/Navbar";
import { login } from "./features/user/userSlice";
import { check } from "./http/userAPI";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkLogin = (data) => {
    dispatch(login(data));
  };
  useEffect(() => {
    check()
      .then((data) => {
        checkLogin(data);
      })
      .finally(() => setLoading(false));
  }, [checkLogin]);
  if (loading) {
    return <Spinner animation="grow" />;
  }
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
