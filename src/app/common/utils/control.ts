import { signal, WritableSignal } from "@angular/core";
import { FormControl, FormControlOptions } from "@angular/forms";

export class Control<T = any> extends FormControl {
    private readonly options
    private readonly errorMessage$: WritableSignal<string | undefined> = signal(undefined)

    public readonly label
    public readonly errorMessage = this.errorMessage$.asReadonly()

    constructor (label: string, value: T, options?: ControlOptions) {
        super(value, options)
        this.label = label
        this.options = options

        this.valueChanges.subscribe(newValue => {
            if (newValue === value) this.options?.onValueChange?.call(this, true)
            else this.options?.onValueChange?.call(this, false)
        })
    }

    validate() {
        if (this.errors) {
            let errorMessage = undefined
            switch (true) {
                case this.hasError('required'): errorMessage = this.options?.isFeminine ? `${this.label} مطلوبة` : `${this.label} مطلوب`; break
                case this.hasError('minlength'): errorMessage = this.options?.isFeminine ? `${this.label} يجب أن تكون أطول من ${this.getPlurals(this.errors['minlength'].requiredLength)}` : `${this.label} يجب أن يكون أطول من ${this.getPlurals(this.errors['minlength'].requiredLength)}`; break
                case this.hasError('maxlength'): errorMessage = this.options?.isFeminine ? `${this.label} يجب أن تكون أقصر من ${this.getPlurals(this.errors['maxlength'].requiredLength)}` : `${this.label} يجب أن تكون أقصر من ${this.getPlurals(this.errors['maxlength'].requiredLength)}`; break
                case this.hasError('pattern'): errorMessage = this.options?.isFeminine ? `` : ``; break
                case this.hasError('oneOfTwoIsRequired'): `${this.errors['oneOfTwoIsRequired']}`; break
            }
            this.markAsDirty()
            this.errorMessage$.set(errorMessage)
        } else this.errorMessage$.set(undefined)
    }

    private getPlurals(value: number) {
        switch (true) {
            case value === 0: return 'لا حرف'
            case value === 1: return 'حرف واحد'
            case value === 2: return 'حرفين'
            case value > 2 && value <= 10: return `${value} أحرف`
            default: return `${value} حرفًا`
        }
    }
}

interface ControlOptions extends FormControlOptions {
    isFeminine?: boolean,
    onValueChange?: (isEqualToInitialValue: boolean) => void,
}