import { Component, inject } from '@angular/core';
import {FileUpload, FileUploadEvent, FileUploadHandlerEvent} from 'primeng/fileupload';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

interface TokenResponse {
  model: string;
  file_name: string;
  token_count: number;
}


@Component({
  selector: 'app-token-calculator',
  standalone: true,
  imports: [
    FileUpload
  ],
  templateUrl: './token-calculator.html',
  styleUrl: './token-calculator.css'
})
export class TokenCalculator {

   private readonly http = inject(HttpClient);
   private readonly uploadUrl = '/api/tokens';

   calculatedTokens: number = 0;

  uploadFile($event: FileUploadHandlerEvent) {
      $event.files.forEach(file => {
        this.requestUpload(file).subscribe({
          next: (data) => {
           this.calculatedTokens = data.token_count;
          }
        })
      })
  }

  requestUpload(file: File): Observable<TokenResponse> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<TokenResponse>(this.uploadUrl, formData);
  }
}
