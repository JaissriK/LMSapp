import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Booklist from "./components/Book/Booklist";
import Home from "./components/Home";
import Rentallist from "./components/Rental/Rentallist";
import Memberlist from "./components/Member/Memberlist";
import AddBook from "./components/Book/AddBook";
import EditBook from "./components/Book/EditBook";
import AddMember from "./components/Member/AddMember";
import PageNotFound from "./components/PageNotFound";
import Header from "./components/Header";
import EditMember from "./components/Member/EditMember";
import AddRental from "./components/Rental/AddRental";
import EditRental from "./components/Rental/EditRental";
import Login from "./components/Login";
import Content from "./components/Content";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Content />}>
          <Route path="/home" element={<Home />} />
          <Route path="/books" element={<Booklist />} />
          <Route path="/newbook" element={<AddBook />} />
          <Route path="/books/:bookid/edit" element={<EditBook />} />
          <Route path="/members" element={<Memberlist />} />
          <Route path="/newmember" element={<AddMember />} />
          <Route path="/members/:memberid/edit" element={<EditMember />} />
          <Route path="/rentals" element={<Rentallist />} />
          <Route path="/newrental" element={<AddRental />} />
          <Route path="/rentals/:rentalid/edit" element={<EditRental />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
