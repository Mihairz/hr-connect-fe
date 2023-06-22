import { Component, OnInit } from '@angular/core';
import { FaqContent } from 'src/app/models/faq';
import { MatDialog } from '@angular/material/dialog';
import { FaqService } from 'src/app/services/faq.service';
import { AddFaqModalComponent } from '../add-faq-modal/add-faq-modal.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


// to filter by title used this tutorial: https://www.youtube.com/watch?v=lTOQ7Fjhcvk

@Component({
  selector: 'app-faq-section',
  templateUrl: './faq-section.component.html',
  styleUrls: ['./faq-section.component.css']
})
export class FaqSectionComponent implements OnInit {
  // all categories, helps us structure in html - put every item in its category an later
  faqCategories: string[] = [
     "Recruitment & Onboarding",
     "Compensation & Benefits",
     "Workplace Policies & Environment",
     "Professional Development & Performance",
     "Conflict Resolution & Employee Support",
     "Employee Resources & Services"


  ];

  faqsByCategory: {[key: string]: FaqContent[]} = {};
  faqs: FaqContent[] = [];
  _filterText: string = ''; 
  filteredFaqs: FaqContent [] = []; 
  filteredFaqsByCategory: {[key: string]: FaqContent[]} = {};


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
  this.faqsService.getFaqContent().subscribe((response) => { // makes hhtp request - fetches the faqs - sends back the response
    this.faqCategories.forEach(category => { //This line is looping through each category in the faqCategories array
      this.faqsByCategory[category] = response.filter(faq => faq.category === category); // so for each item in the key category we add the faq for instance we will have "Recruitment & Onboarding": [{...faq1}, etc.
    });
    this.filterFaqs(); 
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
    data: { category:'',title: '', content: '' , order:''}
  });
  dialogRef.afterClosed().subscribe(result => {
    this.getFaqs();
   
  });
}

deleteFaq(id:number ) {
  this.faqsService.deleteFaqContent(id).subscribe(() => {
    this.getFaqs();
    
  });
}

//filters the articles and keeps the ones where what we add in the textbox exists in a faq title - it will still show by category
filterFaqs() {
  if (this._filterText === '') {
    this.filteredFaqsByCategory = {...this.faqsByCategory}; // if filter empty - create a new object with the same properties and values as this.faqsByCategory
  } else {
    for (let category of this.faqCategories) { // the function goes through each category in this.faqCategories using a for loop - then filters based on what was written in the textbox
      this.filteredFaqsByCategory[category] = this.faqsByCategory[category].filter((faq) => {
         //found here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter#searching_in_array
        return faq.title.toLowerCase().includes(this._filterText.toLowerCase()); // the filtered Faqs gets the filtered items that match the filter for the title and then are presented on the page - see filteredFaqsByCategory[category] in html 
      });
    }
  }
}




//event handler - triggered when a drag and drop is done. changes the faqs array
drop(event: CdkDragDrop<string[]>) {
  moveItemInArray(this.faqs, event.previousIndex, event.currentIndex); 
  this.updateFaqOrders();
}
//is a function that adds 1 to each order when an element and also updates the backend. 
//This way we have a plus one in order after the drop above
updateFaqOrders() {
  this.faqs.forEach((faq, index) => {
    faq.order = index + 1;
    this.faqsService.updateFaqContent(faq).subscribe();
  });
  this.filteredFaqs = this.faqs; //the new faqs are copied into filteredFaqs so we can have the updated displayed
}

}