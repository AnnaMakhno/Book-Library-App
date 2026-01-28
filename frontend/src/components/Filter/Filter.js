import { useDispatch, useSelector } from "react-redux";
import {
    setTitleFilter,
    selectTitleFilter,
    resetFilters,
    setAuthorFilter,
    selectAuthorFilter,
    setOnlyFavoriteFilter,
    selectOnlyFavoriteFilter,
} from "../../redux/slices/filterSlice";
import "./Filter.css";
const Filter = () => {
    const dispatch = useDispatch();
    const titleFilter = useSelector(selectTitleFilter);
    const authorFilter = useSelector(selectAuthorFilter);
    const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter);

    const handleOnlyFavoriteFilterChange = () => {
        dispatch(setOnlyFavoriteFilter());
    };

    const handleAuthorFilterChange = (e) => {
        dispatch(setAuthorFilter(e.target.value));
    };

    const handleTitleFilterChange = (e) => {
        dispatch(setTitleFilter(e.target.value));
    };

    const handleResetFilters = () => {
        dispatch(resetFilters());
    };

    return (
        <div className="app-block filter">
            <div className="filter-row">
                <div className="filter-group">
                    <input
                        value={titleFilter}
                        type="text"
                        placeholder="filter by title ..."
                        onChange={handleTitleFilterChange}
                    />
                </div>
                <div className="filter-group">
                    <input
                        value={authorFilter}
                        type="text"
                        placeholder="filter by author ..."
                        onChange={handleAuthorFilterChange}
                    />
                </div>
                <div className="filter-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={onlyFavoriteFilter}
                            onChange={handleOnlyFavoriteFilterChange}
                        />
                        Only Favorite
                    </label>
                </div>
                <button
                    type="button"
                    onClick={handleResetFilters}
                >
                    Reset Filters
                </button>
            </div>
        </div>
    );
};

export default Filter;
