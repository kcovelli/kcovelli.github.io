import fs = require('fs');
import {BagOfCrafting} from './BagOfCrafting';
import {XmlParser} from './XmlParser';

let pools = XmlParser.loadPools(fs.readFileSync('assets/itempools.xml', 'utf8'));
let meta = XmlParser.loadMeta(fs.readFileSync('assets/items_metadata.xml', 'utf8'));
let items = XmlParser.loadItems(fs.readFileSync('assets/items.xml', 'utf8'));
let bc = new BagOfCrafting(pools, meta);

// 'aaaaaaaa' to [1,1,1,1,1,1,1,1]
let asciiToNum = (s: string) => s.split('').map(c => c.charCodeAt(0) - 0x61);
let numToAscii = (n: number[]) => String.fromCharCode(...n.map(i => i + 0x61));
let recipes = bc.calculateAllRecipes(asciiToNum('bbbbbbbbccccccccddddddddeeeeeeee'));
for (let [r, c] of recipes) {
    console.log(items?.get(r)?.name, numToAscii(c))
}
console.log('done');