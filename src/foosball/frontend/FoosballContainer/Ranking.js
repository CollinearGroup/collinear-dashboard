import React, { Component } from "react";
import "./Ranking.scss";

import { debounce } from "lodash";

import { select } from "d3-selection";
import { scaleLinear, scaleBand } from "d3-scale";

const LEAGUE_MIN = 10;
const PLAYER_GROUPS = [
  'league',
  'rookie',
  'all'
]

class Ranking extends Component {

  constructor(props) {
    super(props);

    this.canvas = React.createRef();

    this.changePlayerGroup = this.changePlayerGroup.bind(this);

    this.state = {
      boundingRect: {},
      loaded: false,
      playerGroup: 0
    };
  }

  changePlayerGroup() {
    const nextPlayerGroup = this.state.playerGroup + 1;

    this.setState({ playerGroup: nextPlayerGroup % PLAYER_GROUPS.length });
  }

  componentDidMount() {
    this.handleCanvasResize();
    this.debouncedResize = debounce(this.handleCanvasResize, 100);
    window.addEventListener("resize", this.debouncedResize, false);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const nextRect = nextState.boundingRect;
    const didSvgSizeChange =
      this.state.boundingRect.width !== nextRect.width ||
      this.state.boundingRect.height !== nextRect.height;

    const didPlayerGroupChange =
      this.state.playerGroup !== nextState.playerGroup;

    return didSvgSizeChange || didPlayerGroupChange;
  }

  componentDidUpdate() {
    if (this.state.loaded) {
      this.createChart();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.debouncedResize, false);
  }

  handleCanvasResize = () => {
    const boundingRect = this.canvas.current.getBoundingClientRect();
    this.setState({ boundingRect, loaded: true });
  };

