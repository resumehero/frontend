import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IAction } from '@models/interfaces/data-table-column.interface';

export interface IModalAction extends Omit<IAction<boolean>, 'value'> {
  style?: 'raised' | 'stroked' | 'flat';
  type: 'submit' | 'close';
  value?: boolean;
}

@Component({
  selector: 'modal-actions',
  templateUrl: './modal-actions.component.html',
  styleUrls: ['./modal-actions.component.scss']
})
export class ModalActionsComponent {
  @Input() actions: IModalAction[] | undefined;
  @Output() submitted: EventEmitter<void> = new EventEmitter<void>();
}
