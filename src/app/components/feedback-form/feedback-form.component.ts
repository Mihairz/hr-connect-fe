import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Feedback } from 'src/app/models/feedback';
import { FeedbackFormService } from 'src/app/services/feedback-form.service';
//https://stackoverflow.com/questions/50995170/angular-mattabledatasource-error
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent implements OnInit, AfterViewInit  {
  feedbackForm: FormGroup; //Tracks the value and validity state of a group of FormControl instances.
  feedbacks: Feedback[] = []; // array that will hold the feedback object
  displayedColumns: string[] = ['category', 'title', 'content']; //column of the tabel
  

  constructor(private feedbackService: FeedbackFormService) {
    this.feedbackForm = new FormGroup({
      'category': new FormControl('feedback'),
      'title': new FormControl(''),
      'content': new FormControl('')
    });
   
  }
  @ViewChild('paginator') paginator!: MatPaginator ;
  
  dataSource = new MatTableDataSource(this.feedbacks);
  // dataSource!: MatTableDataSource<Feedback>;
 
  // @ViewChild(MatSort, { static: false })
  // set sort(value: MatSort) {
  //   if (this.dataSource) {
  //     this.dataSource.sort = value;
  //   }
  // }

  @ViewChild(MatSort) sort!: MatSort;
  
  ngOnInit() {
    this.getFeedbacks();
   
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;
}

getFeedbacks() {
  this.feedbackService.getFeedback().subscribe((response) => {
    this.feedbacks = response.reverse();
    this.dataSource = new MatTableDataSource(this.feedbacks); //sets the dataSource property 
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator; //sets the paginator property 
  });
}



//method when we submit the form 
  saveFeedback() {
    //if the form is valid
    if (this.feedbackForm.valid)  { 
      this.feedbackService.addFeedback(this.feedbackForm.value).subscribe(() => {
        this.feedbackForm.reset();
        this.getFeedbacks();
      });
    }
  }
 
}