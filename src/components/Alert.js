import React from "react";

const Alert = (props) => {
  const capitalize = (word) => {
    if (word === "danger") {
      word = "error";
    }

    const letter = word.toLowerCase();
    return letter[0].toUpperCase() + letter.slice(1);
  };

  return (
    <div style={{ height: "40px" }}>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{capitalize(props.alert.type)}</strong> :{" "}
          {props.alert.message}
        </div>
      )}
    </div>
  );
};

export default Alert;
