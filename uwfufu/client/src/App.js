import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './pages/home';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { Dashboard } from './pages/dashboard';
import { QuizDetalis } from './pages/quizDetails';
import { Quiz } from './pages/quiz';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>} />
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/quiz-details/:id' element={<QuizDetalis />} />
        <Route path='/quiz/:count/:id' element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
