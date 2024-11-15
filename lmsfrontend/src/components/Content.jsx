import AddBook from "./Book/AddBook";
import Booklist from "./Book/Booklist";
import Home from "./Home";
import Memberlist from "./Member/Memberlist";
import Rentallist from "./Rental/Rentallist";

export default function Content({ tab, setTab }) {
  return (
    <div>
      {tab === "home" && <Home />}
      {tab === "books" && <Booklist setTab={setTab} />}
      {tab === "addnewbook" && <AddBook />}
      {tab === "rentals" && <Rentallist setTab={setTab} />}
      {tab === "members" && <Memberlist setTab={setTab} />}
    </div>
  );
}
