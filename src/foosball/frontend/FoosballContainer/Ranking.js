import React, { Component } from 'react';
import './Ranking.scss'

import { debounce } from 'lodash'

import { select } from 'd3-selection'
import { scaleLinear, scaleBand } from 'd3-scale'

class Ranking extends Component {
    constructor(props) {
        super(props)

        this.canvas = React.createRef()

        this.state = {
            boundingRect: {},
            loaded: false
        }
    }

    componentDidMount() {
        this.handleCanvasResize()
        this.debouncedResize = debounce(this.handleCanvasResize, 100)
        window.addEventListener('resize', this.debouncedResize, false)
    }

    shouldComponentUpdate(nextProps, nextState) {
        const nextRect = nextState.boundingRect
        const didSvgSizeChange =
            this.state.boundingRect.width !== nextRect.width ||
            this.state.boundingRect.height !== nextRect.height

        if (didSvgSizeChange) {
            return true
        }
        return false
    }

    componentDidUpdate() {
        if (this.state.loaded) {
            this.createChart()
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.debouncedResize, false)
    }

    handleCanvasResize = () => {
        const boundingRect = this.canvas.current.getBoundingClientRect()
        this.setState({ boundingRect, loaded: true })
    }

    mockData = [{
        "name": "Apples",
        "value": 20,
    },
    {
        "name": "Bananas",
        "value": 12,
    },
    {
        "name": "Grapes",
        "value": 19,
    },
    {
        "name": "Lemons",
        "value": 5,
    },
    {
        "name": "Limes",
        "value": 16,
    },
    {
        "name": "Oranges",
        "value": 26,
    },
    {
        "name": "Pears",
        "value": 30,
    }]

    createChart = () => {
        this.cleanOldSvg()
        const width = this.state.boundingRect.width
        const height = this.state.boundingRect.height

        const data = this.mockData.sort((a, b) => {
            return b.value - a.value
        })

        const xMax = Math.max(...data.map(player => player.value))

        var svg = select('.canvas').append('svg').attr('viewBox', [0, 0, width, height])

        var xScale = scaleLinear().domain([0, xMax]).range([0, width])
        var yScale = scaleBand().domain(data.map(player => player.name)).rangeRound([0, height]).paddingInner(0.05)

        svg.selectAll('rect').data(data).enter().append('rect')

        svg
            .selectAll("rect")
            .data(data)
            .style("fill", "#BBE6FE")
            .attr("y", (d) => {
                return yScale(d.name)
            })
            .attr("x", d => xScale(xMax - d.value))
            .attr("width", d => xScale(d.value))
            .attr("height", 25);
    }

    cleanOldSvg = () => {
        select('.canvas')
            .selectAll('svg')
            .remove()
    }

    render() {
        return (
            <div className="ranking-container">
                <div className="canvas" ref={this.canvas}>CANVAS</div>
            </div>
        );
    }
}

export default Ranking;