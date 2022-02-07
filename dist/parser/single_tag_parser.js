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
import SpecialStrings from "../others/special_strings.js";
import NodeParser from "./node_parser.js";
var SingleTagParser = /** @class */ (function (_super) {
    __extends(SingleTagParser, _super);
    function SingleTagParser(emmet) {
        var _this = _super.call(this) || this;
        _this.emmet = emmet;
        return _this;
    }
    Object.defineProperty(SingleTagParser.prototype, "startsWithClass", {
        get: function () {
            return this.emmet.element.startsWith(".");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SingleTagParser.prototype, "startsWithId", {
        get: function () {
            return this.emmet.element.startsWith("#");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SingleTagParser.prototype, "containsClassInMiddle", {
        get: function () {
            return this.emmet.element.indexOf(".") > -1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SingleTagParser.prototype, "containsIdInMiddle", {
        get: function () {
            return this.emmet.element.indexOf("#") > -1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SingleTagParser.prototype, "containsText", {
        get: function () {
            return (this.emmet.element.indexOf("{") > -1 &&
                this.emmet.element.indexOf("}") > -1 &&
                this.emmet.element.indexOf("}") > this.emmet.element.indexOf("{"));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SingleTagParser.prototype, "haveSiblings", {
        get: function () {
            return this.emmet.element.indexOf("+") > -1;
        },
        enumerable: false,
        configurable: true
    });
    SingleTagParser.prototype.renderSiblings = function () {
        var _this = this;
        var siblings = this.emmet.element.split("+");
        var resString = "";
        siblings.forEach(function (sibling) {
            _this.emmet.element = sibling;
            resString += _this.run() + "\n";
        });
        return resString;
    };
    SingleTagParser.prototype.run = function () {
        var element = this.emmet.element;
        var specialStrings = new SpecialStrings(element);
        if (specialStrings.is)
            return specialStrings.get();
        if (this.haveSiblings) {
            return this.renderSiblings();
        }
        var text = "";
        if (this.containsText) {
            text = element.substring(element.indexOf("{") + 1, element.indexOf("}"));
            element = element.split("{")[0] + element.split("}")[1];
        }
        if (this.startsWithClass) {
            return "<div class = \"" + element.substring(1) + "\">" + text + "</div>";
        }
        else if (this.startsWithId) {
            return "<div id = \"" + element.substring(1) + "\">" + text + "</div>";
        }
        else if (this.containsClassInMiddle) {
            return "<" + element.split(".")[0] + " class = \"" + element.split(".")[1] + "\">" + text + "</" + element.split(".")[0] + ">";
        }
        else if (this.containsIdInMiddle) {
            return "<" + element.split("#")[0] + " id = \"" + element.split("#")[1] + "\">" + text + "</" + element.split("#")[0] + ">";
        }
        else {
            return "<" + element + ">" + text + "</" + element + ">";
        }
    };
    return SingleTagParser;
}(NodeParser));
export default SingleTagParser;
//# sourceMappingURL=single_tag_parser.js.map