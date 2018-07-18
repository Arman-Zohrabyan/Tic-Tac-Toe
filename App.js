import React from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ticTacToe: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ],
      turn: 0,
      win: 0,
    };
  }

  turn(containerKey, squarKey) {
    const { ticTacToe, turn, win } = this.state;
    if(win == 1) {
      return false;
    }
    
    if(ticTacToe[containerKey][squarKey] === '') {
      if(turn) {
        ticTacToe[containerKey][squarKey] = "O";
        this.setState({ticTacToe, turn: !turn});
      } else {
        ticTacToe[containerKey][squarKey] = "X";
        this.setState({ticTacToe, turn: !turn});
      }
      this.checkPosition(ticTacToe);
    }
  }
  
  checkPosition(board) {
    const winPos = ['XXX', "OOO"]
    if( winPos.includes(board[0].join('')) ||
        winPos.includes(board[1].join('')) ||
        winPos.includes(board[2].join('')) ||
        winPos.includes(board[0][0] + board[1][0] + board[2][0]) ||
        winPos.includes(board[0][1] + board[1][1] + board[2][1]) ||
        winPos.includes(board[0][0] + board[1][0] + board[2][0]) ||
        winPos.includes(board[0][0] + board[1][1] + board[2][2]) ||
        winPos.includes(board[0][2] + board[1][1] + board[2][0])) {
        this.setState({win: 1});
    }
  }
  
  resetState() {
    this.setState({
      ticTacToe: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ],
      turn: 0,
      win: 0,
    });
  }
  
  render() {
    const { ticTacToe, turn, win } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.createdBy}>Created by Arman-Zohrabyan</Text>
        <Text style={styles.headerText}>Tic-Tac-Toe</Text>
        <View style={styles.board}>
          {
            ticTacToe.map( (container, containerKey) =>
              <View style={styles.squareContainer} key={containerKey}>
                {
                  container.map( (squares, squarKey) =>
                    <TouchableHighlight onPress={ this.turn.bind(this, containerKey.toString(), squarKey.toString()) } key={squarKey}>
                      <View style={styles.square}><Text style={styles.quadroContent}>{ticTacToe[containerKey][squarKey]}</Text></View>
                    </TouchableHighlight>
                  )
                }
              </View>
            )
          }
        </View>
        <View>
          {
            win ?
            <View>
              <Text style={styles.winMsg}>{turn ? 'Player1 win.' : 'Player2 win.'}</Text>
              <Button
                title="Replay"
                color="#841584"
                onPress={this.resetState.bind(this)}
              />
            </View>
            : <View style={styles.winMsgContainer} />
          }
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e1e1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  board: {
    borderWidth: 1
  },
  squareContainer: {
    flexDirection: 'row',
  },
  square: {
    backgroundColor: '#fff',
    width: 100,
    height: 100,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 50,
    color: "#4B79A1",
  },
  createdBy: {
    color: "#008000",
  },
  quadroContent: {
    fontSize: 40,
  },
  winMsg: {
    fontSize: 20,
  },
  winMsgContainer: {
    height: 60,
  }
});