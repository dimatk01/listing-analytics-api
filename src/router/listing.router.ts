import Router from 'koa-router'
import { ListingService } from '../services/listing.service'
import { validate } from '../middleware/validation.middleware'
import { listingSchema } from '../schema/listing.schema'
import { ListingRepository } from '../repository/listing.repository'

export const ListingRouter = () => {
  const router = new Router()
  const listingRepository = new ListingRepository()
  const listingService = new ListingService(listingRepository)

  router.post('/', validate(listingSchema), listingService.addListing)
  router.get('/all', listingService.getAll)
  router.get('/:id', listingService.getById)

  return router
}
