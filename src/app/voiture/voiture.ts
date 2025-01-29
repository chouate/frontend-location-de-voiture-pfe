export class Voiture{
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    id: number;
    price:number;
    carId: number;
    name: string;
    //transmissionType: string;
    numberOfDoors: number;//portes
    numberOfBags: number;//sacs
    numberOfSeats: number;//Places
    carburant:string;
    hasAirConditioning: boolean;//climatisation
    imageUrl: string;
    //carTypeId: number;
    type: string;
    nom : string;

    // constructor(
    //     price:number=23,
    //     carId: number=23,
    //     name: string='bmw',
    //     numberOfDoors: number=3,
    //     numberOfBags: number=3,
    //     numberOfSeats: number=3,
    //     carburant:string='',
    //     hasAirConditioning: boolean=true,
    //     imageUrl: string='',
    //     type: string='',
    //     nom : string='',
    // ){
    //     this.price=price
    //     this.carId=carId
    //     this.name=name
    //     this.numberOfDoors=numberOfDoors
    //     this.numberOfBags=numberOfBags
    //     this.numberOfSeats=numberOfSeats
    //     this.carburant=carburant
    //     this.hasAirConditioning=hasAirConditioning
    //     this.imageUrl=imageUrl
    //     this.type=type
    //     this.nom =nom
    // }
}