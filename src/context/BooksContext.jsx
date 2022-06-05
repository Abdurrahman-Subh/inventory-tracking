import { useState, useEffect, createContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../firebase";
export const BooksContext = createContext({});

export const BooksContextProvider = (props) => {
  const [books, setBooks] = useState([]);
  //Search State
  const [searchQuery, setSearchQuery] = useState("");

  //Search Function
  const search = (task) => {
    return task.filter((item) =>
      item.name.toString().toLowerCase().includes(searchQuery)
    );
  };
  const booksCollectionRef = query(
    collection(db, "books"),
    orderBy("createdAt", "desc")
  );
  useEffect(() => {
    const getBooks = async () => {
      const data = await getDocs(booksCollectionRef);
      setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getBooks();
  }, []);
  const notify = () => {
    toast.success("Book added to your collection");
  };

  /************************************************************/
  return (
    <BooksContext.Provider
      value={{
        books,
        search,
        setSearchQuery,
      }}
    >
      {props.children}
    </BooksContext.Provider>
  );
};
