import React from "react";
import { CompOne, CompOneEventPayload } from "./CompOne";

export const CompTwo = () => {
  const [message, setMessage] = React.useState("");
  const listener = (e: CustomEvent<CompOneEventPayload>) =>
    setMessage(e.detail.message);

  React.useEffect(() => {
    CompOne.subscribe(listener);
    return () => CompOne.unsubscribe(listener);
  }, []);

  return (
    <div>
      CompTwo (subscriber)
      <br />
      <textarea defaultValue={message} readOnly disabled />
    </div>
  );
};
