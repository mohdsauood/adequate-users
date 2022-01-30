import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  setToSessionStorage({ pagination }: { pagination: number }): void {
    sessionStorage.setItem('pagination', JSON.stringify(pagination));
  }

  getFromSessionStorage(): { pagination: number } {
    return JSON.parse(sessionStorage.getItem('pagination')!);
  }
}
