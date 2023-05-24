import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header';
import Footer from './components/Footer';
import List from './components/List';
import Swal from 'sweetalert2';
import {Routes, Route} from 'react-router-dom'
import Create from './components/Create';
import Update from './components/Update';
import { useState } from 'react';
function App() {
  const [name,setName] =useState('')
  return (
    <div >
     <Header sendData={setName}></Header>
     <Routes>
      <Route path='' element={<List getData={name}></List>} />
      {/* <Route path='search/:name' element={<List ></List>} /> */}
      <Route path='create' element={<Create />} />
      <Route path='update/:id' element={<Update />} />
     </Routes>
     <Footer></Footer>
    </div>
  );
}

export default App;
