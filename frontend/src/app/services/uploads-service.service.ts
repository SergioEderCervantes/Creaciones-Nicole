import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadsServiceService {
  private apiUrl = 'https://backcreacionesnicole.onrender.com/upload';

  constructor(private http: HttpClient) { }

  subirImagen(imagen: File) {
    const formData = new FormData();
    formData.append('image', imagen);

    return this.http.post<{ imageUrl: string }>(this.apiUrl, formData);
  }
}
