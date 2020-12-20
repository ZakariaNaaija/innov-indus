import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TunisairService {

  constructor( private http: HttpClient) { }
  private aircraftStatus: AircraftStatusColored [] = [];
  private aircraftUpdated = new  Subject<AircraftStatusColored []>();
  private aircraftDetailUpdated = new  Subject<AircraftDetail>();
  private aircraftDetail: AircraftDetail;

  getAircraftStatusListenner() {
    return this.aircraftUpdated.asObservable();
  }
  getAircraftDetailListenner() {
    return this.aircraftDetailUpdated.asObservable();
  }
  getAircrafts() {
   let aircrafts = [];
    this.aircraftStatus.forEach((item) => {
      if (item.status != 'undefined')
      aircrafts.push(item.name);
    });
    return aircrafts;
  }

  getAircraftRuls(gradientFill) {
    let aircraftstatus:AircraftStatus[]   = [
      {
        status:'in danger',
        name:'Machine 1',
        rul:[1,2,3,6,5,8],
        timeseries:['2018-01-15 15:45:00','2018-01-18 15:45:00','2018-01-19 15:45:00','2018-01-20 15:45:00','2018-01-22 15:45:00','2018-01-25 15:45:00'],
      
      },
      {
        status:'in danger',
        name:'Machine 2',
        rul:[1,2,3,6,5,15],
        timeseries:['2018-01-15 15:45:00','2018-01-18 15:45:00','2018-01-19 15:45:00','2018-01-20 15:45:00','2018-01-22 15:45:00','2018-01-25 15:45:00'],
      
      },
      {
        status:'good',
        name:'Machine 3',
        rul:[1,2,3,6,5,7],
        timeseries:['2018-01-15 15:45:00','2018-01-18 15:45:00','2018-01-19 15:45:00','2018-01-20 15:45:00','2018-01-22 15:45:00','2018-01-25 15:45:00'],
      
      },
      {
        status:'good',
        name:'Machine 4',
        rul:[1,2,3,6,5,2],
        timeseries:['2018-01-15 15:45:00','2018-01-18 15:45:00','2018-01-19 15:45:00','2018-01-20 15:45:00','2018-01-22 15:45:00','2018-01-25 15:45:00'],
      
      },
      {
        status:'good',
        name:'Machine 5',
        rul:[1,2,3,6,5,1],
        timeseries:['2018-01-15 15:45:00','2018-01-18 15:45:00','2018-01-19 15:45:00','2018-01-20 15:45:00','2018-01-22 15:45:00','2018-01-25 15:45:00'],
      
      }
    ]
    let result = aircraftstatus.map(statu => {
           let colorStat = [];
           if ( statu.status !== 'in danger' ) {
             colorStat = [
               {
                 borderColor: "#18ce0f",
                 pointBorderColor: "#FFF",
                 pointBackgroundColor: "#18ce0f",
                backgroundColor: gradientFill
               }
             ];
           } else {
             colorStat = [
               {
                 borderColor: "#ff000c",
                 pointBorderColor: "#FFF",
                 pointBackgroundColor: "#ff000c",
                 backgroundColor: gradientFill
               }
             ];
           }
            return {
              status: statu.status,
              name: statu.name,
              rul:
                [
                  {
                    label: 'Defects',
                    pointBorderWidth: 2,
                    pointHoverRadius: 4,
                    pointHoverBorderWidth: 1,
                    pointRadius: 4,
                    fill: true,
                    borderWidth: 2,
                    data: statu.rul
                  }
                ],
              timeseries: statu.timeseries,
              colorsOp : colorStat
            };
         });
      
         this.aircraftStatus = result;
         this.aircraftUpdated.next([...this.aircraftStatus]);
     

  }
    getAircraftsDetails(){

    }

    getAircraftsRul() {

      let aircraftsRul = [];
      let aircraftLabel = [];
      this.aircraftStatus.forEach((item) => {
        if (item.status !== 'undefined') {
          aircraftsRul.push(item.rul[0].data[item.rul[0].data.length - 1]);
          aircraftLabel.push(item.name);
        }
      });
   /*   aircraftLabel = aircraftLabel.map( item => {
        return item.replace(" 00:00:00.100000","");
      });*/
      return {rul: aircraftsRul , label: aircraftLabel};
    }


  getDetail(aircraftId: any,gradient) {
    this.http.get<AircraftDetail>('http://18.212.69.214:5000/api/aircraft/'+aircraftId).pipe(map((detail) => {
        let colorStat = [];
        if ( detail.status !== 'in danger' ) {
          colorStat = [
            {
              borderColor: "#18ce0f",
              pointBorderColor: "#FFF",
              pointBackgroundColor: "#18ce0f",
              backgroundColor: gradient
            }
          ];
        } else {
          colorStat = [
            {
              borderColor: "#ff000c",
              pointBorderColor: "#FFF",
              pointBackgroundColor: "#ff000c",
              backgroundColor: gradient
            }
          ];
        }
     let val = detail.timeseries.map( item => {
        return item.replace(" 00:00:00.100000","");
      });
        return {
          aircraft_type:detail.aircraft_type,
          status: detail.status,
          name: detail.name,
          rul:
            [
              {
                label: 'Rul',
                pointBorderWidth: 2,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 1,
                pointRadius: 4,
                fill: true,
                borderWidth: 2,
                data: detail.rul
              }
            ],
          timeseries: val,
          colorsOp : colorStat
        };

    })).subscribe((result)=>{
      this.aircraftDetail=result;
      this.aircraftDetailUpdated.next(this.aircraftDetail);

    });
  }

  resetGraph(aircraftId) {
    this.http.delete('http://18.212.69.214:5000/api/aircraft/' + aircraftId, { responseType: 'text' }).subscribe(()=> {
      this.aircraftUpdated.next([...this.aircraftStatus]);
    });
  }
}

