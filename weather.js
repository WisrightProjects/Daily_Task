class weatherapp {
    constructor(city, temp ){
        this.city = city ;
        this.temp = temp;
    }

    displayweather(){
        console.log(
            `${this.city} temperature is ${this.temp}°C`
        );
    } 
}

const climate =  new weatherapp (`chennai`,35);

climate.displayweather();