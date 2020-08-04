import config from '@config'
import bookService from '@services/book.service'
import activityService from '@services/activity.service'

(async () => {
    const app = await require('@loaders').default()

    await app.listen(config.port)

    console.log(`Listening on ${config.port}`)

    await activityService.deleteAll()
    await bookService.populateSamples()
    console.log('Sample books populated')

})()