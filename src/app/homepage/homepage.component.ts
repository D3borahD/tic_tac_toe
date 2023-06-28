import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  public currentPlayer: 'X' | 'O' = 'X' ;
  
  public winner:string = ''

  public board: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]

  constructor() { }

  ngOnInit(): void {
  }

  public addValue(row: number, cell: number):void {
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

    // win a ROW
    if (this.board[row][0] === this.currentPlayer &&
      this.board[row][1] === this.currentPlayer &&
      this.board[row][2] === this.currentPlayer
    ) {
      this.winner = this.currentPlayer
    }

    // win a COL
    if (this.board[0][cell] === this.currentPlayer &&
      this.board[1][cell] === this.currentPlayer &&
      this.board[2][cell] === this.currentPlayer
    ) {
      this.winner = this.currentPlayer
    }

    // win a DIAGONAL
    if (this.board[0][0] === this.currentPlayer &&
      this.board[1][1] === this.currentPlayer &&
      this.board[2][2] === this.currentPlayer
    ) {
      this.winner = this.currentPlayer
    }
    if (this.board[2][0] === this.currentPlayer &&
      this.board[1][1] === this.currentPlayer &&
      this.board[0][2] === this.currentPlayer
    ) {
      this.winner = this.currentPlayer
    }

    //this.winner = 'nobody'


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

  public resetBoard():void {
     for (let row=0; row<this.board.length; row++){
       this.board[row] = Array(this.board[0].length).fill('')
     }
    this.currentPlayer = 'X'
    this.winner=''
  }
}
