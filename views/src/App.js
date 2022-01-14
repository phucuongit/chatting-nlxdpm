import './App.scss'
import  { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Chat from './components/layouts/chat';
import Start from './components/layouts/start';

function App() {

//set main routes
import Chat from './components/layouts/chat'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/*' element={<Start/>}/>
        <Route path='/me' element={<Navigate to='/me/uid'/>}/>
        <Route path='/me/:uid' element={<Chat/>}/>
      </Routes>
    </Router>
  );
}

export default App;
