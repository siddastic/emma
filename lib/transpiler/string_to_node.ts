import { EmmaElementNode, EmmaRootNode, EmmetOperations } from "../interface.js";

class StringToNode {
    constructor(private str: string) { }

    parse<T extends EmmaRootNode | EmmaElementNode>(isRootNode: Boolean = false): T {
        if (isRootNode) {
            return this.parseAsRootNode() as unknown as T;
        }
        return this.parseAsElementNode() as unknown as T;
    }

    public parseAsRootNode(): EmmaRootNode {
        return {
            emmet: this.str,
            type: 'root',
            currentLevelSplit: this.str,
            element: this.str,
            operations : this.containsMultiplier ? EmmetOperations.Multiply : undefined,
        };
    }

    get containsMultiplier(): Boolean  {
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