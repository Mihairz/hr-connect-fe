import { Component, OnInit } from '@angular/core';
import { NewsletterArticle } from 'src/app/models/newsletter-article';
import { MatDialog } from '@angular/material/dialog';
import { NewsletterService } from 'src/app/services/newsletter.service';
import { AddArticleModalComponent } from '../add-article-modal/add-article-modal.component';

// needed for the search functionality 

@Component({
  selector: 'app-newsletter-article',
  templateUrl: './newsletter-article.component.html',
  styleUrls: ['./newsletter-article.component.css'],
})
export class NewsletterArticleComponent implements OnInit {
  articles: NewsletterArticle[] = [];
  

  constructor(
    private articlesService: NewsletterService,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    console.log('Newsletter article component works');
    this.getArticles();
  }

  getArticles() {
    this.articlesService.getNewsletterArticles().subscribe((response) => {
      this.articles = response.reverse(); // nu e good practice si ar trebui din backend sa sortam aceste articole ca cel nou sa fie in fata
      console.log(response);
    });
  }
  editArticle(article: NewsletterArticle) {
    
    
    const dialogRef = this.dialog.open(AddArticleModalComponent, {
      data: { ...article }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getArticles();
    });
  }
  addArticle() {
    const dialogRef = this.dialog.open(AddArticleModalComponent, {
    
      data: { title: '', author: '', date: '', urlpic:'',  content: '' }
      
    });
    dialogRef.afterClosed().subscribe(result => {
      
      this.getArticles();
    });
  }
  deleteArticle(id:number ) {
    this.articlesService.deleteNewsletterArticle(id).subscribe(() => {
      this.getArticles()
    });
  }
}
