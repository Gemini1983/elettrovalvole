import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cron, Task, Valve } from '../model/models';
import { RequestService } from '../service/Request.service';

@Component({
  selector: 'app-valve',
  templateUrl: './valve.component.html',
  styleUrls: ['./valve.component.scss'],
})
export class ValveComponent implements OnInit {
  idValve: any;
  valve: Valve;

  constructor(
    private requestService: RequestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.idValve = +params['idValve'] || 0;
      this.requestService.get_valve(this.idValve).subscribe((responseValve) => {
        //Creazione struttura dei dati
        var tasks = [];
        var temp_task = null;
        var temp_cron = null;
        tasks = [];
        for (let task of responseValve.tasks) {
          temp_task = null;
          temp_cron = null;
          temp_cron = new Cron(
            task.giorno_mese,
            task.minuto,
            task.ora,
            task.giorno_mese,
            task.giorno_settimana
          );
          temp_task = new Task(
            task.id,
            task.descrizione,
            temp_cron,
            task.tempo_apertura,
            task.abilitato
          );
          tasks.push(temp_task);
        }
        this.valve = new Valve(
          responseValve.id,
          responseValve.descrizione,
          tasks,
          responseValve.stato
        );
      });
    });
  }

  redirectHome() {
    this.router.navigate(['/valves']);
  }
}
