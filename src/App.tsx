import { BrowserRouter, Routes,Route } from "react-router-dom";
import "./App.css";
import AppRouter from "./router/AppRouter";
import Layout from "./layout/Layout";

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Layout/>}></Route>
    </Routes>
    
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
