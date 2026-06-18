class book{
    constructor(title, author) {
        this.title = title ;
        this.author = author;
        this.isIssued = false;
    }

    issuebook() {
        this.isIssued =  true;
    }

    returnbook() {
        this.isIssued = true;
    }
}

const book1 = new book("olaichuvadi", "Thiruvalluvar");
const book2 = new book("titanic","Jack");
const book3 = new book("social science", "Selvam");
const book4 = new book("CHESS","Vishwannand")

book1.issuebook();
book2.issuebook();
book3.issuebook();
book4.issuebook();


console.log(book1);
console.log(book2);
console.log(book3);
console.log(book4);