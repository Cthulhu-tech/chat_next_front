import { JSXElementConstructor, ReactElement } from "react";

export type ChildComponent = {
    children: ReactElement| ReactElement<any, string | JSXElementConstructor<any>>;
};
