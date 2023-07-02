import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NewsletterArticle } from 'src/app/models/newsletter-article';
import { NewsletterService } from 'src/app/services/newsletter.service';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-add-article-modal',
  templateUrl: './add-article-modal.component.html',
  styleUrls: ['./add-article-modal.component.css']
})
export class AddArticleModalComponent {
 
  constructor(
    public dialogRef: MatDialogRef<AddArticleModalComponent>,
    private aService: NewsletterService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: NewsletterArticle
  ) {}

  ngOnInit() {
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  saveArticle() {
    this.data.createdDate = new Date();
   // we need to get the user first otherwise it wouldn't work 
    this.userService.getUserSelf().subscribe(user => {
      this.data.createdBy = user; //we get the whole user
      
      if (this.data.id) { // if id exists we update
        this.aService.updateNewsletterArticle(this.data).subscribe(() => {
          this.dialogRef.close();
        })
      }
      else { //if id doesn't exist we add article
        this.aService.addNewsletterArticle(this.data).subscribe(() => {
          this.dialogRef.close();
        })
      }
    });
  }

}
