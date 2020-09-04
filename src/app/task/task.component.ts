import { Component, OnInit, Input } from '@angular/core';
import { Cron, Task } from '../model/models';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() pass_task: Task; 

  constructor() { 
  }

  ngOnInit(): void {
  }
  printcron(cron:Cron){
    return (' '+cron.minuto+ ' '+ cron.ora +' '+ cron.giorno_mese+' '+ cron.mese+' '+ cron.giorno_settimana)
  }


}
