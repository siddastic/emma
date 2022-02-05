import { EmmetOperations } from "./interface.js";
var StringParser = /** @class */ (function () {
    function StringParser(str) {
        this.str = str;
    }
    StringParser.prototype.parse = function (isRootNode) {
        if (isRootNode === void 0) { isRootNode = false; }
        if (isRootNode) {
            return this.parseAsRootNode();
        }
        return this.parseAsElementNode();
    };
    StringParser.prototype.parseAsRootNode = function () {
        return {
            emmet: this.str,
            type: 'root',
            currentLevelSplit: this.str,
            element: this.str.split("*")[0],
            operations: this.containsMultiplier ? EmmetOperations.Multiply : undefined,
        };
    };
    Object.defineProperty(StringParser.prototype, "containsMultiplier", {
        get: function () {
            return this.str.indexOf("*") > -1;
        },
        enumerable: false,
        configurable: true
    });
    StringParser.prototype.parseAsElementNode = function () {
        return {
            type: 'element',
            currentLevelSplit: this.str,
            element: this.str.split("*")[0],
            operations: this.containsMultiplier ? EmmetOperations.Multiply : undefined,
        };
    };
    return StringParser;
}());
export default StringParser;
