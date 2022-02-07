export type EmmaNode = EmmaElementNode;

export interface EmmaElementNode {
    type: "element";
    // current element emmet string
    element: string;
    operations?: EmmetOperations;
    currentLevelSplit: string;
    child?: EmmaElementNode;
}

export interface EmmaTextNode {
    type: "text";
    content: string;
}

export enum EmmetOperations {
    Multiply,
}