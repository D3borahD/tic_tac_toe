import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  public currentPlayer: 'X' | 'O' = 'X' ;

  public board: string[][]= [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]

  constructor() { }

  ngOnInit(): void {}

  addValue(row: number, cell: number) {
    // change value of case
    for (let i=0; i<3; i++) {
      if (i === row){
        for (let j=0; j<3; j++) {
          if (j === cell){
            this.board[i][j] = this.currentPlayer
          }
        }
      }
    }

    // change player round
    this.playerRound()
  }

// change player round
  public playerRound():void{
    if(this.currentPlayer === 'X') {
      this.currentPlayer= 'O'
    }else {
      this.currentPlayer = 'X'
    }
  }

  resetBoard() {
     for (let row=0; row<this.board.length; row++){
       this.board[row] = Array(this.board[0].length).fill('')
     }
    this.currentPlayer = 'X'
  }
}
