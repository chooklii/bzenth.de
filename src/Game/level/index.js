import {one} from "./1.js"
import {two} from "./2.js"
import {three} from "./3.js"
import {four} from "./4.js"
import {five} from "./5.js"
import {six} from "./6.js"
import {seven} from "./7.js"
import {eight} from "./8.js"

const levels = {
    1: one,
    2: two,
    3: three,
    4: four,
    5: five,
    6: six,
    7: seven,
    8: eight
}

const starting = {
    s: {
        spikeheads: [],
        plattforms: [],
        saws: [],
        rockheads: [],
        sticks: [],
        finish: {},
        start: {}
    },
    m: {
        spikeheads: [],
        plattforms: [],
        saws: [],
        rockheads: [],
        sticks: [],
        finish: {},
        start: {}
    },
    l: {
        spikeheads: [],
        plattforms: [],
        saws: [],
        rockheads: [],
        sticks: [],
        finish: {},
        start: {}
    },
    xl: {
        spikeheads: [],
        plattforms: [],
        saws: [],
        rockheads: [],
        sticks: [],
        finish: {},
        start: {}
    },
    background: "yellow"
}

export{
    levels,
    starting
}