import { useCallback, useState } from "react";
import useDebounce from "../../customHooks/useDebounce";

const DatatableSearch = ({ onSearch, disabled, isDebounce }) => {
  const [query, setQuery] = useState("");

  const debouncedSearch = useDebounce(
    useCallback(
      (nextValue) => {
        onSearch && onSearch(nextValue);
      },
      [onSearch]
    ),
    500
  );

  const onDebounceChangeHandler = useCallback(
    ({ target: { value } }) => {
      setQuery(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  const onNoDebounceChangeHandler = ({ target: { value } }) => {
    setQuery(value);
    onSearch && onSearch(value);
  };

  return (
    <div className="search-wrapper">
      <input
        type="text"
        value={query}
        onChange={
          isDebounce ? onDebounceChangeHandler : onNoDebounceChangeHandler
        }
        className="input-elevated"
        placeholder="Search..."
        disabled={disabled}
      />
    </div>
  );
};

export default DatatableSearch;
