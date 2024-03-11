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

@ViewChild('content', {static:false}) el!: ElementRef

title = "Customer Success Platform";

exportPdf() {
  let pdf = new jsPDF()

  pdf.html(this.el.nativeElement, {
    callback: (pdf) => {
    //save pdf
    pdf.save("customersuccess.pdf")
  }
  })
}
}
