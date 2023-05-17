import logo from './logo.svg';
import './App.css';
import {Routes, Route, Link} from 'react-router-dom';
import Main from './components/Main';
import New from './components/New';
import Edit from './components/Edit';

function App() {
  return (
    <div className="App">
      <h1>Favorite Authors</h1>
      {/* THEATER STAGE */}
      <Routes>
        {/* SHOW ALL */}
        <Route path='/' element={<Main/>}/>
        {/* CREATE */}
        <Route path='/new' element={<New/>}/>
        {/* READ ONE AND EDIT */}
        <Route path='/edit/:id' element={<Edit/>}/>
      </Routes>
    </div>
  );
}

export default App;
