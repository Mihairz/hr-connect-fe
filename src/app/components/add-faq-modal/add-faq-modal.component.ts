import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
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
    
  ) {}
  ngOnInit() {
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  saveArticle() {
    if (this.data.id) {
      this.aService.updateFaqContent(this.data).subscribe(() => {
        this.dialogRef.close();
      })
    }
    else {
      this.aService.addFaqContent(this.data).subscribe(() => {
        this.dialogRef.close();
      })
    }

  }
  

  
}
