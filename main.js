const {BagOfCrafting} = require("./dist/BagOfCrafting");
const {XmlParser} = require("./dist/XmlParser");
const {xmlData} = require('./xmlData');

let pools = XmlParser.loadPools(xmlData.itemPoolXml);
let meta = XmlParser.loadMeta(xmlData.itemMetaXml);
let items = XmlParser.loadItems(xmlData.itemXml);
let bc = new BagOfCrafting(pools, meta);

console.log(bc);
// // 'aaaaaaaa' to [1,1,1,1,1,1,1,1]
let asciiToNum = s => s.split('').map(c => c.charCodeAt(0) - 0x61);
let numToAscii = n => String.fromCharCode(...n.map(i => i + 0x61));

let buildComponentArr = matList => {
    let ans = [];
    for (let i in matList) {
        for (let j =0; j < matList[i]; j++) {
            ans.push(parseInt(i)+1)
        }
    }
    return ans;
};


// let recipes = bc.calculateAllRecipes([9]);
// for (let [r, c] of recipes) {
//     console.log(items?.get(r)?.name, numToAscii(c))
// }
// console.log('done');

// material input
Vue.component('mat-input', {
    props: ['id'],
    data: () => {
        return {
            amnt: 0,
        }
    },
    methods: {
        handleScroll: function (event) {
            if (event.deltaY < 0)
                this.$data.amnt++;
            else if (this.$data.amnt > 0)
                this.$data.amnt--
        }

    },
    updated() {
        this.$root.$data.matAmnts[this.$props.id - 1] = this.$data.amnt;
        // console.log(this.$root.$data.matAmnts);
        let inputArr = buildComponentArr(this.$root.$data.matAmnts);
        // console.log(inputArr);
        let craftable = bc.calculateAllRecipes(inputArr);
        this.$root.$data.craftable = craftable;
        this.$root.$emit('craftableUpdated', craftable)
        console.log('craftableUpdated event emitted', craftable)
    },
    template: `
        <div class="m-1">
            <img v-bind:src='"assets/img/mats/" + id + ".png"' width=32/>
            <input type=number v-model="amnt" v-on:wheel.prevent="handleScroll" placeholder=0 min=0
                   style="width: 3em" class="text-center">
        </div>
    `
});
// item display
Vue.component('item-disp', {
    props: ['itemId'],
    data: function () {
        let i = this.itemId;
        return {
            visible: false,
            recipes:[],
            imgLoc: 'assets/img/items/collectibles_' +
                (i < 10 ? '00' : i < 100 ? '0' : '') +
                i + '.png'
        }
    },
    mounted: function () {
        this.$root.$on('craftableUpdated', (craftable) => {
            // console.log('craftableUpdated event received');
            if (craftable.has(this.itemId)) {
                this.visible = true
                this.recipes = craftable.get(this.itemId)
                console.log(this)
            }
        });
    },
    template: `
      <div v-show="visible" style="float: left">
        <img v-bind:src=imgLoc height="64" width="64"/>
      </div>
    `
});
var vm = new Vue({
    el: '#app',
    data: {
        matAmnts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        craftable: new Map(),
        allIds: (() => { // this seems dumb lmao
            let ret = [];
            let invalidIds = new Set([43, 59, 61, 235, 587, 613, 620, 630, 662, 666, 718]);
            for (let i = 1; i <= 728; i++) {
                if (invalidIds.has(i)) continue;
                ret.push(i)
            }
            return ret
        })()

    },

});

