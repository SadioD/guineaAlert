// Entity contenant la Personne A Contacter
export class Pac {
    // Variables ------------------------------------------------------------------------------------------------------------
    protected id: number;
    protected firstName: string;
    protected pseudo: string;
    protected tel: number;
    // ----------------------------------------------------------------------------------------------------------------------
    // Constructor ----------------------------------------------------------------------------------------------------------
    constructor(id: number, firstName: string, pseudo: string, tel: number) {
        this.id         = id;
        this.firstName  = firstName;
        this.pseudo     = pseudo;
        this.tel        = tel;
    }// ---------------------------------------------------------------------------------------------------------------------
}
