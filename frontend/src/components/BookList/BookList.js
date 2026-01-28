import { useSelector, useDispatch } from "react-redux";
import { BsBookmarkStarFill, BsBookmarkStar } from "react-icons/bs";
// import { deleteBook, toggleFavorite } from "../../redux/books/actionCreators";
import {
    deleteBook,
    toggleFavorite,
    selectBooks,
} from "../../redux/slices/booksSlice";
import {
    selectTitleFilter,
    selectAuthorFilter,
    selectOnlyFavoriteFilter,
} from "../../redux/slices/filterSlice";
import "./BookList.css";

const BookList = () => {
    const books = useSelector(selectBooks);
    const dispatch = useDispatch();
    const titleFilter = useSelector(selectTitleFilter);
    const authorFilter = useSelector(selectAuthorFilter);
    const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter);

    const handleDeleteBook = (id) => {
        dispatch(deleteBook(id));
    };

    const handleToggleFavorite = (id) => {
        dispatch(toggleFavorite(id));
    };

    const filteredBook = books.filter((book) => {
        const matchesTitle = book.title
            .toLowerCase()
            .includes(titleFilter.toLowerCase());
        const matchesAuthor = book.author
            .toLowerCase()
            .includes(authorFilter.toLowerCase());
        const matchesFavorite = onlyFavoriteFilter ? book.isFavorite : true;
        return matchesTitle && matchesAuthor && matchesFavorite;
    });

    const highlightText = (text, filter) => {
        if (!filter) return text;
        const regex = new RegExp(`(${filter})`, "gi");
        const parts = text.split(regex);
        return parts.map((part, index) =>
            regex.test(part) ? (
                <span
                    className="highlight"
                    key={index}
                >
                    {part}
                </span>
            ) : (
                part
            ),
        );
    };

    return (
        <div className="app-block book-list">
            <h2>Book List</h2>

            {filteredBook.length === 0 ? (
                <p>No books available</p>
            ) : (
                <ul>
                    {filteredBook.map((book, i) => (
                        <li key={book.id}>
                            <div className="book-info">
                                {++i} {highlightText(book.title, titleFilter)}{" "}
                                by{" "}
                                <strong>
                                    {highlightText(book.author, authorFilter)}
                                </strong>{" "}
                                ({book.source})
                            </div>
                            <div className="book-actions">
                                <span
                                    onClick={() => {
                                        handleToggleFavorite(book.id);
                                    }}
                                >
                                    {book.isFavorite ? (
                                        <BsBookmarkStarFill className="star-icon" />
                                    ) : (
                                        <BsBookmarkStar className="star-icon" />
                                    )}
                                </span>
                                <button
                                    onClick={() => {
                                        handleDeleteBook(book.id);
                                    }}
                                >
                                    {" "}
                                    Delete{" "}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BookList;
