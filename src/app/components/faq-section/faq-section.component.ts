import { Component, OnInit } from '@angular/core';
import { FaqContent } from 'src/app/models/faq';
import { MatDialog } from '@angular/material/dialog';
import { FaqService } from 'src/app/services/faq.service';
import { AddFaqModalComponent } from '../add-faq-modal/add-faq-modal.component';

// to filter by title used this tutorial: https://www.youtube.com/watch?v=lTOQ7Fjhcvk

@Component({
  selector: 'app-faq-section',
  templateUrl: './faq-section.component.html',
  styleUrls: ['./faq-section.component.css']
})
export class FaqSectionComponent implements OnInit {
  faqs: FaqContent[] = [];
  _filterText: string = ''; 
  filteredFaqs: FaqContent [] = []; 

get filterText(){
  return this._filterText;
}

set filterText(value: string){
  this._filterText = value; //equal to what we add in the text box
  this.filterFaqs(); //whenever the text is changed we reimplement filterArticles() also due to NgModel we get the result of this function
}
constructor(
  private faqsService: FaqService,
  public dialog: MatDialog
) {}
ngOnInit() {
    
  console.log('Faq content component works');
  this.getFaqs();
}
getFaqs() {
  this.faqsService.getFaqContent().subscribe((response) => {
    this.faqs = response;
    this.filteredFaqs = this.faqs; // we make sure that filteredArticles array is a copy of articles that we actually show in our html
    console.log(response);
  });
}
editFaq(faq: FaqContent) {
    
    
  const dialogRef = this.dialog.open(AddFaqModalComponent, {
    data: { ...faq }
  });
  dialogRef.afterClosed().subscribe(result => {
    this.getFaqs();
  });
}
addFaq() {
  const dialogRef = this.dialog.open(AddFaqModalComponent, {
  
    data: { title: '', content: '' }
    
  });
  dialogRef.afterClosed().subscribe(result => {
    
    this.getFaqs();
  });
}
deleteFaq(id:number ) {
  this.faqsService.deleteFaqContent(id).subscribe(() => {
    this.getFaqs()
  });
}
//filters the articles and keeps the ones where what we add in the textbox exists in an article title
filterFaqs(){
  if(this.faqs.length === 0 || this._filterText === ''){
    this.filteredFaqs= this.faqs; // if the textbox is empty or we have no articles we keep the status quo
  } else {
    //found here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter#searching_in_array
    this.filteredFaqs = this.faqs.filter((faq) => //filter function creates a new array which includes only the items that match the filter - article is a parameter that reprisents one item of the articles array
    { 
        return faq.title.toLowerCase().includes(this._filterText.toLowerCase()); // we return each article that includes whats written in the textbox
    })
  }

}
}