import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  ) { }

  ngOnInit() {
    console.log(this.data.coverImage)
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  selectedCoverImage: File | undefined;
  previewCoverImage: string | undefined;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.selectedCoverImage = file;
      this.previewCoverImage = reader.result as string;

      reader.readAsDataURL(file);
    }
  }

  uploadProfilePicture() {
    if (this.selectedCoverImage) {
      this.aService.uploadProfilePicture(this.selectedCoverImage).subscribe(
        () => {
          this.newGetUsersEvent.emit();
          this.closeModal();
        },
        (error: any) => {
          console.error(error);
          // Handle any errors that occurred during the request
        }
      );
    }
  }

  saveArticle() {
    this.data.createdDate = new Date();
    // we need to get the user first otherwise it wouldn't work 
    this.userService.getUserSelf().subscribe(user => {
      this.data.createdBy = user; //we get the whole user

      if (this.data.id) { // if id exists we update

        if (this.data.coverImage === 'editCoverImage') {
          // edit cover image request
        } else {
          this.aService.updateNewsletterArticle(this.data).subscribe(() => {
            this.dialogRef.close();
          })
        }

      }
      else { //if id doesn't exist we add article
        this.aService.addNewsletterArticle(this.data).subscribe(() => {
          this.dialogRef.close();
        })
      }
    });
  }

}
