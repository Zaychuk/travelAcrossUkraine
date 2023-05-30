import { Category } from './Category'

export type Location = {
  id: string
  name: string
  description: string
  wikipediaUrl: string
  petitionUrl: string
  category: Category
  imageUrls: string[]
}
