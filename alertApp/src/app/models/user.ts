// Entity contenant les données personnelles de l'User
export class User {
    constructor(public id: number = null,
                public pseudo: string = null,
                public firstName: string = null,
                public email: string = null,
                public password: string = null,
                public appVersion: string = null,      // Version Standard ou Premium
                public status: boolean = false) { }     // Statut de Connexion
}
