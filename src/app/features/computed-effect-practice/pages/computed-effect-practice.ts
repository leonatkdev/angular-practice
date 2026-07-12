import { Component, computed, effect, signal } from '@angular/core'

@Component({
    selector: 'app-computed-effect-practice',
    template: `
      <div class='computed-effect-practice'>
        <h1>computed() + effect() Practice</h1>

        <!-- The only WRITABLE source of truth on this page. -->
        <p>Celsius: {{ celsius() }}</p>
        <button (click)='celsius.set(celsius() - 1)'>-1</button>
        <button (click)='celsius.set(celsius() + 1)'>+1</button>
        <button (click)='celsius.set(0)'>Reset</button>

        <hr />

        <h2>Derived state — computed()</h2>
        <!-- These are NOT stored. They recompute automatically whenever
             celsius() changes, and are cached until then. You never call
             .set() on a computed — it's read-only by design. -->
        <p>Fahrenheit: {{ fahrenheit() }}</p>
        <p>Verdict: {{ verdict() }}</p>

        <hr />

        <h2>Side-effects — effect()</h2>
        <!-- The log below is filled by an effect() that runs whenever
             celsius changes. Effects are for REACHING OUTSIDE Angular:
             logging, localStorage, analytics, timers — not for computing
             values (use computed() for that). -->
        <p>Change count: {{ changeCount() }}</p>
        <ul>
          @for (entry of history(); track $index) {
            <li>{{ entry }}</li>
          }
        </ul>
      </div>
    `
})
export class ComputedEffectPractice {
    // 1) Writable signal: the single source of truth.
    protected readonly celsius = signal(0);

    // 2) computed(): DERIVED, cached, auto-updates. Pure — no side effects.
    protected readonly fahrenheit = computed(() => this.celsius() * 9 / 5 + 32);
    protected readonly verdict = computed(() =>
        this.celsius() <= 0 ? 'freezing 🥶'
            : this.celsius() >= 30 ? 'hot 🥵'
                : 'comfortable 🙂',
    );

    // On-screen log so the effect's work is visible (not just in the console).
    protected readonly history = signal<string[]>([]);
    protected readonly changeCount = signal(0);

    constructor() {
        // 3) effect(): runs once immediately, then again whenever ANY signal
        //    it reads (here, celsius) changes. Angular tracks the dependency
        //    automatically — no dependency array like React's useEffect.
        effect(() => {
            const c = this.celsius();

            // A real side-effect: persist to the browser + log to console.
            localStorage.setItem('lastCelsius', String(c));
            console.log('[effect] celsius is now', c);

            // Mirror it on screen. We write to OTHER signals (not celsius),
            // so there's no infinite loop.
            this.history.update((list) => [`celsius = ${c}`, ...list].slice(0, 5));
            this.changeCount.update((n) => n + 1);
        });
    }
}
