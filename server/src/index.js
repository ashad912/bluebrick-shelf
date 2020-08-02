import config from '@config'

(async () => {
    const app = await require('@loaders').default()

    app.listen(config.port, () => {
        console.log('Listening on 4000')
    })

})()