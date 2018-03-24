interface Alphabet {
    code:string,
    frequency: number
}
interface Tree {
    left: Tree | null,
    right: Tree | null,
    code: string,
    frequency: number
}
let frequency = (str:string) => {
    let array = str.split("").sort();

    let prev:string = '';
    let obj:Alphabet = {code: '',frequency: 0};
    let result:Array<Alphabet> = [];
    array.forEach(v => {
        if (v == prev) {
            obj.frequency+=1;
        } else {
            result.push(JSON.parse(JSON.stringify(obj)));
            obj.code = v;
            obj.frequency = 1;
        }
        prev = v;
    })
    result.shift();
    result.sort((v1, v2) => v1.frequency - v2.frequency)
    return result;
}



function generateTree(str:string):any {
    let frequencyArray:Array<Alphabet> = frequency(str);
    while(1) {
        let tree:Tree, newTree:Tree;
        let left:Tree = Object.assign({
            left: null,
            right: null
        }, frequencyArray[0]);
        let right:Tree = Object.assign({
            left: null,
            right: null
        }, frequencyArray[1]);
        tree = {
            left: left,
            right: right,
            code: '',
            frequency: left.frequency + right.frequency
        }
        frequencyArray.shift();
        frequencyArray.shift();
        frequencyArray.push(tree);
        if (frequencyArray.length == 1) {
            break;
        }

        frequencyArray.sort((v1, v2) => v1.frequency - v2.frequency);
    }
    return frequencyArray.shift();
}

let codeQueue:Array<number> = [];
function showHuffmanCode(tree:Tree|null) {
    if(tree != null) {
        if(tree.left == null && tree.right == null) {
            process.stdout.write(`code ${tree.code}: `);
            for(let i = 0; i < codeQueue.length; i++){
                process.stdout.write(`${String(codeQueue[i])}`)
            }
            process.stdout.write(`\n`)
        } else {
            codeQueue.push(0);
            showHuffmanCode(tree.left);
            codeQueue[codeQueue.length - 1] = 1;
            showHuffmanCode(tree.right);
        }
    }
}

function huffman(str:string) {
    let tree:Tree = generateTree(str);
    showHuffmanCode(tree);
}

huffman("adfaaddfhhhadfayqenv")