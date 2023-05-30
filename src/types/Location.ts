import { Category } from './Category'

export type Location = {
    id: string
    name: string
    description: string
    wikipediaUrl?: string
    petitionUrl?: string
    category: Category
    imageUrls: string[]
    ecologicalProblems: string[]
    geoPoint: {coordinateX: number; coordinateY: number}
    polygon:{geoPoints: {coordinateX: number; coordinateY: number; sequenceNumber: number}[]}
    circle:{centerGeoPoint:{coordinateX: number; coordinateY: number}, radius: number}
}
