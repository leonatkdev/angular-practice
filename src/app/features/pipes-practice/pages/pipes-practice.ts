import { CurrencyPipe, DatePipe, AsyncPipe, UpperCasePipe } from '@angular/common'
import { Component, signal } from '@angular/core'
import { interval, map } from 'rxjs'
import { TruncatePipe } from '../pipes/truncate-pipe'

@Component({
    selector: 'app-pipes-practice',
    // Each pipe (built-in or custom) must be imported to use its | name.
    imports: [DatePipe, CurrencyPipe, AsyncPipe, UpperCasePipe, TruncatePipe],
    template: `
      <div class='pipes-practice'>
        <h1>Pipes Practice</h1>

        <p>
          A pipe transforms a value for DISPLAY only — right in the template,
          without touching the underlying data. Syntax: {{ '{{ value | pipe:arg }}' }}.
        </p>

        <h2>date</h2>
        <!-- Same Date, formatted three ways via arguments. -->
        <p>{{ now | date }}</p>
        <p>{{ now | date:'fullDate' }}</p>
        <p>{{ now | date:'HH:mm:ss' }}</p>

        <h2>currency</h2>
        <!-- currency:'CODE':'display':'digitsInfo' -->
        <p>{{ price() | currency }}</p>
        <p>{{ price() | currency:'EUR' }}</p>
        <p>{{ price() | currency:'JPY':'symbol':'1.0-0' }}</p>
        <button (click)='price.set(price() + 9.5)'>Raise price</button>

        <h2>async</h2>
        <!-- The async pipe SUBSCRIBES to the observable, hands the latest
             value to the template, and UNSUBSCRIBES automatically when the
             component is destroyed — no manual subscribe/unsubscribe. -->
        <p>Ticks since load: {{ ticker$ | async }}</p>

        <h2>truncate (custom)</h2>
        <p>{{ blurb | truncate }}</p>
        <p>{{ blurb | truncate:15 }}</p>
        <p>{{ blurb | truncate:15:' [more]' }}</p>

        <h2>chaining</h2>
        <!-- Pipes chain left-to-right: output of one feeds the next. -->
        <p>{{ blurb | truncate:10 | uppercase }}</p>
      </div>
    `,
})
export class PipesPractice {
    protected readonly now = new Date()
    protected readonly price = signal(1299.99)
    protected readonly blurb =
        'Pipes are a clean way to format data directly in your templates.'

    // An observable that emits 0,1,2… every second. The async pipe reads it.
    protected readonly ticker$ = interval(1000).pipe(map((n) => n))
}
