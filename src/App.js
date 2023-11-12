import './App.css';
import { BrowserRouter as Router, Route, Switch, BrowserRouter, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingList from './pages/Shopping-list';
import NoPage from './pages/NoPage';
import Layout from "./pages/Layout";
import ShoppingLists from './pages/Shopping-lists';


function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
          <Route path="/shopping-list/:id" element={<ShoppingList />} />
          <Route path="/shopping-lists" element={<ShoppingLists />} />
          <Route path="*" element={<NoPage/>} />
        </Routes>
       </BrowserRouter> 
    </div>
  );
}

export default App;
