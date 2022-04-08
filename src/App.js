import './App.css';
import {Routes, Route} from "react-router-dom";
import UsersList from "./components/UsersList/UsersList";
import ManageUser from "./components/ManageUser/ManageUser";

function App() {
  return (
   <Routes>
     <Route path='/' element={<UsersList />}/>
     <Route path='/edit' element={<ManageUser />}/>
     <Route path='/add' element={<ManageUser />}/>
   </Routes>
  );
}

export default App;
