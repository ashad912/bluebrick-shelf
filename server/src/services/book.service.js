import Book from '@models/book.model'
import BadRequestError from '@errors/bad-request'

const populateSamples = async () => {
    const books = [
        {
            bookNo: 1,
            name: 'The Lord of the Ice Garden',
            imageUrl: '1.png'
        },
        {
            bookNo: 2,
            name: 'Mr Mercedes',
            imageUrl: '2.png'
        },
        {
            bookNo: 3,
            name: 'Blackout',
            imageUrl: '3.png'
        },
        {
            bookNo: 4,
            name: 'The Wroclaw Rats. Chaos',
            imageUrl: '4.png'
        },
        {
            bookNo: 5,
            name: 'Under The Dome',
            imageUrl: '5.png'
        }
    ]

    await Book.deleteMany({})
    await Book.insertMany(books)
}

const addRate = async (bookNo, rateObject) => {
    const book = await Book.findOne({ bookNo })

    if (!book) {
        throw new BadRequestError('Book does not exist')
    }

    // Add or modify user rate
    const userIndex = book.userRating.findIndex((el) => {
        return el.user.toString() === rateObject.user.toString()
    })

    if (userIndex >= 0) {
        // Modify - if not passed, previous possibly non-null review will not be overwritten by null value
        for (const field in rateObject) {
            book.userRating[userIndex][field] = rateObject[field]
        }

    } else {
        // Add
        book.userRating = [...book.userRating, rateObject]
    }

    await book.save()

    return book
}

export default {
    populateSamples,
    addRate
}