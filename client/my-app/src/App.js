import './App.css';

import AdminLogin from './Components/Admin/AdminLogin/AdminLogin'
import AdminMain from './Components/Admin/AdminMain/AdminMain'
import AdminDashboard from './Components/Admin/AdminDashboard/AdminDashboard'
import AdminMovies from './Components/Admin/AdminMovies/AdminMovies'
import SeatLayout from './Components/Admin/AdminSeatLayout/AdminSeatLayout'
import AdminScreens from './Components/Admin/AdminScreens/AdminScreens'
import AdminMoviesSearch from './Components/Admin/AdminMoviesSearch/AdminMoviesSearch'
import AdminSeatLayoutAdd from './Components/Admin/AdminSeatLayoutAdd/AdminSeatLayoutAdd'
import AdminScreenAdd from './Components/Admin/AdminScreenAdd/AdminScreenAdd';
import AdminMoviesAdd from './Components/Admin/AdminMoviesAdd/AdminMoviesAdd'



import HomeMain from './Components/Home/HomeMain/HomeMain'

import MovieTimings from './Components/Home/MovieTimings/MovieTimings';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {

  return (
 
<>
<Router>
  <div>
    <Routes>
    <Route path="/" exact element={<HomeMain p={1}/>}/>
    <Route path="/:city/:movies/:id" exact element={<HomeMain p={2}/>}/>
    <Route path="/:city/buytickets/:id" exact element={<HomeMain p={3}/>}/>
    <Route path="/:city/buytickets/:id/seatlayout" exact element={<HomeMain p={4}/>}/>
    <Route path="/payment" exact element={<HomeMain p={5}/>}/>
    <Route path="/admin/login" exact element={<AdminLogin/>}/>
    <Route path="/admin/dashboard" exact element={<AdminMain  p={<AdminDashboard/>  } btncolor={0}/>}/>
    <Route path="/admin/movies" exact element={<AdminMain  p={<AdminMovies/>} btncolor={1}/>}/>
    
    <Route path="/admin/seatlayout" exact element={<AdminMain  p={<SeatLayout/>} btncolor={2}/>}/>
    <Route path="/admin/seatlayout/add" exact element={<AdminMain  p={<AdminSeatLayoutAdd/>} btncolor={2}/>}/>

      
    <Route path="/admin/screens" exact element={<AdminMain  p={<AdminScreens/>} btncolor={3}/>}/>
    <Route path="/admin/screens/add" exact element={<AdminMain  p={<AdminScreenAdd/>} btncolor={3}/>}/>
    <Route path="/admin/movies/search" exact element={<AdminMain  p={<AdminMoviesSearch/>} btncolor={1}/>}/>

    <Route path="/admin/movies/add/:id" exact element={<AdminMain  p={<AdminMoviesAdd/>} btncolor={1}/>}/>
    </Routes>

  

    </div>
</Router>


</>

  );
}

export default App;
