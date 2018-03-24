"use strict";
var frequency = function (str) {
    var array = str.split("").sort();
    var prev = '';
    var obj = { code: '', frequency: 0 };
    var result = [];
    array.forEach(function (v) {
        if (v == prev) {
            obj.frequency += 1;
        }
        else {
            result.push(JSON.parse(JSON.stringify(obj)));
            obj.code = v;
            obj.frequency = 1;
        }
        prev = v;
    });
    result.shift();
    result.sort(function (v1, v2) { return v1.frequency - v2.frequency; });
    return result;
};
function generateTree(str) {
    var frequencyArray = frequency(str);
    while (1) {
        var tree = void 0, newTree = void 0;
        var left = Object.assign({
            left: null,
            right: null
        }, frequencyArray[0]);
        var right = Object.assign({
            left: null,
            right: null
        }, frequencyArray[1]);
        tree = {
            left: left,
            right: right,
            code: '',
            frequency: left.frequency + right.frequency
        };
        frequencyArray.shift();
        frequencyArray.shift();
        frequencyArray.push(tree);
        if (frequencyArray.length == 1) {
            break;
        }
        frequencyArray.sort(function (v1, v2) { return v1.frequency - v2.frequency; });
    }
    return frequencyArray.shift();
}
var codeQueue = [];
function showHuffmanCode(tree) {
    if (tree != null) {
        if (tree.left == null && tree.right == null) {
            process.stdout.write("code " + tree.code + ": ");
            for (var i = 0; i < codeQueue.length; i++) {
                process.stdout.write("" + String(codeQueue[i]));
            }
            process.stdout.write("\n");
        }
        else {
            codeQueue.push(0);
            showHuffmanCode(tree.left);
            codeQueue[codeQueue.length - 1] = 1;
            showHuffmanCode(tree.right);
        }
    }
}
function huffman(str) {
    var tree = generateTree(str);
    showHuffmanCode(tree);
}
huffman("adfaaddfhhhadfayqenv");
//# sourceMappingURL=index.js.map