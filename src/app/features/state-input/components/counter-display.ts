import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-counter-display',
  template: `
    <div class="counter-display">
      <!-- input() gives a read-only SIGNAL, so we read it with (). -->
      <h3>{{ label() }}</h3>
      <p>Count: {{ count() }}</p>

      <!-- The child asks the parent to change things by emitting events. -->
      <button (click)="step.emit(1)">+1</button>
      <button (click)="step.emit(-1)">-1</button>
    </div>
  `,
})
export class CounterDisplay {
  // input() = the modern signal way. The value is supplied by the PARENT
  // via [count]="...". You read it as a signal: this.count().
  readonly count = input(0);

  // Another input with a default. Parent overrides it with [label]="...".
  readonly label = input('Counter');

  // output() = the modern way to emit events upward. <number> is the payload
  // type the parent receives as $event.
  readonly step = output<number>();
}
