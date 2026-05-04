export default class ResponseUserDTO {

    id!: number
    
    email!: string

    constructor(id?: number, email?: string){
        if(id != undefined && id != null) this.id = id
        if(email != undefined && email != null) this.email = email
    }

}