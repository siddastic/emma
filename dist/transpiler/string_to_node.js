import { EmmetOperations } from "../interface.js";
var StringToNode = /** @class */ (function () {
    function StringToNode(str) {
        this.str = str;
    }
    StringToNode.prototype.parse = function () {
        return this.parseAsElementNode();
    };
    Object.defineProperty(StringToNode.prototype, "containsMultiplier", {
        get: function () {
            return this.str.indexOf("*") > -1;
        },
        enumerable: false,
        configurable: true
    });
    StringToNode.prototype.parseAsElementNode = function () {
        return {
            type: 'element',
            currentLevelSplit: this.str,
            element: this.str,
            operations: this.containsMultiplier ? EmmetOperations.Multiply : undefined,
        };
    };
    return StringToNode;
}());
export default StringToNode;
//# sourceMappingURL=string_to_node.js.map