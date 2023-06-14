import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { InputType } from '@models/enums/input-type.enum';
import { IFormControlItem } from '@models/interfaces/forms/form-control-item.interface';
import { FormControlItemType } from '@models/enums/form-control-item.type';

export type FormControlRecord<KEY, VAL = AbstractControl> = Partial<Record<keyof KEY, VAL>>;

@Component({
  template: ''
})
export abstract class AbstractFormComponent<F = any> implements OnInit, OnDestroy {
  formGroup: FormGroup;
  readonly InputType: typeof InputType = InputType;
  protected _fb: FormBuilder = inject(FormBuilder);
  protected readonly _DESTROYED$: Subject<void> = new Subject();
  protected _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  get form(): FormControlRecord<F> | null {
    return this.formGroup?.controls as FormControlRecord<F>;
  }

  ngOnInit(): void {
    this._initForm();
  }

  ngOnDestroy(): void {
    this._DESTROYED$.next();
    this._DESTROYED$.complete();
  }

  getGroup(name: keyof FormControlRecord<F>): FormGroup {
    return this._getItemFormGroup(name) as FormGroup;
  }

  getControl(name: keyof FormControlRecord<F>): FormControl {
    return this._getItemFormGroup(name) as FormControl;
  }

  getArray(name: keyof FormControlRecord<F>): FormArray {
    return this._getItemFormGroup(name) as FormArray;
  }

  setControlsArray(formControls: IFormControlItem[]): void {
    if (!formControls.length) {
      return;
    }

    formControls.forEach((itemControl: IFormControlItem): void => this.formGroup.addControl(itemControl.name, itemControl.control));
  }

  protected abstract _initForm(): void;

  private _getItemFormGroup(name: keyof FormControlRecord<F>): AbstractControl {
    return this.formGroup.get(name as string) as AbstractControl;
  }
}
