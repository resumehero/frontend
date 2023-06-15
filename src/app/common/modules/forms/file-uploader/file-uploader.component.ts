import { Component, inject, Input, OnInit } from '@angular/core';
import { AbstractFileUploaderComponent } from '@misc/abstracts/components/abstract-file-uploader.component';
import { ThemePalette } from '@angular/material/core';
import { IServicesConfig } from '@services/http/http.service';
import { Observable } from 'rxjs';
import { ApiFile } from '@models/classes/file.model';
import { PhotoApiService } from '@services/api/photo-api/photo-api.service';

@Component({
  selector: 'file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent extends AbstractFileUploaderComponent implements OnInit {
  protected _fileApi: PhotoApiService = inject(PhotoApiService);
  @Input() previewHeight: number = 160;
  @Input() previewWidth: number = 225;
  @Input() actionsXPosition: 'start' | 'end' = 'end';
  @Input() actionsYPosition: 'start' | 'end' = 'start';
  @Input() actionsColor: ThemePalette = 'primary';

  get actionsPositionClasses(): string[] {
    return [`file-uploader__file-actions_x-${this.actionsXPosition}`, `file-uploader__file-actions_y-${this.actionsYPosition}`];
  }

  protected override _upload(file: File, servicesConfig: IServicesConfig): Observable<ApiFile> {
    return this._fileApi.uploadMedia(file, servicesConfig);
  }
}
