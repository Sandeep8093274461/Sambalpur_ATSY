import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'
import { PatientService } from 'src/app/patient.service';

@Component({
  selector: 'app-piechart-for-male-female',
  templateUrl: './piechart-for-male-female.component.html',
  styleUrls: ['./piechart-for-male-female.component.css']
})
export class PiechartForMaleFemaleComponent implements OnInit {
  genderList:any;
  constructor(private view: PatientService) { }

  ngOnInit(): void {
    this.loadAllPaitientsGenderWise();
  }
  loadAllPaitientsGenderWise(){
    const genderLebels = [];
    const noOfGender = [];
    this.view.loadAllPaitientsGenderWise().subscribe((result) => {
      this.genderList = JSON.parse(JSON.stringify(result))
      var pie = document.getElementById('genderWisePieChart');
      this.genderList.forEach(function (element) {
        genderLebels.push(element.gender);
        noOfGender.push(element.count);
      })
      var myPieChart = new Chart(pie, {
        // The type of chart we want to create
        type: 'pie',

        // The data for our dataset
        data: {
            datasets: [{
                backgroundColor: ["#fad84a", "#4caf50"],
                borderColor: '#0000',
                data: noOfGender,

            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: genderLebels
        },

        // Configuration options go here
        options: {
            title: {
                display: true,
                text: 'Total male or female '
            }

        }
    });
    });

  }
}
