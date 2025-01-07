import {one} from "./1.js"
import {two} from "./2.js"
import {three} from "./3.js"
import {four} from "./4.js"
import {five} from "./5.js"
import {six} from "./6.js"
import {seven} from "./7.js"
import {eight} from "./8.js"
import { nine } from "./9.js"
import { ten } from "./10.js"

const levels = {
    1: one,
    2: two,
    3: three,
    4: four,
    5: five,
    6: six,
    7: seven,
    8: eight,
    9: nine,
    10: ten
}

const starting = {
    data: {
        spikeheads: [],
        plattforms: [],
        saws: [],
        fires: [],
        rockheads: [],
        sticks: [],
        spikes: [],
        finish: {},
        start: {}
    },
    background: "yellow"
}

export{
    levels,
    starting
}