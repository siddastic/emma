import { EmmetOperations } from "../interface.js";
var StringToNode = /** @class */ (function () {
    function StringToNode(str) {
        this.str = str;
    }
    StringToNode.prototype.parse = function (isRootNode) {
        if (isRootNode === void 0) { isRootNode = false; }
        if (isRootNode) {
            return this.parseAsRootNode();
        }
        return this.parseAsElementNode();
    };
    StringToNode.prototype.parseAsRootNode = function () {
        return {
            emmet: this.str,
            type: 'root',
            currentLevelSplit: this.str,
            element: this.str,
            operations: this.containsMultiplier ? EmmetOperations.Multiply : undefined,
        };
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