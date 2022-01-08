import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
// _.get(item, columns[column].path) -откда берем и по какому пути

const TableBody = ({ data, columns }) => {
  const renderContent = (item, column) => {
    /* если существует lumns[column].component, 
        то отображаем его, иначе _.get(item, columns[column].path) */
    // columns[column].component || _.get(item, columns[column].path);
    if (columns[column].component) {
      const component = columns[column].component;
      if (typeof component === "function") return component(item);
      return component;
    }
    return _.get(item, columns[column].path);
  };

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {Object.keys(columns).map((column) => (
            <td key={column}>{renderContent(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired
};

export default TableBody;
