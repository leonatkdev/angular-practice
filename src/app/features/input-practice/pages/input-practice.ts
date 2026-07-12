import { Component, signal } from '@angular/core'
import { UserCard } from '../components/user-card'
import { EditableField } from '../components/editable-field'

@Component({
    selector: 'app-input-practice',
    // We must import each child component to use its tag in the template.
    imports: [UserCard, EditableField],
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

        <hr />

        <h2>Two-way binding with model()</h2>

        <!-- [(value)] is the "banana in a box". It's just sugar for:
             [value]="draft()" (valueChange)="draft.set($event)".
             So editing in the CHILD updates draft here, and... -->
        <app-editable-field [(value)]="draft" />

        <!-- ...changing draft HERE flows straight back down into the child.
             One source of truth, kept in sync in both directions. -->
        <p>Parent's draft: {{ draft() }}</p>
        <button (click)="draft.set('Hello from parent')">Set from parent</button>
      </div>
    `
})
export class InputPractice {
    // Signal = state THIS page owns and mutates.
    protected readonly points = signal(0);

    // State driven BY the child's events — proof the events reached the parent.
    protected readonly users = signal<string[]>(['Leo', 'Ada']);
    protected readonly lastEvent = signal('none');

    // Two-way bound to the child's model(). Angular keeps this signal and
    // the child's value() in sync automatically via [(value)].
    protected readonly draft = signal('');

    // Handlers receive the payload the child emitted.
    protected onCheer(name: string): void {
        this.lastEvent.set(`${name} was cheered 🎉`);
    }

    protected onRemove(name: string): void {
        this.lastEvent.set(`${name} was removed`);
        this.users.update((list) => list.filter((u) => u !== name));
    }
}
