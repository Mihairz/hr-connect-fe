import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsletterArticle } from 'src/app/models/newsletter-article';
import { NewsletterService } from 'src/app/services/newsletter.service';

@Component({
  selector: 'app-full-detailed-article',
  templateUrl: './full-detailed-article.component.html',
  styleUrls: ['./full-detailed-article.component.css']
})
export class FullDetailedArticleComponent implements OnInit {
  articleId: string = '';
  article: NewsletterArticle | undefined;

  constructor( 
    private route: ActivatedRoute,
    private articlesService: NewsletterService
  ) { }

//this function on initialisation will fetch the value of the 'id' from the rest of parameters. Also this.articleId is never null so we can implement getArticle + parseint makes from string an integer
//https://medium.com/@tiboprea/accessing-url-parameters-in-angular-snapshot-vs-subscription-efc4e70f9053

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); 
    this.articleId = id !== null ? id : '';
    this.getArticle(parseInt(this.articleId));
  }
// response is the data that we require 
  getArticle(id: number) {
    this.articlesService.getNewsletterArticleById(id).subscribe((response) => {
      this.article = response;
      console.log(response);
    });
  }
}