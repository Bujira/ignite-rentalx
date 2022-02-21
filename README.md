# rentalx
### RentalX: Car Rental App
A REST API using NodeJS, TypeScript, Express, TypeORM and Postgres.
Other technologies employed are: jsonwebtoken, swagger, tsyringe, uuid, jest and others!

RF => Functional Requisites
RNF => Non Functional Requisites
RN => Business Rules
# Registering a Car
**RF**
[x] It should be possible to register a new car in the database.

**RN**
[x] Should not be possible to register more than one car with the same license plate.
[x] Every car should be registered as available for rental by default.
[x] Only admin users can register a car.

# Listing Registered Cars
**RF**
[] It should be possible to list all available cars.
[] It should be possible to list all available cars by name.
[] It should be possible to list all available cars by category.
[] It should be possible to list all available cars by brand.

**RN**
An user does not need to be logged in to list all available cars.

# Registering Car Specifications
**RF**
[x] It should be possible to register a new specification for a car.

**RN**
[x] Should not be able to register a specification for a non existing car.
[x] Should not be able to register an existing specification for the same car.
[x] Only admin users can register a specification for a car.

# Registering Car Images
**RF**
[x] It should be possible to register a new image for a car.

**RNF**
[x] Use multer for uploading files.

**RN**
Should not be able to register an image for a non existing car.
It should be possible to register multiple images for the same car.
[x] Only admin users can register an image for a car.

# Renting a Car

**RF**
[x] It should be possible to register a new car rental.

**RN**
[x] The minimun duration of a rental must be 24 hours.
[x] Should not be able to register a new car rental for an user already renting a car.
[x] Should not be able to register a new car rental for a non available car.
[] Once a rental is created, the car status should change to unavailable.

# Returning a Car

**RF**
[ ] It should be possible to return a car.

**RN**
[] If a car is returned within 24 hrs, a full 24hrs fee must be charged.
[] Once returned, the car must be set as available for rent.
[] Once returner, the user must be listed with no current rental.
[] Once returned, the total amount due must be calculated.
[] If the car is returned after the expected date, fees must be calculated according to the number of late days.
[] If the car is returned after the expected date, the calculated fee must be added to the total.