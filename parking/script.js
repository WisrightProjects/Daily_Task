class Vehicle {
    constructor(number, type) {
        this.number = number;
        this.type = type;
    }

    getRatePerHour() {
        return 0;
    }
}

class Car extends Vehicle {
    constructor(number) {
        super(number, "Car");
    }

    getRatePerHour() {
        return 30;
    }
}

class Bike extends Vehicle {
    constructor(number) {
        super(number, "Bike");
    }

    getRatePerHour() {
        return 15;
    }
}

class Truck extends Vehicle {
    constructor(number) {
        super(number, "Truck");
    }

    getRatePerHour() {
        return 50;
    }
}

class ParkingSpot {
    constructor(id, type) {
        this.id = id;
        this.type = type;
        this.isOccupied = false;
        this.vehicle = null;
    }

    park(vehicle) {
        this.vehicle = vehicle;
        this.isOccupied = true;
    }

    vacate() {
        this.vehicle = null;
        this.isOccupied = false;
    }
}

class ParkingFloor {
    constructor(floorNo) {
        this.floorNo = floorNo;
        this.spots = [];
    }

    addSpot(spot) {
        this.spots.push(spot);
    }

    getAvailableSpot(vehicleType) {
        return this.spots.find(
            spot =>
                !spot.isOccupied &&
                spot.type === vehicleType
        );
    }
}

class Ticket {

    static counter = 1;

    constructor(vehicle, floorNo, spotId) {

        this.ticketId =
            "TKT" +
            String(Ticket.counter++)
            .padStart(3, "0");

        this.vehicle = vehicle;
        this.floorNo = floorNo;
        this.spotId = spotId;
        this.entryTime = new Date();
    }

    calculateFee(exitTime) {

        const hours = Math.ceil(
            (exitTime - this.entryTime)
            / (1000 * 60 * 60)
        );

        return hours *
            this.vehicle.getRatePerHour();
    }
}

class ParkingLot {

    constructor() {
        this.floors = [];
        this.activeTickets = new Map();
    }

    addFloor(floor) {
        this.floors.push(floor);
    }

    parkVehicle(vehicle) {

        for (let floor of this.floors) {

            const spot =
                floor.getAvailableSpot(
                    vehicle.type
                );

            if (spot) {

                spot.park(vehicle);

                const ticket =
                    new Ticket(
                        vehicle,
                        floor.floorNo,
                        spot.id
                    );

                this.activeTickets.set(
                    ticket.ticketId,
                    {
                        ticket,
                        spot
                    }
                );

                return `
✅ ${vehicle.type}
${vehicle.number}
Parked at Floor
${floor.floorNo}
Spot ${spot.id}

🎫 Ticket:
${ticket.ticketId}
                `;
            }
        }

        return `❌ No ${vehicle.type} spot available`;
    }

    exitVehicle(ticketId) {

        const data =
            this.activeTickets.get(ticketId);

        if (!data) {
            return "❌ Invalid Ticket";
        }

        const { ticket, spot } = data;

        ticket.entryTime =
            new Date(
                Date.now() -
                (4 * 60 * 60 * 1000)
            );

        const fee =
            ticket.calculateFee(
                new Date()
            );

        spot.vacate();

        this.activeTickets.delete(ticketId);

        return `
🚗 Vehicle Exited

Ticket: ${ticketId}

💰 Parking Fee:
₹${fee}
        `;
    }

    showAvailableSpots() {

        let result = "";

        this.floors.forEach(floor => {

            result += `
Floor ${floor.floorNo}
-------------------
`;

            floor.spots.forEach(spot => {

                if (!spot.isOccupied) {

                    result += `
Spot ${spot.id}
(${spot.type})
<br>
`;
                }
            });

            result += "<hr>";
        });

        return result;
    }
}

const parkingLot =
    new ParkingLot();

const floor1 =
    new ParkingFloor(1);

floor1.addSpot(
    new ParkingSpot(1, "Bike")
);

floor1.addSpot(
    new ParkingSpot(2, "Bike")
);

floor1.addSpot(
    new ParkingSpot(3, "Car")
);

floor1.addSpot(
    new ParkingSpot(4, "Truck")
);

const floor2 =
    new ParkingFloor(2);

floor2.addSpot(
    new ParkingSpot(11, "Bike")
);

floor2.addSpot(
    new ParkingSpot(12, "Car")
);

floor2.addSpot(
    new ParkingSpot(13, "Car")
);

floor2.addSpot(
    new ParkingSpot(15, "Truck")
);

parkingLot.addFloor(floor1);
parkingLot.addFloor(floor2);

function parkVehicle() {

    const number =
        document.getElementById(
            "vehicleNumber"
        ).value;

    const type =
        document.getElementById(
            "vehicleType"
        ).value;

    let vehicle;

    if (type === "Car") {
        vehicle = new Car(number);
    }

    else if (type === "Bike") {
        vehicle = new Bike(number);
    }

    else {
        vehicle = new Truck(number);
    }

    document.getElementById(
        "output"
    ).innerHTML =
        parkingLot.parkVehicle(vehicle);
}

function exitVehicle() {

    const ticketId =
        document.getElementById(
            "ticketId"
        ).value;

    document.getElementById(
        "output"
    ).innerHTML =
        parkingLot.exitVehicle(ticketId);
}

function showSpots() {

    document.getElementById(
        "spots"
    ).innerHTML =
        parkingLot.showAvailableSpots();
}