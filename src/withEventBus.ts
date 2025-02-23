import React from "react";

declare global {
  interface WindowEventMap {
    [key: string]: CustomEvent;
  }
}

type CustomEventListener<T> = (e: CustomEvent<T>) => void;

export function withEventBus<T, P = {}>(
  componentConstructor: (
    publish: (payload: T) => boolean
  ) => React.FunctionComponent<P> & {
    subscribe?: (listener: CustomEventListener<T>) => void;
    unsubscribe?: (listener: CustomEventListener<T>) => void;
  }
) {
  const eventName = makeId(12);

  const publish = (payload: T) =>
    window.dispatchEvent(new CustomEvent<T>(eventName, { detail: payload }));

  const subscribe = (listener: CustomEventListener<T>) =>
    window.addEventListener(eventName, listener);

  const unsubscribe = (listener: CustomEventListener<T>) =>
    window.removeEventListener(eventName, listener);

  const Component = componentConstructor(publish);
  Component.subscribe = subscribe;
  Component.unsubscribe = unsubscribe;

  return Component as React.FunctionComponent<P> & {
    subscribe: (listener: CustomEventListener<T>) => void;
    unsubscribe: (listener: CustomEventListener<T>) => void;
    [key: string | number]: unknown;
  };
}

// https://stackoverflow.com/a/1349426
function makeId(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
