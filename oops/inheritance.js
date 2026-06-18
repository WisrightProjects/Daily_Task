class person{
    constructor(name){
        this.name = name;
    }
    introduce(){
        console.log(`Hii, I am ${this.name}`);
    }
}

class developer extends person {
    constructor(name,language) {
        super(name);
        this.language = language;
    }

    code() {
        console.log(`${this.name} codes in ${this.language}`);
    }
}

const dev1 = new developer("surya", "Java Script");

dev1.introduce();
dev1.code();