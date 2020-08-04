/**
 * @jest-environment node
 */

import mongoose from 'mongoose'
import Book from '@models/book.model'
import BadRequestError from '@errors/bad-request'
import bookService from '@services/book.service'
import { connect, disconnect, objectId } from '@testUtils/mongoose'

beforeAll(async () => {
    await connect()
})

describe('The Book service', () => {
    describe('populateSamples method', () => {
        it('should populate to db five books with bookNo, name and imageUrl fields', async () => {
            await bookService.populateSamples()

            const books = await Book.find({})

            expect(books.length).toBe(5)

            for (const book of books) {
                expect(book.bookNo).toBeDefined()
                expect(book.name).toBeDefined()
                expect(book.imageUrl).toBeDefined()
            }
        })
    })

    describe('addRate method', () => {

        const userOne = {
            _id: objectId(),
        }

        const userTwo = {
            _id: objectId(),
        }

        const getBook = async (bookNo, rateObject) => {
            
            const { _id } = await bookService.addRate(bookNo, rateObject)

            const book = await Book.findOne({ bookNo })

            return {receivedId: _id, book}
        }

        describe('should create new book rate', () => {

            describe('with rate and review', () => {
                it('from user one', async () => {
                    // const body = {
                    //     //bookNo: 6,
                    //     rate: 8,
                    //     review: 'Very exciting'
                    // }

                    const rateObject = {
                        user: userOne._id,
                        rate: 8,
                        review: 'Very exciting'
                    }
                    const bookNo = 1

                    const {receivedId, book} = await getBook(bookNo, rateObject)

                    expect(book._id).toEqual(receivedId)
                    expect(book.userRating.length).toBe(1)
                    expect(book.userRating[0].user).toEqual(userOne._id)
                    expect(book.userRating[0].rate).toBe(rateObject.rate)
                    expect(book.userRating[0].review).toBe(rateObject.review)
                })

                it('from user two', async () => {

                    const rateObject = {
                        user: userTwo._id,
                        rate: 6,
                        review: 'It was OK'
                    }

                    const bookNo = 1
                    const {receivedId, book} = await getBook(bookNo, rateObject)

                    expect(book._id).toEqual(receivedId)
                    expect(book.userRating.length).toBe(2)
                    expect(book.userRating[1].user).toEqual(userTwo._id)
                    expect(book.userRating[1].rate).toBe(rateObject.rate)
                    expect(book.userRating[1].review).toBe(rateObject.review)
                })

            })

            it('only with rate', async () => {

                const rateObject = {
                    user: userOne._id,
                    rate: 7,
                }

                const bookNo = 2
                const {receivedId, book} = await getBook(bookNo, rateObject)

                expect(book._id).toEqual(receivedId)

                expect(book.userRating.length).toBe(1)
                expect(book.userRating[0].user).toEqual(userOne._id)
                expect(book.userRating[0].rate).toBe(rateObject.rate)
                expect(book.userRating[0].review).toBeNull()
            })
        })

        describe('should modify user book rate', () => {

            const review = 'Amazing position'

            it('with rate and review', async () => {

                const rateObject = {
                    user: userOne._id,
                    rate: 9,
                    review
                }

                const bookNo = 1
                const {receivedId, book} = await getBook(bookNo, rateObject)


                expect(book._id).toEqual(receivedId)
                expect(book.userRating[0].user).toEqual(userOne._id)
                expect(book.userRating[0].rate).toBe(rateObject.rate)
                expect(book.userRating[0].review).toBe(rateObject.review)
            })

            it('with rate but without review', async () => {
                const rateObject = {
                    user: userOne._id,
                    rate: 8,
                }

                const bookNo = 1
                const {receivedId, book} = await getBook(bookNo, rateObject)

                expect(book._id).toEqual(receivedId)
                expect(book.userRating[0].user).toEqual(userOne._id)
                expect(book.userRating[0].rate).toBe(rateObject.rate)
                expect(book.userRating[0].review).toBe(review)
            })
        })

        it('should not find the book', async () => {
            const rateObject = {
                user: userOne._id,
                rate: 8,
            }

            const bookNo = 11
            await expect(bookService.addRate(bookNo, rateObject))
                .rejects
                .toEqual(new BadRequestError('Book does not exist'))
           
        })
    })
})


afterAll(async () => {
    await disconnect()
})
