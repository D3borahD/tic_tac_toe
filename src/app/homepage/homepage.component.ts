import {Component, OnInit, Pipe} from '@angular/core';
import {BehaviorSubject, combineLatest, filter, tap} from "rxjs";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  // création d'un Subject ou BehaviorSubject pour représenter l'état actuel du tour
  // BehaviorSubject permet d'avoir la valeur au début du jeu
  public roundPlayer$ = new BehaviorSubject<string>('X')
  public winnerPlayer$ = new BehaviorSubject<string>('')
  public winner = ''

  public action$ = new BehaviorSubject<string>('')
  public value: string | null = null

  public scoreX$ = new BehaviorSubject<number>(0);
  public scoreO$ = new BehaviorSubject<number>(0);

  public board: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]

  constructor() { }

  ngOnInit(): void {


  }

  // met à jour la variable
  public nextRound():void {
    const currentRound = this.roundPlayer$.getValue()
    const nextRound = currentRound === 'X' ? 'O' : 'X'
    this.roundPlayer$.next(nextRound)
    this.endGame()

    if (this.winnerPlayer$.getValue() === 'O' || this.winnerPlayer$.getValue() === 'X') {
      if (this.winnerPlayer$.getValue() === 'X') {
        this.scoreX$.next(this.scoreX$.getValue() + 1);
        this.resetBoard()
      } else if (this.winnerPlayer$.getValue() === 'O') {
        this.scoreO$.next(this.scoreO$.getValue() + 1);
        this.resetBoard()
      }
    }
  }

  public endGame():void {
    this.action$.pipe(
      filter(() => this.board.every(row => row.every(cell => cell !== '')))
    ).subscribe(() => {
        this.resetBoard()
        this.winnerPlayer$.next('Personne')
      }
    )
  }

  public addValue(row: number, cell: number):void {
    // change value of case
    for (let i=0; i<3; i++) {
      if (i === row){
        for (let j=0; j<3; j++) {
          if (j === cell){
            this.board[i][j] = this.roundPlayer$.getValue()
          }
        }
      }
    }

    // win a ROW
    if (this.board[row][0] === this.roundPlayer$.getValue() &&
      this.board[row][1] === this.roundPlayer$.getValue() &&
      this.board[row][2] === this.roundPlayer$.getValue()
    ) {
      this.winnerPlayer$.next(this.roundPlayer$.getValue())
    }

    // win a COL
    if (this.board[0][cell] === this.roundPlayer$.getValue() &&
      this.board[1][cell] === this.roundPlayer$.getValue() &&
      this.board[2][cell] === this.roundPlayer$.getValue()
    ) {
      this.winnerPlayer$.next(this.roundPlayer$.getValue())
    }

    // win a DIAGONAL
    if (this.board[0][0] === this.roundPlayer$.getValue() &&
      this.board[1][1] === this.roundPlayer$.getValue() &&
      this.board[2][2] === this.roundPlayer$.getValue()
    ) {
      this.winnerPlayer$.next(this.roundPlayer$.getValue())
    }
    if (this.board[2][0] === this.roundPlayer$.getValue() &&
      this.board[1][1] === this.roundPlayer$.getValue() &&
      this.board[0][2] === this.roundPlayer$.getValue()
    ) {
      this.winnerPlayer$.next(this.roundPlayer$.getValue())
    }

    this.nextRound()
  }

  public resetBoard():void {
     for (let row=0; row<this.board.length; row++){
       this.board[row] = Array(this.board[0].length).fill('')
     }
    this.roundPlayer$.next('X')
    this.winnerPlayer$.next('')


  }
}
