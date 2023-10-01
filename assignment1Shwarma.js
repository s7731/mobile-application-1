const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING: Symbol("welcoming"),
    DishInfo: Symbol('DishInfo'),
    lassize: Symbol('lasSize'),
    pastasize: Symbol('pastaSize'),
    lasTop: Symbol("LasagnaToppings"),
    pasTop: Symbol('pastaToppings'),
    fries: Symbol("Fries"),
    wrongSize: Symbol('wrong')
});

let allorders = [];

module.exports = class ShwarmaOrder extends Order {
    constructor() {
        super();
        this.stateCur = OrderState.WELCOMING;
        this.lassize = "";
        this.pastasize = "";
        this.lasTop = "";
        this.pasTop = "shawarama";
        this.fries = "";
        this.cart = "";
        this.orderItems = [],
        this.drinks = ""
    }



    handleInput(sInput) {
        let aReturn = [];
        switch (this.stateCur) {
            case OrderState.WELCOMING:
                this.stateCur = OrderState.DishInfo;
                aReturn.push("Welcome to Mi Casa Cafe. (Write orders if you are shop owner)");
                aReturn.push("What you would like to have Lasagna(L) (11$)  or Pasta(P) (5$) ?");
                break;
            case OrderState.DishInfo:
                console.log(sInput)
                console.log(allorders)
                if(sInput.toLowerCase() == 'orders'){
                    if (allorders.length == 0) {
                        aReturn.push("no items");

                    } else{
                        allorders.forEach((item, idx) => {

                            aReturn.push(`Order Number: ${idx + 1}`);

                            aReturn.push(`Item: ${item.item}`);

                            aReturn.push(`Toppings: ${item.toppings}`);

                            aReturn.push(`Price: ${item.price}`);

                            aReturn.push(`Size: ${item.size}`);

                            aReturn.push(`Fries: ${item.fries}`);
                        })
                    }
                    this.stateCur = OrderState.WELCOMING
                }
                else  if (sInput.toLowerCase() == 'p') {
                    this.stateCur = OrderState.pastasize;
                    this.orderItems.push('pasta');
                    aReturn.push('Please Tell us the size of Pasta');
                } else if (sInput.toLowerCase() == 'l') {
                    this.stateCur = OrderState.lassize;
                    this.orderItems.push('lasagna');
                    aReturn.push('Please tell us the size of the Lasagna');
                } else {
                    aReturn.push('Enter a valid value')
                }

                break;

            case OrderState.lassize:
                this.orderItems.push(sInput);
                aReturn.push('Please Enter the toppings for lasagna');
                this.stateCur = OrderState.fries;

                break;
            case OrderState.pastasize:
                this.orderItems.push(sInput);
                aReturn.push('Please Enter the toppings for pasta');
                this.stateCur = OrderState.fries;
                break;
            case OrderState.fries:
                this.orderItems.push(sInput);
                aReturn.push('Would you like to have fries on the side 3 $');
                this.stateCur = OrderState.thanku;
                break;
            case OrderState.thanku:
                this.isDone(true);
                if (sInput.toLowerCase() != "no") {
                    this.drinks = 'yes';
                }
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.orderItems[0]} ${this.orderItems[1]} with ${this.orderItems[2]}`);
                allorders.push({item: this.orderItems[0], price: this.calccost(), size: this.orderItems[1],toppings: this.orderItems[2] ,fries: this.drinks})
                if (this.drinks) {
                    aReturn.push(`with fries on side, total price: - $${this.calccost()}`);
                }
                let d = new Date();
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                this.stateCur = OrderState.WELCOMING;
                break;
        }
        return aReturn;
    }

    calccost() {
        let cost, curcost = 0;

        switch (this.orderItems[0]) {
            case "pasta":
                curcost =  5
                break;
            case "lasagna":
            
                curcost = 11
                break;
            default:
                break;
        }
        if (this.drinks == 'yes') {
            curcost += 3;
        }
        cost = curcost;
        return cost;
    }

}