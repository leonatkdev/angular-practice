import { Injectable, computed, signal } from '@angular/core'

// providedIn: 'root' => ONE shared instance (a singleton) for the whole app.
// Every component that inject()s this gets the SAME object, so they all
// read and write the SAME state. That's how components share state without
// passing inputs/outputs between them.
@Injectable({ providedIn: 'root' })
export class CounterStore {
    // Private writable signal = the source of truth. Only this service mutates it.
    private readonly _count = signal(0);

    // Public read-only view. Components can READ count() but cannot .set() it,
    // so all changes must go through the methods below (one source of truth).
    readonly count = this._count.asReadonly();

    // computed() = derived state. Recalculates automatically when count changes.
    readonly doubled = computed(() => this._count() * 2);

    increment(): void {
        this._count.update((n) => n + 1);
    }

    decrement(): void {
        this._count.update((n) => n - 1);
    }

    reset(): void {
        this._count.set(0);
    }
}
