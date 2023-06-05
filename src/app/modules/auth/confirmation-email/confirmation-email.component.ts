import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'confirmation-email',
  templateUrl: './confirmation-email.component.html',
  styleUrls: ['./confirmation-email.component.scss']
})
export class ConfirmationEmailComponent implements OnInit {
  heading: string = 'Account has been successfully activated!';
  isError: boolean;
  private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this._activatedRoute.data.subscribe(({ emailConfirmationErrorMessage }: Params): void => {
      this.isError = !!emailConfirmationErrorMessage;
      if (emailConfirmationErrorMessage) {
        this.heading = emailConfirmationErrorMessage;
      }
    });
  }
}
