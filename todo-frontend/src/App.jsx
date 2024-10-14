import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import TodoPage from "./pages/TodoPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/todo" element={<TodoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
