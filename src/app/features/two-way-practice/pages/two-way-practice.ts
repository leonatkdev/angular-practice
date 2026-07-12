import { Component, signal } from '@angular/core'
import { EditableField } from '../components/editable-field'

@Component({
    selector: 'app-two-way-practice',
    imports: [EditableField],
    template: `
      <div class='two-way-practice'>
        <h1>Two-way Binding Practice</h1>

        <!-- [(value)] is the "banana in a box". It's just sugar for:
             [value]="draft()" (valueChange)="draft.set($event)".
             So editing in the CHILD updates draft here, and... -->
        <app-editable-field [(value)]="draft" />

        <!-- ...changing draft HERE flows straight back down into the child.
             One source of truth, kept in sync in both directions. -->
        <p>Parent's draft: {{ draft() }}</p>
        <button (click)="draft.set('Hello from parent')">Set from parent</button>
        <button (click)="draft.set('')">Clear</button>
      </div>
    `
})
export class TwoWayPractice {
    // Two-way bound to the child's model(). Angular keeps this signal and
    // the child's value() in sync automatically via [(value)].
    protected readonly draft = signal('');
}
