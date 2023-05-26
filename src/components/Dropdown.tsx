import React from "react";

interface dropDownProps {
  for:string[]
}
export const Dropdown:React.FC<dropDownProps> = (props) => {
 
  return (
    <>
      {props.for.map((field) => (
        <>
          <option value={field}>{field} </option>
        </>
      ))}
    </>
  );
};
