import SingleTagParser from "./parser/single_tag_parser.js";
import StringToNode from "./transpiler/string_to_node.js";
var Emma = /** @class */ (function () {
    function Emma(emmet) {
        this.emmet = emmet;
    }
    // public parse() : BaseEmmaNode{}
    // public parse(){
    //     var arr = this.splitTree();
    //     arr.forEach(leaf=>{
    //         if(this.containsMultiplier(leaf)){
    //             var splitted = leaf.split("*");
    //             // var node = new MultiplierEmmaNode(splitted[0], splitted[1]);
    //             var elementToMultiply = splitted[0];
    //             var multiplier = parseInt(splitted[1]);
    //             for(var i = 0; i < multiplier; i++){
    //                 console.log(`<${elementToMultiply}></${elementToMultiply}>`);
    //             }
    //         }
    //     });
    // }
    Emma.prototype.open = function () {
        var arr = this.splitTree();
        var rootNode;
        arr.forEach(function (leaf, index) {
            if (index == 0) {
                // parsing root node
                var output = new StringToNode(leaf).parse(true);
                rootNode = output;
            }
            else {
                var output = new StringToNode(leaf).parse();
                rootNode.child = output;
            }
        });
        var singleTagParser = new SingleTagParser(rootNode);
        console.log(singleTagParser.run());
        console.log(JSON.stringify(rootNode, null, 2));
    };
    Emma.prototype.containsMultiplier = function (emmet) {
        return emmet.indexOf("*") > -1;
    };
    Emma.prototype.splitTree = function () {
        return this.emmet.split(">");
    };
    return Emma;
}());
// const parser = new Emma("ul>li*6");
// parser.open();
new Emma("#withId").open();
new Emma(".withClass").open();
new Emma("span#withId").open();
new Emma("h1.withClass").open();
new Emma("div").open();
