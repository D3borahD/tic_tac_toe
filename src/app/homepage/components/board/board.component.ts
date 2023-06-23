import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input() player = ''
  @Output() newPlayer = new EventEmitter<string>()

  public squares!: string[]

  constructor() { }

  ngOnInit(): void {
    this.newGame()
  }

  getPlayer(value: string){
    this.player = value
    this.newPlayer.emit(value)
  }

  public newGame() {
    this.squares = Array(9).fill(null)
  }


}
