export class User {
    constructor(public id: number,
                public pseudo: string,
                public firstName: string,
                public email: string,
                public password: string,
                public appVersion: string,      // Version Standard ou Premium
                public status: boolean) { }     // Statut de Connexion
}
