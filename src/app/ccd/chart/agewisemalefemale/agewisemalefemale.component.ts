import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'
import { PatientService } from 'src/app/patient.service';

@Component({
  selector: 'app-agewisemalefemale',
  templateUrl: './agewisemalefemale.component.html',
  styleUrls: ['./agewisemalefemale.component.css']
})
export class AgewisemalefemaleComponent implements OnInit {
  pieChart = [];
  callStatusLabels: [];
  noOfCallHistory = [];
  allData: any;

  constructor(private view: PatientService) { }

  ngOnInit(): void {
    this.loadAllPaitientsAgewiseMaleFememaleData();
  }
  loadAllPaitientsAgewiseMaleFememaleData() {
    const ageLabels = [];
    const maleCount = [];
    const femaleCount = [];
    this.view.agewiseMaleFememaleData().subscribe((result) => {
      this.allData = JSON.parse(JSON.stringify(result))
      var ctx = document.getElementById('chart');
      this.allData.forEach(function (element) {
        ageLabels.push(element.age);
        maleCount.push(element.maleCount);
        femaleCount.push(element.femaleCount);
      })
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ageLabels,
          datasets: [
            {
              label: 'Number Of female',
              backgroundColor: "#fd7e14",
              data: femaleCount
            },
            {
              label: 'Number Of male',
              backgroundColor: "#28a745",
              data: maleCount
            }

          ]
        },
        options: {
          title: {
            display: true,
            text: 'Age wise male or female'
          },
          scales: {
            xAxes: [{ stacked: true }],
            yAxes: [{ stacked: true }]
          }
        }
      });
    });
  }

}
