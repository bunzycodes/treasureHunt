import React, { Component } from 'react';
import Square from './Square'
import './App.css'

class Board extends Component {
  constructor(props){
    super(props)

    this.state = {
      squares: []
      }
    }

    componentDidMount(){
      this.setupGame()
    }

    setupGame = () => {
      const chest = Math.floor(Math.random() * 8)
      do {
        var bomb = Math.floor(Math.random() * 8)
      } while (bomb === chest)


      this.setState({
        squares: ['?', '?', '?',
                  '?', '?', '?',
                  '?', '?', '?'],
        bombIndex: bomb,
        chestIndex: chest,
        clickCount: 0,
        gameIsLost: false,
        gameIsWon: false,
      })
    }


  squareAssignment = (index) => {
    const { squares, bombIndex, chestIndex } = this.state

    if(index === bombIndex){
      return "Bomb"
    } else if (index === chestIndex){
      return "Chest"
    } else {
      return "Tree"
    }
  }

  gameIsActive = () =>{
    const { clickCount, gameIsLost, gameIsWon } = this.state
      return clickCount < 2 && !gameIsWon && !gameIsLost
  }

  flipSquare = (index) => {
    const { squares } = this.state
    const newValue = this.squareAssignment(index)
    squares[index] = newValue
    this.setState({squares})

  }

  flipAllSquare = (index) => {
    const { squares } = this.state
    squares.forEach((square, index) => {
      this.flipSquare(index)
    })
  }

  handleSquareClick = (index) => {
    const { squares, clickCount, gameIsLost, gameIsWon } = this.state

    if(squares[index] !== "?"){
      return
    }

    if(this.gameIsActive()){
      const newValue = this.squareAssignment(index)
      const gameIsWon = newValue === "Chest"
      const gameIsLost = newValue === "Bomb"

      this.flipSquare(index)

      this.setState({
        clickCount: clickCount + 1,
        gameIsWon: gameIsWon,
        gameIsLost: gameIsLost,
      })

      if(gameIsWon || gameIsLost){
        this.flipAllSquare()
      }
    } else if (clickCount >= 2){
      this.setState({gameIsLost: true})
      this.flipAllSquare()
    }

  }

  render() {
    const { squares, gameIsLost, gameIsWon, } = this.state
    return (
      <div>
      {gameIsLost &&
        <h1> You Loose!</h1>
      }
      {gameIsWon &&
        <h1> You Win!</h1>
      }
      <div className = "board">
        {squares.map((squareValue, index) => {
          return (
            <Square
              key = {index}
              value = {squareValue}
              index = {index}
              onClick = {this.handleSquareClick}
            />
          )
        })}
      </div>
        <button onClick = {this.flipAllSquare}> Give Up
        </button>
        <button onClick = {this.setupGame}> Reset
        </button>
      </div>
    );
  }
}

export default Board;
