import {Component, Input} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TieredMenu } from 'primeng/tieredmenu';
import { Button } from 'primeng/button';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'toggle-menu',
  standalone: true,
  imports: [
    TieredMenu,
    Button
  ],
  templateUrl: './toggle-menu.component.html'
})
export class MiMenuComponent {
  @Input() path!:string;
  items: MenuItem[] = [];


  constructor(private http: HttpClient) {
    // Definiendo los ítems manualmente
    this.items = [
      {
        label: 'Elija el formato:',
        disabled: true,
        style: { 'font-weight': 'bold', 'color': '#fff' }
      },
      {
        label: 'Pdf',
        icon: 'pi pi-file-pdf',
        iconStyle: { color: 'var(--p-red-400)' },
        command: () => this.descargarReporte('pdf') // Llama al método con el formato 'pdf'
      },
      {
        label: 'Word',
        icon: 'pi pi-file-word',
        iconStyle: { color: 'var(--p-blue-400)' },
        command: () => this.descargarReporte('word') // Llama al método con el formato 'word'
      },
      {
        label: 'Excel',
        icon: 'pi pi-file-excel',
        iconStyle: { color: 'var(--p-green-400)' },
        command: () => this.descargarReporte('excel') // Llama al método con el formato 'excel'
      }
    ];
  }

  descargarReporte(format: string): void {
    const endpoint = `http://localhost:8080/${this.path}/reporte?format=${format}`;

    this.http.get(endpoint, { responseType: 'blob' }).subscribe({
      next: (response) => {
        // Crear un enlace temporal para descargar el archivo
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reporte.${format}`; // Nombre del archivo con la extensión correcta
        a.click();
        window.URL.revokeObjectURL(url); // Liberar el objeto URL
      },
      error: (err) => {
        console.error('Error al descargar el archivo:', err);
      }
    });
  }

  private getMimeType(format: string): string {
    switch (format) {
      case 'pdf': return 'application/pdf';
      case 'word': return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      case 'excel': return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      default: return 'application/octet-stream';
    }
  }
}
