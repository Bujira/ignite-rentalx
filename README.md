# rentalx
### RentalX: Car Rental App
A REST API using NodeJS, TypeScript, Express, TypeORM and Postgres.
Other technologies employed are: jsonwebtoken, swagger, tsyringe, uuid, jest and others!

RF => Functional Requisites
RNF => Non Functional Requisites
RN => Business Rules
# Registering a Car
**RF**
It should be possible to register a new car in the database.

**RN**
Should not be possible to register more than one car with the same license plate.
Should not be able to change a car's license plate, once the car is registered.
Every car should be registered as available for rental.
Only admin users can register a car.

# Listing Registered Cars
**RF**
It should be possible to list all available cars.
It should be possible to list all available cars by name.
It should be possible to list all available cars by category.
It should be possible to list all available cars by brand.

**RN**
An user does not need to be logged in to list all available cars.

# Registering Car Specification
**RF**
It should be possible to register a new specification for a car.
It should be possible to list all the specifications for a car.
It should be possible to list all cars with a chosen specification.

**RN**
Should not be able to register a specification for a non existing car.
Should not be able to register an existing specification for the same car.
Only admin users can register a specification for a car.

# Registering Car Images
**RF**
It should be possible to register a new image for a car.
It should be possible to list all images for a given car.

**RNF**
Use multer for uploading files.

**RN**
Should not be able to register an image for a non existing car.
It should be possible to register multiple images for the same car.
Only admin users can register an image for a car.

# Renting a Car

**RF**
It should be possible to register a new car rental.

**RN**
The minimun duration of a rental must be 24 hours.
Should not be able to register a new car rental for an user already renting a car.
Should not be able to register a new car rental for a non available car.