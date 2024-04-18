import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./router/AppRouter";
import { useAppDispatch } from "./hooks/hooks";
import { fetchCurrentUser, setIsInitializing } from "./slices/userSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      dispatch(fetchCurrentUser());
    } else {
      // Явно указываем, что инициализация завершена, если accessToken отсутствует
      dispatch(setIsInitializing(false));
    }
  }, [dispatch]);
  
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
