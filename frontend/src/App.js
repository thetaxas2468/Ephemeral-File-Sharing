import 'bootstrap/dist/css/bootstrap.min.css';
import FileSharing from './components/FileSharing';
import "./App.css";
import Error from './pages/Error';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Memepage from './pages/Memepage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/:file' element={<Memepage />}></Route>
        <Route path='/' element={<FileSharing />}></Route>
        <Route path='*' element={<Error />}></Route>
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
