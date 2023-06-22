import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Feedback } from 'src/app/models/feedback';
import { FeedbackFormService } from 'src/app/services/feedback-form.service';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent implements OnInit {
  feedbackForm: FormGroup; //Tracks the value and validity state of a group of FormControl instances.
  feedbacks: Feedback[] = []; // arrau that will hold the feedback object

  constructor(private feedbackService: FeedbackFormService) {
    this.feedbackForm = new FormGroup({
      'category': new FormControl('feedback'),
      'title': new FormControl(''),
      'content': new FormControl('')
    });
  }

  ngOnInit() {
    this.getFeedbacks();
  }

  getFeedbacks() {
    this.feedbackService.getFeedback().subscribe((response) => {
      this.feedbacks = response.reverse();
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