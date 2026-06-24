const RideStatus = {
    REQUESTED: "Requested",
    ACCEPTED: "Accepted",
    STARTED: "Started",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled"
};



class Location {
    constructor(name) {
        this.name = name;
    }
}


class User {
    constructor(name) {
        this.name = name;
        this.rideHistory = [];
    }

    addRide(ride) {
        this.rideHistory.push(ride);
    }
}


class Vehicle {
    constructor(number, ratePerKm) {
        if (this.constructor === Vehicle) {
            throw new Error("Cannot instantiate abstract class");
        }

        this.number = number;
        this.ratePerKm = ratePerKm;
    }
}


class Bike extends Vehicle {
    constructor(number) {
        super(number, 8);
    }
}


class Auto extends Vehicle {
    constructor(number) {
        super(number, 12);
    }
}

class Cab extends Vehicle {
    constructor(number) {
        super(number, 18);
    }
}

class Driver {
    constructor(name, vehicle, distanceFromUser) {
        this.name = name;
        this.vehicle = vehicle;
        this.distanceFromUser = distanceFromUser;
        this.rating = 4.5;
        this.isOnline = true;
    }
}


class PaymentStrategy {
    pay(amount) {}
}

class CashPayment extends PaymentStrategy {
    pay(amount) {
        return `₹${amount} paid using Cash`;
    }
}

class UPIPayment extends PaymentStrategy {
    pay(amount) {
        return `₹${amount} paid using UPI`;
    }
}

class CardPayment extends PaymentStrategy {
    pay(amount) {
        return `₹${amount} paid using Card`;
    }
}


class Payment {
    constructor(strategy) {
        this.strategy = strategy;
    }

    process(amount) {
        return this.strategy.pay(amount);
    }
}


class FareCalculator {

    static BASE_FARE = 50;

    static calculate(distance, rate) {

        let surgeMultiplier = 1;

        if (distance > 10) {
            surgeMultiplier = 1.5;
        }

        return (
            FareCalculator.BASE_FARE +
            distance * rate * surgeMultiplier
        );
    }
}


class Ride {

    constructor(
        user,
        driver,
        pickup,
        drop,
        distance,
        fare
    ) {

        this.user = user;
        this.driver = driver;
        this.pickup = pickup;
        this.drop = drop;
        this.distance = distance;
        this.fare = fare;
        this.status = RideStatus.REQUESTED;
    }

    updateStatus(status) {
        this.status = status;
    }
}


class RideService {

    constructor(drivers) {
        this.drivers = drivers;
    }

    findNearestDriver(vehicleType) {

        const availableDrivers =
            this.drivers.filter(
                driver =>
                    driver.isOnline &&
                    driver.vehicle.constructor.name === vehicleType
            );

        availableDrivers.sort(
            (a, b) =>
                a.distanceFromUser - b.distanceFromUser
        );

        return availableDrivers[0];
    }

    requestRide(
        user,
        pickup,
        drop,
        distance,
        vehicleType
    ) {

        const driver =
            this.findNearestDriver(vehicleType);

        if (!driver) {
            throw new Error(
                "No Drivers Available"
            );
        }

        const fare =
            FareCalculator.calculate(
                distance,
                driver.vehicle.ratePerKm
            );

        const ride =
            new Ride(
                user,
                driver,
                pickup,
                drop,
                distance,
                fare
            );

        ride.updateStatus(
            RideStatus.ACCEPTED
        );

        user.addRide(ride);

        return ride;
    }
}



const drivers = [

    new Driver(
        "Selvam",
        new Cab("TN01AB1234"),
        2
    ),

    new Driver(
        "Balaji",
        new Bike("TN02XY5678"),
        1
    ),

    new Driver(
        "Akilan",
        new Auto("TN03KL7890"),
        3
    )
];


const rideService =
    new RideService(drivers);


function bookRide() {

    try {

        const name =
            document.getElementById("userName").value;

        const pickup =
            document.getElementById("pickup").value;

        const drop =
            document.getElementById("drop").value;

        const distance =
            parseFloat(
                document.getElementById("distance").value
            );

        const vehicleType =
            document.getElementById("vehicleType").value;

        const paymentType =
            document.getElementById("paymentMethod").value;

        const user =
            new User(name);

        const ride =
            rideService.requestRide(
                user,
                new Location(pickup),
                new Location(drop),
                distance,
                vehicleType
            );

        let strategy;

        switch(paymentType) {

            case "UPI":
                strategy = new UPIPayment();
                break;

            case "Card":
                strategy = new CardPayment();
                break;

            default:
                strategy = new CashPayment();
        }

        const payment =
            new Payment(strategy);

        const paymentResult =
            payment.process(ride.fare);

        ride.updateStatus(
            RideStatus.STARTED
        );

        ride.updateStatus(
            RideStatus.COMPLETED
        );

        document.getElementById("result").innerHTML =

        `
        <h2 style="font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; text-decoration:underline">RIDE DETAILS</h2>
        <br></br>

        <p><strong>STATUS   :</strong> ${ride.status}</p>

        <p><strong>DRIVER   :</strong> ${ride.driver.name}</p>

        <p><strong>VEHICLE  :</strong> ${vehicleType}</p>

        <p><strong>KM       :</strong> ${ride.distance} KM</p>

        <p><strong>FARE     :</strong> ₹${ride.fare}</p>

        <p><strong>RATING   :</strong> ⭐${ride.driver.rating}</p>
-
        <p><strong>PAYMENT  :</strong> ${paymentResult}</p>
        `;

        addHistory(ride);

    } catch(error) {

        document.getElementById("result").innerHTML =
            `<h3>${error.message}</h3>`;
    }
}



function addHistory(ride) {

    const li =
        document.createElement("li");

    li.innerHTML =
        `
        <strong>${ride.user.name}</strong>
        | Driver: ${ride.driver.name}
        | ${ride.distance} KM
        | ₹${ride.fare}
        | ${ride.status}
        `;

    document
        .getElementById("historyList")
        .appendChild(li);
}