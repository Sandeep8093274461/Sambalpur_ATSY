import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'
import { PatientService } from 'src/app/patient.service';
@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {
  pieChart = [];
  blockLabels: [];
  noOfBlocks = [];
  blockList: any;
  constructor(private view: PatientService) { }

  ngOnInit(): void {
    this.loadAllPaitientsBlockWise();
  }
  loadAllPaitientsBlockWise() {
    const blockLabels = [];
    const noOfBlocks = [];
    this.view.loadAllPaitientsBlockWise().subscribe((result) => {
      this.blockList = JSON.parse(JSON.stringify(result))
      var bar = document.getElementById('blockWiseBarChart');
      this.blockList.forEach(function (element) {
        blockLabels.push(element.block);
        noOfBlocks.push(element.count);
      })
      var chart = new Chart(bar, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
          labels: blockLabels,
          datasets: [{
            label: 'Number Of Person affected',
            backgroundColor:  ["#6f42c1", "#007bff","#4caf50","#e83e8c","#dc3545","#28745","#fd7e14","#c4183c","#20c997"],
            borderColor: 'rgb(255, 99, 132)',
            data: noOfBlocks
          }]
        },

        // Configuration options go here
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Block wise patients'
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
