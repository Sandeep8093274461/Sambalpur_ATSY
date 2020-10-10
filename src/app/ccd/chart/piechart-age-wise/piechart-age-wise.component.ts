import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'
import { PatientService } from 'src/app/patient.service';
@Component({
  selector: 'app-piechart-age-wise',
  templateUrl: './piechart-age-wise.component.html',
  styleUrls: ['./piechart-age-wise.component.css']
})
export class PiechartAgeWiseComponent implements OnInit {
  genderList: any;
  constructor(private view: PatientService) { }

  ngOnInit(): void {
    this.loadAllPaitientsAgeWise();
  }
  loadAllPaitientsAgeWise() {
    const ageLebels = [];
    const noOfPersonas = [];
    this.view.loadAllPaitientsAgeWise().subscribe((result) => {
      this.genderList = JSON.parse(JSON.stringify(result))
      var horizontalBar = document.getElementById('ageWisePieChart');
      this.genderList.forEach(function (element) {
        ageLebels.push(element.age);
        noOfPersonas.push(element.personas);
      })
      var myPieChart = new Chart(horizontalBar, {
        // The type of chart we want to create
        type: 'horizontalBar',

        // The data for our dataset
        data: {
          datasets: [{
            label: 'Number Of Person affected',
            backgroundColor: ["#6f42c1", "#4caf50", "#007bff", "#8B0000", "#fd7e14"],
            borderColor: '#0000',
            data: noOfPersonas,

          }],

          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: ageLebels
        },

        // Configuration options go here
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Age wise patients'
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  min:0
                 
                }
              }
            ]
          }


        }
      });
    });

  }
}
