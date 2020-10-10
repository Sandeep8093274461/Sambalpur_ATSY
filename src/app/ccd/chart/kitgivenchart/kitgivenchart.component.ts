import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'
import { PatientService } from 'src/app/patient.service';


@Component({
  selector: 'app-kitgivenchart',
  templateUrl: './kitgivenchart.component.html',
  styleUrls: ['./kitgivenchart.component.css']
})
export class KitgivenchartComponent implements OnInit {
  kitWiseList:any;
  constructor(private view: PatientService) { }

  ngOnInit(): void {
    this.loadAllPaitientsKitWise();
  }
  loadAllPaitientsKitWise(){
    const kitwiseLebels = [];
    const noOfKit = [];
    this.view.loadAllPaitientsKitWise().subscribe((result) => {
      this.kitWiseList = JSON.parse(JSON.stringify(result))
      var pie = document.getElementById('kitGivenPieChart');
      this.kitWiseList.forEach(function (element) {
        kitwiseLebels.push(element.kit);
        noOfKit.push(element.count);
      })
      var myPieChart = new Chart(pie, {
        // The type of chart we want to create
        type: 'pie',

        // The data for our dataset
        data: {
            datasets: [{
                backgroundColor: ["#8B0000", "#FF8C00"],
                borderColor: '#0000',
                data: noOfKit,

            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: kitwiseLebels
        },

        // Configuration options go here
        options: {
            title: {
                display: true,
                text: 'Number of Kit given '
            }

        }
    });
    });

  }
}
