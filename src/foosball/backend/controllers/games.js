/*
Rating System based on: http://bonziniusa.com/player-resources/rating-system/
*/

const { GamesModel, UsersModel } = require(`../models`)
const Controller = require('./controller.js')('games')
const uniqBy = require('lodash.uniqby')
const uniq = require('lodash.uniq')
// F
const WEIGHT_FACTOR = 1000

// K
const RATING_COEFFICIENT_CEILING = 250
const RATING_COEFFICIENT_FLOOR = 50
const QUALIFIER_MATCHES = 10

const ratingCoefficient = (previousGamesPlayed) => {
  const floorCeilingDiff = RATING_COEFFICIENT_CEILING - RATING_COEFFICIENT_FLOOR
  if (previousGamesPlayed < QUALIFIER_MATCHES) {
    const RATING_COEFFICIENT = (floorCeilingDiff - ((floorCeilingDiff/QUALIFIER_MATCHES) * previousGamesPlayed)) + RATING_COEFFICIENT_FLOOR
    return RATING_COEFFICIENT
  }
  return RATING_COEFFICIENT_FLOOR
}

// S
// this equation assigns rating points purely based on whether a team won or lost a match
// const calculateScorePercentage = (points) => {
//   if (points === 5) {
//     const modifier = 0.2
//     return points * modifier
//   }
//   return 0
// }

// S
// this equation assigns rating points based on how close the match was based on the score difference
const calculateScorePercentage = (teamPoints, opponentPoints) => {
  const modifier = 0.1
  let pointsDifference = teamPoints - opponentPoints
  const scorePercentage = (pointsDifference * modifier) + 0.5
  return scorePercentage
}

const teamRatingAverage = (playerOneRating, player2Rating) => {
  return (playerOneRating + player2Rating) / 2
}
// We
const calculateWinExpectancy = (playerTeamRating, opponentTeamRating, weightFactor) => {
  // We = 1/ (10 (-ratingDifference/weightFactor) + 1)
  const ratingDifference = opponentTeamRating - playerTeamRating
  const winExpectancy = (1/((10 ** (ratingDifference/weightFactor)) + 1))
  return winExpectancy
}

const calculateNewRating = ({ playerRating, teammateRating, opponentDefRating, opponentOffRating, teamPoints, opponentPoints, previousGamesPlayed }) => {
  const originalTeamRating = teamRatingAverage(playerRating, teammateRating)
  const originalOpponentRating = teamRatingAverage(opponentDefRating, opponentOffRating)
  const winExpectancy = calculateWinExpectancy(originalTeamRating, originalOpponentRating, WEIGHT_FACTOR)
  const scorePercentage = calculateScorePercentage(teamPoints, opponentPoints,)
  const newPlayerRating = playerRating + (ratingCoefficient(previousGamesPlayed) * (scorePercentage - winExpectancy))

  return newPlayerRating
}

class GamesController extends Controller {

  //TODO: FIX ALL OF THIS???? NUMBERS SEEM WRONG
  static async updateElos(req, res, next) {
    let { 
      red_def,
      red_off,
      black_def,
      black_off,
      red_points,
      black_points } = req.body

    const { current_rating: red_def_rating, games_played: red_def_games_played } = await UsersModel.one(red_def)
    const { current_rating: red_off_rating, games_played: red_off_games_played } = await UsersModel.one(red_off)
    const { current_rating: black_def_rating, games_played: black_def_games_played } = await UsersModel.one(black_def)
    const { current_rating: black_off_rating, games_played: black_off_games_played } = await UsersModel.one(black_off)

    let playersToUpdate = uniqBy([
      { playerId: red_def, previousGamesPlayed: red_def_games_played, playerRating: red_def_rating, teammateRating: red_off_rating, opponentDefRating: black_def_rating, opponentOffRating: black_off_rating, teamPoints: red_points, opponentPoints: black_points},
      { playerId: red_off, previousGamesPlayed: red_off_games_played, playerRating: red_off_rating, teammateRating: red_def_rating, opponentDefRating: black_def_rating, opponentOffRating: black_off_rating, teamPoints: red_points, opponentPoints: black_points},
      { playerId: black_def, previousGamesPlayed: black_def_games_played, playerRating: black_def_rating, teammateRating: black_off_rating, opponentDefRating: red_def_rating, opponentOffRating: red_off_rating, teamPoints: black_points, opponentPoints: red_points},
      { playerId: black_off, previousGamesPlayed: black_off_games_played, playerRating: black_off_rating, teammateRating: black_def_rating, opponentDefRating: red_def_rating, opponentOffRating: red_off_rating, teamPoints: black_points, opponentPoints: red_points}
    ], 'playerId')

    const updatedPlayers = []
    for (let gameInfo of playersToUpdate) {
      try {
        const newPlayerRating = calculateNewRating(gameInfo)
        await UsersModel.update(gameInfo.playerId, { current_rating: newPlayerRating })
        updatedPlayers.push(gameInfo)
        console.log(`Error updating player ${gameInfo.playerId}'s rating to new value of ${newPlayerRating}. `)
      } catch (updateErr) {
        for (let { playerId, playerRating } of updatedPlayers) {
          try {
            await UsersModel.update(playerId, { current_rating: playerRating })
          } catch (resetEerr) {
            console.log(`Error resetting player ${playerId}'s rating to previous value of ${playerRating}.`)
          }
        }
        break
      }
    }

    next()
  }

  static async updateGamesPlayed(req, res, next) {
    let { 
      red_def,
      red_off,
      black_def,
      black_off,
      red_points,
      black_points } = req.body
    
    let gamePlayers = uniq([red_def, red_off, black_def, black_off])
    for (let playerId of gamePlayers) {
      let { games_played } = await UsersModel.one(playerId)
      await UsersModel.update(playerId, { games_played: games_played+1 })
    }

    next()
  }
}

module.exports = GamesController