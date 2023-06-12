import { Component, OnInit } from '@angular/core';
import { NewsletterArticle } from 'src/app/models/newsletter-article';
import { MatDialog } from '@angular/material/dialog';
import { NewsletterService } from 'src/app/services/newsletter.service';

@Component({
  selector: 'app-newsletter-article',
  templateUrl: './newsletter-article.component.html',
  styleUrls: ['./newsletter-article.component.css']
})
export class NewsletterArticleComponent implements OnInit {
  articles: NewsletterArticle[] = [];

constructor(
  private articlesService: NewsletterService,
  public dialog: MatDialog

) { }
ngOnInit() {
  console.log("Newsletter article component works")
  this.getArticles();
}

getArticles() {
  this.articlesService.getNewsletterArticles().subscribe((response) => {
    this.articles = response;
    console.log(response)
    
  })
}
}