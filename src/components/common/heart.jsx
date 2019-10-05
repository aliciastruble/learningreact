import React from "react";

const Heart = props => {
  let classNames = "fa fa-heart";
  if (!props.liked) classNames += "-o";
  return (
    <i
      onClick={props.changeLiked}
      style={{ cursor: "pointer" }}
      className={classNames}
      aria-hidden="true"
    ></i>
  );
};

export default Heart;
