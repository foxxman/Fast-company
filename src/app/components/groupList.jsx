import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
  items,
  valueProperty,
  contentProperty,
  onItemSelect,
  selectedItem
}) => {
  return (
    <ul className="list-group">
      {Array.isArray(items)
        ? items.map((item) => (
            <li
              onClick={() => onItemSelect(item)}
              key={item[valueProperty]}
              className={
                "list-group-item" + (item === selectedItem ? " active" : "")
              }
              role={"button"}
            >
              {item[contentProperty]}
            </li>
          ))
        : Object.keys(items).map((item) => (
            <li
              onClick={() => onItemSelect(items[item])}
              key={items[item][valueProperty]}
              className={
                "list-group-item" +
                (items[item] === selectedItem ? " active" : "")
              }
              role={"button"}
            >
              {items[item][contentProperty]}
            </li>
          ))}
    </ul>
  );
};

GroupList.defaultProps = {
  valueProperty: "_id",
  contentProperty: "name"
};

GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func,
  selectedItem: PropTypes.object
};

export default GroupList;
