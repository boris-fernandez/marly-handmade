import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ComplaintsBook from "./pages/ComplaintsBook";
import TermsConditions from "./pages/TermsConditions";

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/complaints-book' element={<ComplaintsBook />} />
        <Route path='/terms-conditions' element={<TermsConditions />} />
      </Routes>
    </>
  );
}

export default App;
