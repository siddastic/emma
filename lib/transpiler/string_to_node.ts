import { EmmaElementNode, EmmetOperations } from "../interface.js";

class StringToNode {
    constructor(private str: string) { }

    parse<T extends EmmaElementNode>(): T {
        return this.parseAsElementNode() as unknown as T;
        
    }

    get containsMultiplier(): boolean  {
        return this.str.indexOf("*") > -1;
    }

    public parseAsElementNode(): EmmaElementNode {
        return {
            type: 'element',
            currentLevelSplit: this.str,
            element: this.str,
            operations : this.containsMultiplier ? EmmetOperations.Multiply : undefined,
        };
    }
}

export default StringToNode;