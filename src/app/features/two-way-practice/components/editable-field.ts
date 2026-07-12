import { Component, model } from '@angular/core'

@Component({
    selector: 'app-editable-field',
    template: `
      <div class='editable-field'>
        <!-- model() is a WRITABLE signal. Unlike input(), the child is
             allowed to CHANGE it, and that change flows back to the parent.

             Read it with value(), write it with value.set(...). -->
        <input
          [value]='value()'
          (input)='value.set($any($event.target).value)'
          placeholder='type here'
        />
        <p>Child sees: {{ value() }}</p>
      </div>
    `
})
export class EditableField {
    // model() = a two-way bindable signal.
    // Parent side: [(value)]="..." keeps both sides in sync automatically.
    // Setting a default makes it optional; use model.required<string>()
    // to force the parent to bind it.
    readonly value = model('');
}
