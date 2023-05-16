
import './App.css';
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './screens/Login';

function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route exact path="/" element={<Home></Home>} />
        <Route exact path="/login" element={<Login></Login>} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
