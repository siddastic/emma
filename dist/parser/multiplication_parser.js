var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import NodeParser from "./node_parser.js";
import SingleTagParser from "./single_tag_parser.js";
var MultiplicationParser = /** @class */ (function (_super) {
    __extends(MultiplicationParser, _super);
    function MultiplicationParser(emmet) {
        var _this = _super.call(this) || this;
        _this.emmet = emmet;
        return _this;
    }
    Object.defineProperty(MultiplicationParser.prototype, "containsNumberingPlaceholder", {
        get: function () {
            return this.emmet.element.indexOf("$") > -1;
        },
        enumerable: false,
        configurable: true
    });
    MultiplicationParser.prototype.run = function () {
        var resultString = "";
        var element = this.emmet.element;
        var splitted = element.split("*");
        var emmetString = splitted[0];
        var multiplier = Number(splitted[1]);
        var parsedValue = new SingleTagParser({
            element: emmetString,
            child: undefined,
            type: "element",
            currentLevelSplit: emmetString,
        }).run();
        for (var i = 0; i < multiplier; i++) {
            if (this.containsNumberingPlaceholder) {
                resultString += parsedValue.replace(/\$/g, (i + 1).toString());
            }
            else {
                resultString += parsedValue;
            }
            resultString += "\n";
        }
        return resultString;
    };
    return MultiplicationParser;
}(NodeParser));
export default MultiplicationParser;
//# sourceMappingURL=multiplication_parser.js.map