import { Component, inject } from '@angular/core'
import { CounterStore } from '../services/counter-store'

@Component({
    selector: 'app-counter-view',
    template: `
      <div class='counter-view'>
        <h3>View component</h3>
        <!-- This component only READS the store. It is a SEPARATE, unrelated
             component from the controls, yet it sees the same live value —
             because inject() handed both of them the same singleton. -->
        <p>Count: {{ store.count() }}</p>
        <p>Doubled: {{ store.doubled() }}</p>
      </div>
    `
})
export class CounterView {
    protected readonly store = inject(CounterStore);
}
