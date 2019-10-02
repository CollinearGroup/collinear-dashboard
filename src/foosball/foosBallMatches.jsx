import React, { Component, Fragment } from "react";
import "./foosBallMatches.scss";

import debounce from "lodash.debounce";
import { scaleLinear } from "d3-scale";

export default class FoosBallMatch extends Component {
  constructor(props) {
    super(props);

    this.chart = React.createRef();

    this.state = {
      boundingRect: {},
      loaded: false
    };
  }

  async componentDidMount() {
    this.handleResize();
    this.debouncedResize = debounce(this.handleResize, 100);
    window.addEventListener("resize", this.debouncedResize, false);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const nextRect = nextState.boundingRect;
    if (
      this.state.boundingRect.width !== nextRect.width ||
      this.state.boundingRect.height !== nextRect.height
    ) {
      return true;
    }
    if (this.props.matches.length !== nextProps.matches.length) {
      return true;
    }
    return false;
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.debouncedResize, false);
  }

  handleResize = () => {
    const boundingRect = this.chart.current.getBoundingClientRect();
    this.setState({ boundingRect, loaded: true });
  };

  buildPlayerRanking = () => {
    const rankingMap = this.props.matches.reduce((rankMap, match) => {
      const { p1A, p2A, p1B, p2B, aScore, bScore } = match;
      this.checkAndUpdatePlayer(rankMap, p1A, aScore);
      this.checkAndUpdatePlayer(rankMap, p2A, aScore);
      this.checkAndUpdatePlayer(rankMap, p1B, bScore);
      this.checkAndUpdatePlayer(rankMap, p2B, bScore);
      return rankMap;
    }, {});
    return rankingMap;
  };

  checkAndUpdatePlayer = (rankMap, name, score) => {
    if (name === "") {
      return;
    }
    if (rankMap[name]) {
      rankMap[name].totalScored += score;
      rankMap[name].matches++;
    } else {
      rankMap[name] = { totalScored: score, matches: 1 };
    }
  };

  marginSpacing = { top: 10, bottom: 20, left: 135, right: 20 };

  createD3Config = () => {
    const rankMap = this.buildPlayerRanking();
    const playerStats = Object.keys(rankMap)
      .map(player => {
        const { totalScored, matches } = rankMap[player];
        return { name: player, averageScorePerGame: totalScored / matches };
      })
      .sort((a, b) => {
        if (a.averageScorePerGame === b.averageScorePerGame) {
          return a.matches - b.matches;
        }
        return a.averageScorePerGame - b.averageScorePerGame;
      });

    const topSixPlayerStats = playerStats.slice(
      playerStats.length - 6 < 0 ? 0 : playerStats.length - 6
    );

    return {
      playerStats: topSixPlayerStats,
      yScale: scaleLinear()
        .domain([topSixPlayerStats.length, 0])
        .range([
          this.marginSpacing.top,
          this.state.boundingRect.height - this.marginSpacing.bottom
        ]),
      xScale: scaleLinear()
        .domain([0, 5])
        .range([
          this.marginSpacing.left,
          this.state.boundingRect.width - this.marginSpacing.right
        ])
    };
  };

  render() {
    const d3Config = this.createD3Config();

    return (
      <div className="canvas">
        <svg ref={this.chart} className="d3-svg">
          {this.state.loaded && (
            <Fragment>
              <g>
                <line
                  stroke="#000"
                  x1={d3Config.xScale(0)}
                  x2={d3Config.xScale(0)}
                  y1={d3Config.yScale(d3Config.playerStats.length)}
                  y2={d3Config.yScale(0)}
                />
              </g>
              <g>
                <line
                  stroke="#000"
                  x1={d3Config.xScale(0)}
                  x2={d3Config.xScale(5)}
                  y1={d3Config.yScale(0)}
                  y2={d3Config.yScale(0)}
                />
              </g>
              <g>
                {[1, 2, 3, 4, 5].map(val => {
                  return (
                    <g
                      key={val}
                      transform={`translate(${d3Config.xScale(
                        val
                      )},${d3Config.yScale(0)})`}
                    >
                      <line stroke="#000" y2="0.8rem"></line>
                      <text textAnchor="middle" dx="0.5rem" dy="0.8rem">
                        {val}
                      </text>
                    </g>
                  );
                })}
              </g>
              <g>
                {d3Config.playerStats.map((player, i) => {
                  return (
                    <g
                      transform={`translate(5,${d3Config.yScale(i)})`}
                      key={player.name}
                    >
                      <text dy="-5">{player.name}</text>
                    </g>
                  );
                })}
              </g>
              <g>
                {d3Config.playerStats.map((player, i) => {
                  return (
                    <g
                      key={player.name}
                      transform={`translate(0,${d3Config.yScale(i)})`}
                    >
                      <line
                        transform="translate(0,-10)"
                        stroke="green"
                        strokeWidth="2"
                        x1={d3Config.xScale(0)}
                        x2={d3Config.xScale(player.averageScorePerGame)}
                      />
                      <circle
                        cx={d3Config.xScale(player.averageScorePerGame)}
                        cy={-10}
                        r="3"
                      />
                    </g>
                  );
                })}
              </g>
            </Fragment>
          )}
        </svg>
      </div>
    );
  }
}
