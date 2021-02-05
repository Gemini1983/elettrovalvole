export class Cron {
    minuto: string;
    ora: string;
    giorno_mese: string;
    mese: string;
    giorno_settimana: string;

    constructor(
        minuto: string,
        ora: string,
        giorno_mese: string,
        mese: string,
        giorno_settimana: string,
    ){
        this.minuto = minuto;
        this.ora = ora;
        this.giorno_mese = giorno_mese;
        this.mese = mese;
        this.giorno_settimana = giorno_settimana;
    }
}
