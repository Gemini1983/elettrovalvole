import { Task } from './task';

export class Valve { 
    id: string;
    descrizione: string;
    tasks: Array<Task>;
    stato: string;

    constructor(
        id: string,
        descrizione: string,
        tasks: Array<Task>,
        stato: string
    ){
        this.id=id;
        this.descrizione=descrizione;
        this.tasks=tasks;
        this.stato=stato;
    }
}