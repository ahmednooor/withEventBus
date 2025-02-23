import React from "react";
import { withEventBus } from "./withEventBus";

export type CompOneEventPayload = {
  message: string;
};

type CompOneProps = {};

export const CompOne = withEventBus<CompOneEventPayload, CompOneProps>(
  (publish) =>
    ({}) => {
      const [message, setMessage] = React.useState("");

      return (
        <div>
          CompOne (publisher)
          <br />
          <textarea
            value={message}
            onChange={(e) => {
              setMessage(e.currentTarget.value);
              publish({ message: e.currentTarget.value });
            }}
          />
        </div>
      );
    }
);
