import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() currentPlayer = ''

  @Output() nextPlayer = new EventEmitter<string>()

  public value: string | null = null


  constructor() { }

  ngOnInit(): void {
    this.value = null
  }

  changeValue() {
    this.value = this.currentPlayer
    if(this.currentPlayer == 'X') {
      this.currentPlayer = 'O'
    } else {
      this.currentPlayer = 'X'
    }
    this.nextPlayer.emit(this.currentPlayer)
  }
}