  createChart = () => {
    this.cleanOldSvg();
    const width = this.state.boundingRect.width;
    const margin = { left: 80, right: 0, top: 0, bottom: 0 };

    const allPlayers = this.props.users.sort((a, b) => {
      return b.current_rating - a.current_rating;
    });

    const players = {
      all: allPlayers,
      rookie: allPlayers.filter(p => p.games_played < LEAGUE_MIN),
      league: allPlayers.filter(p => p.games_played >= LEAGUE_MIN)
    };

    const currentPlayers = players[PLAYER_GROUPS[this.state.playerGroup]];

    const height = currentPlayers.length * 50;

    const xMax = Math.max(...currentPlayers.map(player => player.current_rating));
    const textYDistanceDown = 25;

    var svg = select(".canvas")
      .append("svg")
      .attr("viewBox", [0, 0, width, height]);

    // Create the svg:defs element and the main gradient definition.
    var svgDefs = svg.append("defs");

    var blueGradient = svgDefs
      .append("linearGradient")
      .attr("id", "blueGradient");

    blueGradient
      .append("stop")
      .attr("class", "blue-stop-left")
      .attr("offset", "0");

    blueGradient
      .append("stop")
      .attr("class", "white-stop-right")
      .attr("offset", "1");

    var greenGradient = svgDefs
      .append("linearGradient")
      .attr("id", "greenGradient");

    greenGradient
      .append("stop")
      .attr("class", "blue-green-stop-left")
      .attr("offset", "0");

    greenGradient
      .append("stop")
      .attr("class", "green-stop-right")
      .attr("offset", "1");

    var xScale = scaleLinear()
      .domain([0, xMax])
      .range([0, width - margin.left - margin.right]);
    var yScale = scaleBand()
      .domain(currentPlayers.map(player => player.id))
      .rangeRound([0, height - margin.top - margin.bottom]);
    const valueScaleShiftRight = 135;
    var xValueScale = scaleLinear()
      .domain([0, xMax])
      .range([0, width - margin.left - margin.right - valueScaleShiftRight]);

    var yAxis = svg
      .append("g")
      .attr("transform", d => `translate(${0}, ${margin.top})`);
    yAxis
      .selectAll("g")
      .data(currentPlayers)
      .join("g")
      .attr("transform", d => `translate(14, ${yScale(d.id)}) scale(0.8)`)
      .append("text")
      .attr("y", textYDistanceDown + 8)
      .append("tspan")
      .text((d, i) => i + 1)
      .style("fill", "#ffffff")
      .style("font-size", "42px");

    var graph = svg
      .append("g")
      .attr("transform", d => `translate(${margin.left},${margin.top})`);
    var cell = graph
      .selectAll("g")
      .data(currentPlayers)
      .join("g")
      .attr("transform", d => `translate(${0}, ${yScale(d.id)})`);

    var playerRect = cell
      .append("rect")
      .classed("blue-gradient", true)
      .attr('y', 5)
      .attr("width", d => xScale(xMax))
      .attr("height", yScale.bandwidth() - 10);

    var playerCircle = cell
      .append("circle")
      .style("fill", "white")
      .attr("cx", d => xScale(0))
      .attr("cy", yScale.bandwidth() / 2)
      .attr("r", yScale.bandwidth() / 2 - 2);

    var playerSymbol = cell
      .append("g")
      .attr("transform", d => `translate(0, -6)`);

    playerSymbol
      .append("circle")
      .style("stroke", "grey")
      .style("stroke-width", "3")
      .style("fill", "white")
      .attr("cx", d => xScale(0))
      .attr("cy", yScale.bandwidth() / 2)
      .attr("r", yScale.bandwidth() / 7);

    playerSymbol
      .append("path")
      .attr("d", `M -10 28 V 33 H 10 V 28 C 10 23, -10 23, -10 28`)
      .attr('y', 10)
      .style("stroke", "grey")
      .style("stroke-width", "3")
      .style("fill", "white");

    var playerTitleGroup = cell
      .append("g")
      .attr("transform", d => `translate(28, ${textYDistanceDown})`);
    playerTitleGroup
      .append("text")
      .append("tspan")
      .attr("y", -(250 / yScale.bandwidth()))
      .text(d => d.first_name)
      .style("font-size", "18px");
    playerTitleGroup
      .append("text")
      .append("tspan")
      .attr("y", 180 / yScale.bandwidth())
      .attr("x", 15)
      .text(d => d.last_name)
      .style("font-size", "14px");

    var valueRects = cell
      .append("rect")
      .attr(
        "x",
        d => xValueScale(xMax - d.current_rating) + valueScaleShiftRight
      )
      .classed("green-gradient", true)
      .attr("width", d => xValueScale(d.current_rating))
      .attr("height", yScale.bandwidth() - 10)
      .attr('y', 5);

    var valueCircle = cell
      .append("circle")
      .style("fill", "#21C8BE")
      .attr(
        "cx",
        d => xValueScale(xMax - d.current_rating) + valueScaleShiftRight + 4
      )
      .attr("cy", yScale.bandwidth() / 2)
      .attr("r", yScale.bandwidth() / 2);

    var valueTitleGroup = cell
      .append("g")
      .attr(
        "transform",
        d =>
          `translate(${xValueScale(xMax - d.current_rating) +
            valueScaleShiftRight -
            6}, ${textYDistanceDown - 4})`
      );
    valueTitleGroup
      .append("text")
      .append("tspan")
      .text(d => Math.round(d.current_rating))
      .style("font-size", "10px");
  };

  cleanOldSvg = () => {
    select(".canvas")
      .selectAll("svg")
      .remove();
  };

  render() {
    return (
      <div className="ranking-container">
        <div>Foosball Ranking</div>
        <button id="player-group" onClick={ this.changePlayerGroup }>{ PLAYER_GROUPS[this.state.playerGroup] }</button>
        <div id="rankings-list">
          <div className="canvas" ref={this.canvas}></div>
        </div>
      </div>
    );
  }
}

export default Ranking;
