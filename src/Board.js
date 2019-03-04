import React, { Component } from 'react';
import Square from './Square'
import './App.css'

class Board extends Component {

  constructor(props){
    super(props)

    const chest = Math.floor(Math.random() * 8)

do {
    var bomb = Math.floor(Math.random() * 8)
  } while (bomb === chest)


    this.state = {
      squares: ['?', '?', '?',
                '?', '?', '?',
                '?', '?', '?'],
      bombIndex: bomb,
      chestIndex: chest,
      clickCount: 0,
      gameIsLost: false,
      gameIsWon: false,
    }
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

  handleSquareClick = (index) => {
    const { squares, clickCount, gameIsLost, gameIsWon } = this.state

    if(squares[index] !== "?"){
      return
    }

    if(this.gameIsActive()){
      const newValue = this.squareAssignment(index)
      squares[index] = newValue

      this.setState({
        squares: squares,
        clickCount: clickCount + 1,
        gameIsWon: newValue === "Chest",
        gameIsLost: newValue === "Bomb",
      })
    } else if (clickCount >= 2){
      this.setState({gameIsLost: true})
    }

  }

  render() {
    const { squares, gameIsLost, gameIsWon } = this.state
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
      </div>
    );
  }
}

export default Board;
