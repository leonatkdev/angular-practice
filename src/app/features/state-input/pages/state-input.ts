import { Component, signal } from '@angular/core';
import { CounterDisplay } from '../components/counter-display';

@Component({
  selector: 'app-state-input',
  imports: [CounterDisplay],
  template: `
    <div class="state-input">
      <h1>Input Practice (state passed down via input())</h1>

      <!-- The parent OWNS the state as a signal, read with (). -->
      <p>Parent's count: {{ count() }}</p>

      <!-- Pass the signal's value down with [count]="count()", and listen for
           the child's event with (step)="onStep($event)". $event is the
           number the child emitted (+1 or -1). -->
      <app-counter-display
        [count]="count()"
        label="Score"
        (step)="onStep($event)"
      />
    </div>
  `,
})
export class StateInput {
  // The page owns the state; the child only receives a copy via input().
  protected readonly count = signal(0);

  // Handler updates the parent's signal; the new value flows back down
  // into the child's count() input automatically.
  protected onStep(delta: number): void {
    this.count.update((n) => n + delta);
  }
}
