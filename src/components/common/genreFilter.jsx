import React from "react";

const GenreFilter = props => {
  const { items, textProperty, idProperty, selectedItem, onItemSelect } = props;
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          key={item[idProperty]}
          className={
            selectedItem === item ? "list-group-item active" : "list-group-item"
          }
          onClick={() => onItemSelect(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

GenreFilter.defaultProps = {
  textProperty: "name",
  idProperty: "_id"
};

export default GenreFilter;
