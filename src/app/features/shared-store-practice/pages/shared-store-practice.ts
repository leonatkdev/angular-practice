import { Component } from '@angular/core'
import { CounterControls } from '../components/counter-controls'
import { CounterView } from '../components/counter-view'

@Component({
    selector: 'app-shared-store-practice',
    imports: [CounterControls, CounterView],
    template: `
      <div class='shared-store-practice'>
        <h1>Shared Store Practice (Service + DI)</h1>

        <p>
          The two boxes below are SEPARATE components with no inputs/outputs
          between them. They stay in sync because they inject() the same
          singleton CounterStore. Click in one, watch the other update.
        </p>

        <div class='columns' style='display:flex; gap:2rem;'>
          <app-counter-controls />
          <app-counter-view />
        </div>
      </div>
    `
})
export class SharedStorePractice {}
