import { React, memo } from "react";

export default memo(function MyButton(props) {
  console.log("rendering MyButton");
//   const startTime = new Date(); /// to apply some delay
//   while (new Date() - startTime < 1000) {}

  return <button {...props} style={{ color: "red" }} />;
});
