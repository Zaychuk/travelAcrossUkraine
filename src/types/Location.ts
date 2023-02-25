import { Category } from './Category'
import { Image } from './Image'

export type Location = {
    id: string
    name: string
    description: string
    wikipediaUrl: string
    petitionUrl: string
    category: Category
    images: Image[]
}
