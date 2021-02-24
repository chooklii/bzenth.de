// positions are given in percent so plattforms are scalled
// to larger and smaller screens
const levels = {
    1: {
        small: {
            spikeheads: [],
            plattforms: [
                { x: 0.95, y: 0.7, scale: 5 },
                { x: 0.2, y: 0.5, scale: 2 },
                { x: 0.1, y: 0.4, scale: 1 },
                { x: 0.2, y: 0.3, scale: 1 }
            ],
            saws: [],
            rockheads: [
                { x: 0.4, y: 0.3, scale: 6, multiple: false }
            ],
            sticks: [
                { x: 0.1, y: 0.9 },
                { x: 0.2, y: 0.8 },
                { x: 0.4, y: 0.8 },
                { x: 0.6, y: 0.8 },
                { x: 0.8, y: 0.8 },
                { x: 0.8, y: 0.6 },
                { x: 0.6, y: 0.6 },
                { x: 0.4, y: 0.55 },
                { x: 0.6, y: 0.25 },
                { x: 0.7, y: 0.25 }
            ],
            finish: {
                x: 0.98,
                y: 0.1
            },
            start: {
                x: 0.03,
                y: 0.95
            },
        },
        large: {
                spikeheads: [],
                plattforms: [
                    { x: 0.95, y: 0.7, scale: 5 },
                    { x: 0.3, y: 0.5, scale: 2 },
                    { x: 0.2, y: 0.5, scale: 1 },
                    { x: 0.1, y: 0.4, scale: 1 },
                    { x: 0.2, y: 0.3, scale: 1 },
                    { x: 0.8, y: 0.25, scale: 5 },
                    { x: 0.6, y: 0.6, scale: 5},
                ],
                saws: [],
                rockheads: [
                    { x: 0.4, y: 0.3, scale: 8, multiple: false }
                ],
                sticks: [
                    { x: 0.1, y: 0.9 },
                    { x: 0.2, y: 0.8 },
                    { x: 0.35, y: 0.8 },
                    { x: 0.5, y: 0.8 },
                    { x: 0.65, y: 0.8 },
                    { x: 0.8, y: 0.8 },
                    { x: 0.8, y: 0.6 },
                    { x: 0.46, y: 0.55 },
                    { x: 0.6, y: 0.25 },
                    { x: 0.9, y: 0.2 }
                ],
                finish: {
                    x: 0.98,
                    y: 0.1
                },
                start: {
                    x: 0.03,
                    y: 0.95
                },

            },
        background: "green"
    }
}

const starting = {
    small: {
        spikeheads: [],
        plattforms: [],
        saws: [],
        rockheads: [],
        sticks: [],
        finish: {},
        start: {}
    },
    large: {
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