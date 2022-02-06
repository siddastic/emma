export interface EmmaRootNode{
    type: 'root';
    element: string;
    emmet: string;
    operations?: EmmetOperations;
    currentLevelSplit: string;
    child?: EmmaNode;
}

export type EmmaNode = EmmaRootNode | EmmaElementNode;

export interface EmmaElementNode {
    type: "element";
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
    Add,
    Multiply,
}