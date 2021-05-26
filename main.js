
// const {xmlData} = require("./xmlData")
// const {BagOfCrafting} = require("./dist/BagOfCrafting");
// const {XmlParser} = require("./dist/XmlParser");

console.log(xmlData)
//
// let pools = XmlParser.loadPools(fs.readFileSync('assets/itempools.xml', 'utf8'));
// let meta = XmlParser.loadMeta(fs.readFileSync('assets/items_metadata.xml', 'utf8'));
// let items = XmlParser.loadItems(fs.readFileSync('assets/items.xml', 'utf8'));
// let bc = new BagOfCrafting(pools, meta);
//
// // 'aaaaaaaa' to [1,1,1,1,1,1,1,1]
// let asciiToNum = s => s.split('').map(c => c.charCodeAt(0) - 0x61);
// let numToAscii = n => String.fromCharCode(...n.map(i => i + 0x61));
//
// let recipes = bc.calculateAllRecipes(asciiToNum('bbbbbbbbccccccccddddddddeeeeeeee'));
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
                this.$data.amnt++
            else if (this.$data.amnt > 0)
                this.$data.amnt--
        }

    },
    template: `
          <div class="m-1">
          <img v-bind:src='"assets/img/mats/" + id + ".png"' width=32/>
          <input type=number v-model="amnt" v-on:wheel.prevent="handleScroll" placeholder=0 min=0
                 style="width: 3em" class="text-center">
          </div>
        `
})

// item display
Vue.component('item-disp', {
    props: ['itemId'],
    data: function () {
        let i = this.itemId
        return {
            imgLoc: 'assets/img/items/collectibles_'+
                (i < 10 ? '00' : i < 100 ? '0' : '') +
                i + '.png',
        }
    },
    template: `
          <img v-bind:src=imgLoc  height="64" width="64"/>
        `
});

const app = new Vue({
    el: '#app',
    data: {
        validIds: (() => { // this is dumb lmao
            let ret = []
            let invalidIds = new Set([43, 59, 61, 235, 587, 613, 620, 630, 662, 666, 718])
            for (let i = 1; i <= 728; i++) {
                if (invalidIds.has(i)) continue;
                ret.push(i)
            }
            return ret
        })()

    },

})

