# rentalx
### RentalX: Car Rental App
A REST API using NodeJS, TypeScript, Express, TypeORM and Postgres.
Other technologies employed are: jsonwebtoken, swagger, tsyringe, uuid, jest and others!

- RF => Functional Requisites
- RNF => Non Functional Requisites
- RN => Business Rules
# Registering a Car
**RF**
- [x] It should be possible to register a new car in the database.

**RN**
- [x] Should not be possible to register more than one car with the same license plate.
- [x] Every car should be registered as available for rental by default.
- [x] Only admin users can register a car.

# Listing Registered Cars
**RF**
- [x] It should be possible to list all available cars.
- [x] It should be possible to list all available cars by name.
- [x] It should be possible to list all available cars by category.
- [x] It should be possible to list all available cars by brand.

**RN**
An user does not need to be logged in to list all available cars.

# Registering Car Specifications
**RF**
- [x] It should be possible to register a new specification for a car.

**RN**
- [x] Should not be able to register a specification for a non existing car.
- [x] Should not be able to register an existing specification for the same car.
- [x] Only admin users can register a specification for a car.

# Registering Car Images
**RF**
- [x] It should be possible to register a new image for a car.

**RNF**
- [x] Use multer for uploading files.

**RN**
Should not be able to register an image for a non existing car.
It should be possible to register multiple images for the same car.
- [x] Only admin users can register an image for a car.

# Renting a Car

**RF**
- [x] It should be possible to register a new car rental.

**RN**
- [x] The minimun duration of a rental must be 24 hours.
- [x] Should not be able to register a new car rental for an user already renting a car.
- [x] Should not be able to register a new car rental for a non available car.
- [x] Once a rental is created, the car status should change to unavailable.

# Returning a Car

**RF**
- [x] It should be possible to return a car.

**RN**
- [x] If a car is returned within 24 hrs, a full 24hrs fee must be charged.
- [x] Once returned, the car must be set as available for rent.
- [x] Once returned, the user must be listed with no current rental.
- [x] Once returned, the total amount due must be calculated.
- [x] If the car is returned after the expected date, a fee must be calculated according to the number of late days.
- [x] If the car is returned after the expected date, the calculated fee must be added to the total.
- [x] User must be logged in to return a car.

# Listing User Rentals

**RF**
- [x] It should be possible lo list an user's rentals.

**RN**
- [x] User must be logged in to lis his rentals.

# Password Revocery

**RF**
- [x] It should be able to recover a misplaced password with an user's email
- [x] It should be able to send an e-mail to the user with a step-by-step guide to revocer the password
- [x] It should be able to let the user create a new password

**RN**
- [x] User must provide a new password
- [x] The recovery link must expire after 3 hours
