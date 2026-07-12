import { Component, inject } from '@angular/core'
import { CounterStore } from '../services/counter-store'

@Component({
    selector: 'app-counter-controls',
    template: `
      <div class='counter-controls'>
        <h3>Controls component</h3>
        <!-- This component only WRITES to the store. It has no @Input/@Output
             and knows nothing about the display component. -->
        <button (click)='store.decrement()'>-1</button>
        <button (click)='store.increment()'>+1</button>
        <button (click)='store.reset()'>Reset</button>
      </div>
    `
})
export class CounterControls {
    // inject() the singleton. Same instance the display component gets.
    protected readonly store = inject(CounterStore);
}
