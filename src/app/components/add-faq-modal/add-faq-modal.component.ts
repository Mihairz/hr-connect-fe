import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FaqContent } from 'src/app/models/faq';
import { FaqService } from 'src/app/services/faq.service';

@Component({
  selector: 'app-add-faq-modal',
  templateUrl: './add-faq-modal.component.html',
  styleUrls: ['./add-faq-modal.component.css']
})
export class AddFaqModalComponent {
  constructor(
    public dialogRef: MatDialogRef<AddFaqModalComponent>,
    private aService: FaqService,
    @Inject(MAT_DIALOG_DATA) public data: FaqContent

  ) { }
  ngOnInit() {
  }

  closeModal(): void {
    this.dialogRef.close();
  }




  selectedPDF: File | undefined;
  previewPDF: string | undefined;

  onPDFSelected(event: any) {
    const file: File = event.target.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      this.selectedPDF = file;
      this.previewPDF = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  uploadPDF() {

    if (this.selectedPDF) {
      this.aService.uploadPDF(this.selectedPDF, this.data.id).subscribe(() => {
        // this.modalCloseCause = 'coverImageUploadSuccess';  (this.modalCloseCause)
        this.data.documentState = 'faqHasPDF';
        this.dialogRef.close();
      },
        (error: any) => {
          console.error(error);
        }
      );
    }

  }



  saveArticle() {
    if (this.data.id) { // if id exists we update

      if (this.data.documentState === 'editPDF') {

        this.uploadPDF();

      } else {
        this.aService.updateFaqContent(this.data).subscribe(() => {
          this.dialogRef.close();
        })
      }

    }
    else {
      this.aService.addFaqContent(this.data).subscribe(() => {
        this.dialogRef.close();
      })
    }

  }



}
