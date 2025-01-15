import { Directive, OnInit } from '@angular/core';
import { MatInput } from '@angular/material/input';

@Directive({
  selector: '[autoFocus]'
})
export class AutoFocusDirective implements OnInit {

  constructor(
    private matInput: MatInput
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.matInput.focus());
  }

}
