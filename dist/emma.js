import MultiplicationParser from "./parser/multiplication_parser.js";
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
                var output = new StringToNode(leaf).parse();
                rootNode = output;
            }
            else {
                var output = new StringToNode(leaf).parse();
                rootNode.child = output;
            }
        });
        var parser;
        if (this.emmet.indexOf("*") > -1) {
            parser = new MultiplicationParser(rootNode);
        }
        else {
            parser = new SingleTagParser(rootNode);
        }
        console.log(parser.run());
        return parser.run();
        // console.log(JSON.stringify(rootNode, null, 2));
    };
    Emma.prototype.splitTree = function () {
        return this.emmet.split(">");
    };
    return Emma;
}());
// const parser = new Emma("ul>li*6");
// parser.open();
new Emma("#withId${Hii}*10").open();
new Emma(".with$Class*5").open();
new Emma("span#withId").open();
new Emma("h$.withClass${Heading $}*6").open();
new Emma("div{Hii}*5").open();
document.body.innerHTML += "<div>" + new Emma("h${Heading $}* 6").open() + "</div>";
document.body.innerHTML += "" + new Emma("li#withId${Hii this is line $}*100").open();
console.log(new Emma("ul>li*5"));
//# sourceMappingURL=emma.js.map