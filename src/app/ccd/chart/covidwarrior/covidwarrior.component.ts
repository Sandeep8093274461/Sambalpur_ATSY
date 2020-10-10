import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'
import { PatientService } from 'src/app/patient.service';

@Component({
  selector: 'app-covidwarrior',
  templateUrl: './covidwarrior.component.html',
  styleUrls: ['./covidwarrior.component.css']
})
export class CovidwarriorComponent implements OnInit {
  covidWorriorList:any;
  constructor(private view: PatientService) { }

  ngOnInit(): void {
    this.loadAllPaitientsCovidWarriorWise();
  }
  loadAllPaitientsCovidWarriorWise(){
    const covidwiseLebels = [];
    const noOfCovid = [];
    this.view.loadAllPaitientsCovidWarriorWise().subscribe((result) => {
      this.covidWorriorList = JSON.parse(JSON.stringify(result))
      var pie = document.getElementById('covidWarriorWisePieChart');
      this.covidWorriorList.forEach(function (element) {
        covidwiseLebels.push(element.covidwarrior);
        noOfCovid.push(element.count);
      })
      var myPieChart = new Chart(pie, {
        // The type of chart we want to create
        type: 'pie',

        // The data for our dataset
        data: {
            datasets: [{
                backgroundColor: ["#2196f3", "#3f51b5"],
                borderColor: '#0000',
                data: noOfCovid,

            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: covidwiseLebels
        },

        // Configuration options go here
        options: {
            title: {
                display: true,
                text: 'Number of Covid warriors '
            }

        }
    });
    });

  }
}
