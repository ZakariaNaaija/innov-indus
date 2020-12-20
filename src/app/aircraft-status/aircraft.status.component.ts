import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {TunisairService} from '../services/tunisair.service';


@Component({
  selector: 'app-aircraft',
  templateUrl: './aircraft.status.component.html',
  styleUrls: ['./aircraft.status.component.css']
})
export class AircraftStatusComponent implements OnInit ,OnDestroy{
  public aircraftId;
  public aircraftDetail: AircraftDetail;
  private routeSub: Subscription;
  private aircraftDetailSub: Subscription;
  public gradientChartOptionsConfigurationWithNumbersAndGrid;
  public lineChartWithNumbersAndGridType:string;
  public lineBigDashboardChartData;
  public lineBigDashboardChartLabels;
  public lineBigDashboardChartColors;
  public lineBigDashboardChartOptions;
  public lineBigDashboardChartType;
  public gradientStroke;
  public gradientFill;
  public ctx;
  public canvas;
  public chartColor;
  public items;
  constructor(private route: ActivatedRoute, private tunisair: TunisairService) { }

  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
    ngOnInit(){
      this.chartColor = "#FFFFFF";
      this.canvas = document.getElementById("fake");
      this.ctx = this.canvas.getContext("2d");

      this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
      this.gradientStroke.addColorStop(0, '#80b6f4');
      this.gradientStroke.addColorStop(1, this.chartColor);

      this.gradientFill = this.ctx.createLinearGradient(0, 200, 0, 50);
      this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
      this.gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.24)");

      this.lineBigDashboardChartColors = [
        {
          backgroundColor: this.gradientFill,
          borderColor: this.chartColor,
          pointBorderColor: this.chartColor,
          pointBackgroundColor: "#2c2c2c",
          pointHoverBackgroundColor: "#2c2c2c",
          pointHoverBorderColor: this.chartColor,
        }
      ];
      this.lineBigDashboardChartOptions = {

        layout: {
          padding: {
            left: 20,
            right: 20,
            top: 0,
            bottom: 0
          }
        },
        maintainAspectRatio: false,

        tooltips: {
          backgroundColor: '#fff',
          titleFontColor: '#333',
          bodyFontColor: '#666',
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        legend: {
          position: "bottom",
          fillStyle: "#FFF",
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: "rgba(255,255,255,0.4)",
              fontStyle: "bold",
              beginAtZero: true,
              maxTicksLimit: 5
              ,
              padding: 10
            },
            gridLines: {
              drawTicks: true,
              drawBorder: false,
              display: true,
              color: "rgba(255,255,255,0.1)",
              zeroLineColor: "transparent"
            }

          }],
          xAxes: [{
            gridLines: {
              zeroLineColor: "transparent",
              display: false,

            },
            ticks: {
              padding: 10,
              fontColor: "rgba(255,255,255,0.4)",
              fontStyle: "bold"
              ,
              autoSkip: false
            }
          }]
        }
        ,
        animation: {
          duration: 0
        }
      };

      this.lineBigDashboardChartType = 'bar';


      this.gradientChartOptionsConfigurationWithNumbersAndGrid = {

        layout: {
          padding: {
            left: 20,
            right: 20,
            top: -10,
            bottom: 0
          }
        },
        maintainAspectRatio: false,

        tooltips: {
          backgroundColor: '#fff',
          titleFontColor: '#333',
          bodyFontColor: '#666',
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        legend: {
          position: "bottom",
          fillStyle: "#FFF",
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: "rgba(255,255,255,0.4)",
              fontStyle: "bold",
              beginAtZero: true,
              maxTicksLimit: 5
              ,
              padding: 10
            },
            gridLines: {
              drawTicks: true,
              drawBorder: false,
              display: true,
              color: "rgba(255,255,255,0.1)",
              zeroLineColor: "transparent"
            }

          }],
          xAxes: [{
            gridLines: {
              zeroLineColor: "transparent",
              display: false,

            },
            ticks: {
              padding: 30,
              fontColor: "rgba(255,255,255,0.4)",
              fontStyle: "bold"
              ,
              autoSkip: false
            }
          }]
        }
        ,
        animation: {
          duration: 0
        }
      };
      this.lineBigDashboardChartData = [
        {
          label: "RUL",
          pointBorderWidth: 1,
          pointHoverRadius: 7,
          pointHoverBorderWidth: 2,
          pointRadius: 5,
          fill: true,
          borderWidth: 2,
          data: []
        }
      ];
      this.lineBigDashboardChartLabels =  [];
      this.items = [{data: this.lineBigDashboardChartData, label: this.lineBigDashboardChartLabels}];

     this.lineChartWithNumbersAndGridType = 'line';



      this.routeSub = this.route.params.subscribe(params => {

        this.aircraftId= params['id'];
        this.tunisair.getDetail(this.aircraftId,this.gradientFill);

      });

        this.aircraftDetailSub = this.tunisair.getAircraftDetailListenner().subscribe((aircraftsDetai: AircraftDetail ) => {
     console.log(aircraftsDetai);
      this.aircraftDetail = aircraftsDetai;
      });


    }


ngOnDestroy() {
  this.routeSub.unsubscribe();
  this.aircraftDetailSub.unsubscribe();
}


}
