import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'
import { PatientService } from 'src/app/patient.service';
@Component({
  selector: 'app-chat-call-history',
  templateUrl: './chat-call-history.component.html',
  styleUrls: ['./chat-call-history.component.css']
})
export class ChatCallHistoryComponent implements OnInit {
  pieChart = [];
  callStatusLabels: [];
  noOfCallHistory = [];
  blockList: any;
  constructor(private view: PatientService) { }

  ngOnInit(): void {
    this.loadAllCallHistory();
  }
  loadAllCallHistory() {
    const callStatusLabels = [];
    const noOfCallHistory = [];
    this.view.loadAllCallHistory().subscribe((result) => {
      this.blockList = JSON.parse(JSON.stringify(result))
      var bar = document.getElementById('callHistoryWiseBarChart');
      this.blockList.forEach(function (element) {
        callStatusLabels.push(element.callStatus);
        noOfCallHistory.push(element.count);
      })
      var chart = new Chart(bar, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
          labels: ['Disconnected','No network','Pickedup'],
          datasets: [{
            label: 'Number Of call',
            backgroundColor:  ["#6f42c1", "#007bff","#4caf50","#e83e8c","#dc3545","#28745","#fd7e14","#c4183c","#20c997"],
            borderColor: 'rgb(255, 99, 132)',
            data: noOfCallHistory
          }]
        },

        // Configuration options go here
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Total Number Of Call'
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  // max:10
                 
                }
              }
            ]
          }
        },
       

      });
    });
  }

}
