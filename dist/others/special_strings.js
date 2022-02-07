var SpecialStrings = /** @class */ (function () {
    function SpecialStrings(alias) {
        this.alias = alias;
        this.map = {
            "!": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\" />\n    <title>Document</title>\n</head>\n<body>\n    \n</body>\n</html>",
            br: "<br/>",
        };
    }
    Object.defineProperty(SpecialStrings.prototype, "is", {
        get: function () {
            return this.map[this.alias] !== undefined;
        },
        enumerable: false,
        configurable: true
    });
    SpecialStrings.prototype.get = function () {
        return this.map[this.alias];
    };
    return SpecialStrings;
}());
export default SpecialStrings;
//# sourceMappingURL=special_strings.js.map