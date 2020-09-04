import { Component, OnInit } from '@angular/core';
import { RequestService } from '../service/Request.service';
import { Cron, Task, Valve } from '../model/models';

@Component({
  selector: 'app-listvalves',
  templateUrl: './listvalves.component.html',
  styleUrls: ['./listvalves.component.scss']
})
export class ListvalvesComponent implements OnInit {

  public valves: any;

  constructor(private httpService:RequestService) {
    this.get_valves();

   }

  ngOnInit(): void {
  }

  printcron(cron:Cron){
    return (' '+cron.minuto+ ' '+ cron.ora +' '+ cron.giorno_mese+' '+ cron.mese+' '+ cron.giorno_settimana)
  }

  get_valves() {
    this.httpService.get_valves().subscribe(response => {

      //Creazione struttura dei dati
      var tasks = [];
      var temp_task = null;
      var temp_cron = null;
      var valves = [];

      for (let valve of response) {
        tasks = [];
        for(let task of valve.tasks){
          temp_task = null; 
          temp_cron = null;
          temp_cron = new Cron(task.giorno_mese, task.minuto, task.ora, task.giorno_mese, task.giorno_settimana);
          temp_task = new Task(task.id, task.descrizione, temp_cron, task.tempo_apertura, task.abilitato);
          tasks.push(temp_task)
        }
        valves.push(new Valve(valve.id,valve.descrizione,tasks,valve.stato));
      }

      this.valves=valves;
      console.log(JSON.stringify(this.valves));
    });
  }

}
