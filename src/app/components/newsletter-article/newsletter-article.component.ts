import { Component, OnInit } from '@angular/core';
import { NewsletterArticle } from 'src/app/models/newsletter-article';
import { MatDialog } from '@angular/material/dialog';
import { NewsletterService } from 'src/app/services/newsletter.service';
import { AddArticleModalComponent } from '../add-article-modal/add-article-modal.component';
import { PageEvent } from '@angular/material/paginator';


// to filter by title used this tutorial: https://www.youtube.com/watch?v=lTOQ7Fjhcvk

@Component({
  selector: 'app-newsletter-article',
  templateUrl: './newsletter-article.component.html',
  styleUrls: ['./newsletter-article.component.css'],
})
export class NewsletterArticleComponent implements OnInit {
  articles: NewsletterArticle[] = [];
  _filterText: string = ''; 
  filteredArticles: NewsletterArticle [] = []; 
  //this is for pagination, starting page
  p: number = 1;
  selectedCategory: string = '';


  get filterText(){
    return this._filterText;
  }
  
  set filterText(value: string){
    this._filterText = value; //equal to what we add in the text box
    this.filterArticles(); //whenever the text is changed we reimplement filterArticles() also due to NgModel we get the result of this function
  }
  

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
      this.filteredArticles = this.articles; // we make sure that filteredArticles array is a copy of articles that we actually show in our html
    
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
    
      data: { title: '', author: '', date: '', urlpic:'',  content: '', category: '' }
      
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
//filters the articles and keeps the ones where what we add in the textbox exists in an article title

  filterArticles(){
    
    this.filterByCategory();

    if(this.articles.length === 0 || this._filterText === ''){
      // this.filteredArticles = this.articles; // if the textbox is empty or we have no articles we keep the status quo 
      //-- this one above is required if we don't implement the filter by category (there is already this.filteredArticles = this.articles; in the filter by category) - now if the field is empty do nothing - 
    } else {
      //found here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter#searching_in_array
      this.filteredArticles = this.articles.filter((article) => //filter function creates a new array which includes only the items that match the filter - article is a parameter that reprisents one item of the articles array
      { 
          return article.title.toLowerCase().includes(this._filterText.toLowerCase()); // we return each article that includes whats written in the textbox
      })
    }
    
}

filterByCategory() {
  // We copy all the articles in filteredArticles
  this.filteredArticles = this.articles;

  // Filter by category if a category is selected
  if (this.selectedCategory !== '') {
    this.filteredArticles = this.articles.filter(article => article.category === this.selectedCategory);
}

}
}