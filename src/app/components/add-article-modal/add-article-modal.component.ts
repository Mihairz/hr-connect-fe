import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NewsletterArticle } from 'src/app/models/newsletter-article';
import { NewsletterService } from 'src/app/services/newsletter.service';



@Component({
  selector: 'app-add-article-modal',
  templateUrl: './add-article-modal.component.html',
  styleUrls: ['./add-article-modal.component.css']
})
export class AddArticleModalComponent {
 
  constructor(
    public dialogRef: MatDialogRef<AddArticleModalComponent>,
    private aService: NewsletterService,
    @Inject(MAT_DIALOG_DATA) public data: NewsletterArticle
  ) {}

  ngOnInit() {
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  saveArticle() {
    if (this.data.id) {
      this.aService.updateNewsletterArticle(this.data).subscribe(() => {
        this.dialogRef.close();
      })
    }
    else {
      this.aService.addNewsletterArticle(this.data).subscribe(() => {
        this.dialogRef.close();
      })
    }

  }

}
