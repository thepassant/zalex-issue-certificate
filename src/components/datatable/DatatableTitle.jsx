import DatatableSearch from "./DatatableSearch";

const DatatableTitle = ({ title, searchConfig, isSearch }) => (
  <>
    {(title || isSearch) && (
      <div className="datatable-title-wrapper">
        {title && <h2 className="table-title">{title}</h2>}
        <div style={{ flex: title ? "1 1 10%" : "1" }} />
        {isSearch && (
          <DatatableSearch
            onSearch={searchConfig.onSearch}
            disabled={searchConfig.isSearchDisabled}
            isDebounce={searchConfig.isDebounce}
          />
        )}
      </div>
    )}
  </>
);
export default DatatableTitle;
