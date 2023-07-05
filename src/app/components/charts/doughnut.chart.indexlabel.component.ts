import { Component, Input } from '@angular/core';
import { RequestHrService } from 'src/app/services/request-hr.service';

@Component({
  selector: 'doughnut-chart-indexlabel',
  templateUrl: 'chart.component.html',
})
export class DoughnutChartIndexlabelComponent {
	@Input() title!: string;
	
	// constructor(){}

	@Input() values = [10,11,69,420]
	@Input() labels = ["label1", "label2", "label3", "label4"]

	constructor(private requestHrService: RequestHrService) {
		console.log(requestHrService.getStatistics().subscribe((value) => console.log(value)))
	}
	// chartOptions = {
	// 	animationEnabled: true,
	// 	title:{
	// 	  text: this.title || "aaaaa"
	// 	},
	// 	data: [{
	// 	  type: "doughnut",
	// 	  yValueFormatString: "#,###.##'%'",
	// 	  indexLabel: "{name}",
	// 	  dataPoints: this.values.map((value, index) => ({ y: value, name: this.labels[index] }))
	// 	}]
	// }	
	
	get chartOptions() {
		const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]; 
		return {
		  animationEnabled: true,
		  title: {
			fontFamily: "Macha Bold",
			text: this.title 
		  },
		  backgroundColor: "transparent",
		  data: [{
			type: "doughnut",
			yValueFormatString: "#,###.##",
			indexLabel: "‎   {name} {y}  ‎ ",
			indexLabelPlacement: "outside",
			dataPoints: this.values.map((value, index) => ({ y: value, name: this.labels[index], color: colors[index % colors.length] }))
		  }]
		};
	  }
}
