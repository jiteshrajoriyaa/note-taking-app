import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { GoogleCallback } from "./components/GoogleCallback";
import { CreateNote } from "./components/createNote";
import { FRONTEND_URL } from "./config";

function App () {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path={`${FRONTEND_URL}/auth/google/callback`} element={<GoogleCallback/>} />
        <Route path={`/create-note`} element={<CreateNote/>} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App