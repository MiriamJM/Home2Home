db = db.getSiblingDB('propertySample')
db.createCollection('properties')
propertiesCollection = db.getCollection("properties")
propertiesCollection.remove({})
propertiesCollection.insert(
	{
		propertyId: 345,
		propertyName: "Ryans House",
		description: "Seattle House",
		bedrooms: 3,
		bathrooms: 3,
		sqFeet: 3000,
		address: "123 abc ave",
		averageRating: 5
}
)
propertiesCollection.insert(
	{
		propertyId: 123,
		propertyName: "Jeffs House",
		description: "Seattle House",
		bedrooms: 2,
		bathrooms: 5,
		sqFeet: 2000,
		address: "321 cbd ave",
		averageRating: 3
}
)


db.createCollection('reviews')
reviewsCollection = db.getCollection("reviews")
reviewsCollection.remove({})
reviewsCollection.insert(
	{
		reviewId: 1,
		reveiwerId: 111,
		proeprtyId: 123,
		comment: "very nice",
		ratting: 5,
	}
)
reviewsCollection.insert(
	{
		reviewId: 2,
		reveiwerId: 222,
		proeprtyId: 345,
		comment: "house",
		ratting: 3,
	}
)

db.createCollection('users')
usersCollection = db.getCollection("users")
usersCollection.remove({})
usersCollection.insert(
	{
		userId: 111,
		fName: "Jeff",
		lName: "Smith",
		password: "pa$$word",
		email: "abc@123.com",
		phoneNumber: "5555555",
		locationPreferences: ["seattle", "London"],
		datePreferences: ['2021-5-5'],
		properties: 123,
		bookings: 1,
	}
)
usersCollection.insert(
	{
		userId: 222,
		fName: "Ryan",
		lName: "Smith",
		password: "pa$$word",
		email: "123@abc.com",
		phoneNumber: "5555555",
		locationPreferences: ["Madrid"],
		datePreferences: ['2021-5-5'],
		properties: 345,
		bookings: 1,
	}
)

db.createCollection('bookings')
bookingsCollection = db.getCollection("bookings")
bookingsCollection.remove({})
bookingsCollection.insert(
	{
		bookingId: 1,
		userA: 111,
		userB: 222,
		propertyA: 123,
		propertyB: 345,
		tripDates: "2021-5-5",
		dateRequested: "2021-4-5",
		dateConfirmed: "2021-4-6",
	}
)
bookingsCollection.insert(
	{
		bookingId: 2,
		userA: 333,
		userB: 444,
		propertyA: 567,
		propertyB: 789,
		tripDates: "2022-1-2",
		dateRequested: "2021-5-5",
		dateConfirmed: "2021-5-5",
	}
)