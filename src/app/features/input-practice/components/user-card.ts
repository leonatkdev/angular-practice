import { Component, input } from '@angular/core'

@Component({
    selector: 'app-user-card',
    template: `
      <div class='user-card'>
        <!-- We only READ the inputs here with (). The child never sets them. -->
        <h3>{{ name() }}</h3>
        <p>Score: {{ score() }}</p>
      </div>
    `
})
export class UserCard {
    // input() = a read-only signal whose value is supplied by the PARENT.
    // Required: the parent must pass it (otherwise it's a compile error).
    readonly name = input.required<string>();

    // Optional input with a default used when the parent doesn't pass it.
    readonly score = input(0);
}
