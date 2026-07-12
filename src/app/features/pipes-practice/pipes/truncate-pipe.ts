import { Pipe, PipeTransform } from '@angular/core'

// A custom pipe is a class with @Pipe + a transform() method.
// Usage in a template: {{ someText | truncate:20:'…' }}
//                                       ^value  ^arg1 ^arg2
@Pipe({
    name: 'truncate',
    // Pure (the default): transform() only re-runs when the INPUT reference
    // changes, so it's cheap. Keep pipes pure unless you truly need otherwise.
})
export class TruncatePipe implements PipeTransform {
    // The 1st param is the piped value; the rest are the :arguments.
    transform(value: string, limit = 20, trail = '…'): string {
        if (!value) return ''
        return value.length > limit ? value.slice(0, limit) + trail : value
    }
}
