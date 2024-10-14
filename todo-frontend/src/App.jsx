import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import SignUpPage from "./pages/signupPage/SignUpPage";
import SignInPage from "./pages/signinPage/SignInPage";
import TodoPage from "./pages/todoPage/TodoPage";
import { useSelector } from "react-redux";

function App() {
  const token = useSelector((state) => state.auth.token);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/todo" /> : <SignInPage />}
        />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route
          path="/todo"
          element={token ? <TodoPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
