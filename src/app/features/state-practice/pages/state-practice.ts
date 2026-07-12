import { Component, signal } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'

@Component({
    selector: 'app-state-practice',
    imports: [RouterLink, RouterLinkActive],
    template: `
      <div class='state-practice'>
        <h1>State Practice</h1>
        <p>Current state: {{ state() }}</p>
        <button (click)='state.set(state() + 1)'>Increment</button>
        <button (click)='state.set(state() - 1)'>Decrement</button>
      </div>
    `
    // templateUrl: "./state-practice.html",
    // styleUrls: ["./state-practice.css"]
})

export class StatePractice {
    protected readonly state = signal(0);
}