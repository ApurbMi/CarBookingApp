import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import CarList from "./Pages/CarList";
import Layout from "./Layout";
import CarInfo from "./Pages/CarInfo";
import MyBooking from "./Pages/MyBooking";
import Main from "./AdminPanel/Main";
import EditAndDelete from "./AdminPanel/EditAndDelete";
import MaintainBooking from "./AdminPanel/MaintainBooking";
import AddCar from "./AdminPanel/AddCar";
import Dashboard from "./AdminPanel/Dashboard";
import { Toaster } from "react-hot-toast";
import EditCar from "./AdminPanel/EditCar";

function App() {
  return (
    <BrowserRouter>
     <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="cars" element={<CarList />} />
          <Route path="car/:id" element={<CarInfo />} />
          <Route path="my-bookings" element={<MyBooking />} />
        </Route>
        <Route path="/admin" element={<Main />}>
          <Route path='dashboard' element={<Dashboard/>}/>
          <Route path="add" element={<AddCar />} />
          <Route path="edit" element={<EditAndDelete />} />
          <Route path="maintain" element={<MaintainBooking />} />
          <Route path="editCar/:Id" element={<EditCar/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
