import { Component, signal } from '@angular/core'
import { UserCard } from '../components/user-card'

@Component({
    selector: 'app-input-practice',
    // We must import the child component to use <app-user-card> in the template.
    imports: [UserCard],
    template: `
      <div class='input-practice'>
        <h1>Input & Output Practice</h1>

        <!-- This value is OWNED by this page (a signal we can change). -->
        <p>Parent's score: {{ points() }}</p>
        <button (click)='points.set(points() + 1)'>Give a point</button>

        <p>Last event: {{ lastEvent() }}</p>

        <hr />

        <!-- We PASS values down into the child via [prop]="..." (inputs)
             and LISTEN for events coming up via (event)="..." (outputs).
             $event is the payload the child emitted. -->
        @for (user of users(); track user) {
          <app-user-card
            [name]="user"
            [score]="points()"
            (cheer)="onCheer($event)"
            (remove)="onRemove($event)"
          />
        }
      </div>
    `
})
export class InputPractice {
    // Signal = state THIS page owns and mutates.
    protected readonly points = signal(0);

    // State driven BY the child's events — proof the events reached the parent.
    protected readonly users = signal<string[]>(['Leo', 'Ada']);
    protected readonly lastEvent = signal('none');

    // Handlers receive the payload the child emitted.
    protected onCheer(name: string): void {
        this.lastEvent.set(`${name} was cheered 🎉`);
    }

    protected onRemove(name: string): void {
        this.lastEvent.set(`${name} was removed`);
        this.users.update((list) => list.filter((u) => u !== name));
    }
}
