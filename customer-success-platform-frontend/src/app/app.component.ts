import { Component, ElementRef, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
loadComponent($event: Event) {
throw new Error('Method not implemented.');
}

title = "Customer Success Platform";

// @ViewChild('pdfcontent') contentToConvert!: ElementRef;

//   exportPdf() {
//     const pdf = new jsPDF('p', 'mm', 'a4'); // 'p' for portrait orientation
//       pdf.setFontSize(12);
//     const content = this.contentToConvert.nativeElement;

//     // Gather content from the components
//     const componentContent = content.innerHTML;

//     // Add content to PDF
//     pdf.html(componentContent, {
//       callback: (pdf) => {
//         // Save the PDF
//         pdf.save('generated.pdf');
//       }
//     });
//   }
  }

