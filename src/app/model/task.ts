import { Cron } from './cron';

export class Task { 
    id: string;
    descrizione: string;
    cron: Cron;
    tempo_apertura: string;
    abilitato: boolean;

    constructor(
        id: string,
        descrizione: string,
        cron: Cron,
        tempo_apertura: string,
        abilitato: boolean
    ){
        this.id=id;
        this.descrizione=descrizione;
        this.cron=cron;
        this.tempo_apertura=tempo_apertura;
        this.abilitato=abilitato;
    }
}