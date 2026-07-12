import { Component, input, output } from '@angular/core'

@Component({
    selector: 'app-user-card',
    template: `
      <div class='user-card'>
        <!-- We only READ the inputs here with (). The child never sets them. -->
        <h3>{{ name() }}</h3>
        <p>Score: {{ score() }}</p>

        <!-- The child can't change the parent's data directly.
             Instead it ASKS the parent to act by emitting events. -->
        <button (click)='cheer.emit(name())'>Cheer</button>
        <button (click)='remove.emit(name())'>Remove</button>
      </div>
    `
})
export class UserCard {
    // input() = a read-only signal whose value is supplied by the PARENT.
    // Required: the parent must pass it (otherwise it's a compile error).
    readonly name = input.required<string>();

    // Optional input with a default used when the parent doesn't pass it.
    readonly score = input(0);

    // output() = an event the child EMITS upward to the parent.
    // The <string> is the payload type the parent will receive as $event.
    readonly cheer = output<string>();

    // Another output. If there were no payload, use output<void>() + emit().
    readonly remove = output<string>();
}
