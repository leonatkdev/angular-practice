import { Component, signal } from '@angular/core'
import { UserCard } from '../components/user-card'

@Component({
    selector: 'app-input-practice',
    // We must import the child component to use <app-user-card> in the template.
    imports: [UserCard],
    template: `
      <div class='input-practice'>
        <h1>Input Practice</h1>

        <!-- This value is OWNED by this page (a signal we can change). -->
        <p>Parent's score: {{ points() }}</p>
        <button (click)='points.set(points() + 1)'>Give a point</button>

        <hr />

        <!-- We PASS values down into the child via [prop]="...".
             The child receives them as inputs and just displays them. -->
        <app-user-card [name]="'Leo'" [score]="points()" />

        <!-- Static value + no score => child falls back to its default (0). -->
        <app-user-card [name]="'Ada'" />
      </div>
    `
})
export class InputPractice {
    // Signal = state THIS page owns and mutates.
    protected readonly points = signal(0);
}
