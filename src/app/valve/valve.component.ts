import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cron, Task, Valve } from '../model/models';
import { RequestService } from '../service/Request.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-valve',
  templateUrl: './valve.component.html',
  styleUrls: ['./valve.component.scss'],
})
export class ValveComponent implements OnInit {
  idValve: any;
  valve: Valve;
  closeResult = '';
  minutiApertura: number = 5;
  aperturaIndefinita: boolean;

  constructor(
    private requestService: RequestService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.idValve = +params['idValve'] || 0;
      this.requestService.get_valve(this.idValve).subscribe((responseValve) => {
        //Creazione struttura dei dati
        console.log(responseValve);
        var tasks = [];
        var temp_task = null;
        var temp_cron = null;
        tasks = [];
        for (let task of responseValve.tasks) {
          temp_task = null;
          temp_cron = null;
          temp_cron = new Cron(
            task.minuto,
            task.ora,
            task.giorno_mese,
            task.mese,
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

  open(content) {
    this.modalService
      .open(content, {
        size: 'sm',
        backdrop: 'static',
        ariaLabelledBy: 'modal-basic-title',
      })
      .result.then(
        (result) => {
          if (result === 'Apri') {
            this.requestService
              .post_valve(this.idValve, 'aperta', this.minutiApertura)
              .subscribe((responseValve) => {
                setTimeout(() => {
                  this.ngOnInit();
                }, 1000);
              });
          }
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  close() {
    this.requestService
      .post_valve(this.idValve, 'chiusa', 0)
      .subscribe((responseValve) => {
        this.ngOnInit();
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
