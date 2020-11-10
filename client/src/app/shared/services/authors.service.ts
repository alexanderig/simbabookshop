import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Author, Message} from '../interfaces';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  constructor(private http: HttpClient) {
  }

  fetch(): Observable<Author[]> {
    return this.http.get<Author[]>('/api/author');
  }

  getById(id: string): Observable<Author> {
    return this.http.get<Author>(`/api/author/${id}`);
  }

  create(name: string, image?: File): Observable<Author> {
    const fd = new FormData();

    if (image) {
      fd.append('image', image, image.name);
    }
    fd.append('name', name);

    return this.http.post<Author>('/api/author', fd);
  }

  update(id: string, name: string, image?: File): Observable<Author> {
    const fd = new FormData();

    if (image) {
      fd.append('image', image, image.name);
    }
    fd.append('name', name);

    return this.http.patch<Author>(`/api/author/${id}`, fd);
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/author/${id}`);
  }
}
