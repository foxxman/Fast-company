import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
  const handleSort = (item) => {
    // console.log("item:", item);
    if (selectedSort.path === item)
      onSort({
        ...selectedSort,
        order: selectedSort.order === "asc" ? "desc" : "asc"
      });
    else onSort({ path: item, order: "asc" });
  };

  // console.log(selectedSort);

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={
              columns[column].path
                ? () => handleSort(columns[column].path)
                : undefined
            }
            className="text-center"
            scope="col"
            {...{ role: columns[column].path ? "button" : "" }}
          >
            {/* название столбца */}
            {columns[column].name}
            {/* направление сортировки, если есть */}
            {selectedSort.path && selectedSort.path === columns[column].path ? (
              selectedSort.order === "desc" ? (
                <i className="bi bi-caret-down-fill"></i>
              ) : (
                <i className="bi bi-caret-up-fill"></i>
              )
            ) : (
              ""
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired
};

export default TableHeader;
