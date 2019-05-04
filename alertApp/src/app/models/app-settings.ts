// Entity contenant les paramètres de l'APP
export class AppSettings {
    // Variables ------------------------------------------------------------------------------------------------------------
    protected label: string;
    protected shortDesc: string;
    protected longDesc: string;
    protected url: string;
    protected icon: string;
    // ----------------------------------------------------------------------------------------------------------------------
    // Constructor ----------------------------------------------------------------------------------------------------------

    constructor(label: string, shortDesc: string, longDesc: string, url: string, icon: string) {
        this.label      = label;
        this.shortDesc  = shortDesc;
        this.longDesc   = longDesc;
        this.url        = url;
        this.icon       = icon;
    }// ---------------------------------------------------------------------------------------------------------------------
}
