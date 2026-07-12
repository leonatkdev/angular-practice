import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-state-practice',
  template: `
    <div class="state-practice">
      <h1>State Practice</h1>
      <p>Current state: {{ state() }}</p>
      <div>
        <button (click)="state.set(state() + 1)">Increment</button>
        <button (click)="state.set(state() - 1)">Decrement</button>
        <div>
          <div>
            <button (click)="increaseByTwo(2)">Increase by 2</button>
            <button (click)="decreaseByTwo(2)">Decrease by 2</button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class StatePractice {
  protected readonly state = signal(0);

  protected increaseByTwo(number: number): void {
    this.state.set(this.state() + number);
  }

  protected decreaseByTwo(number: number): void {
    this.state.set(this.state() - number);
  }
}
