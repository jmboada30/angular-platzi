import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface ResponseFile {
  originalname: string;
  filename: string;
  location: string;
}

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  private url = environment.API_URL;

  constructor(private http: HttpClient) {}

  // para descargar, se puede hacer de varias formas
  // en este caso usamos una libreria llamada file-saver
  getFile(name: string, url: string, type: string) {
    return this.http.get(url, { responseType: 'blob' }).pipe(
      tap((content) => {
        const blob = new Blob([content], { type });
        saveAs(blob, name);
      }),
      map(() => true)
    );
  }

  // Subir archivo al backend
  uploadFile(file: Blob) {
    const dto = new FormData();
    dto.append('file', file);

    return this.http.post<ResponseFile>(`${this.url}/api/files/upload`, dto, {
      // el backend dira si necesitamos o no enviar el headers
      // headers: {
      //   'Content-type': 'multipart/form-data'
      // }
    });
  }
}
