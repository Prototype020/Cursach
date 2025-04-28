class Man {

    constructor() {
        this.container = new Container()
        this.bulidMan()
    }



    bulidMan() {

        new Line(this.container,
            [ [20,30], [40,50],[60,30]]
        )

        new Line(this.container,
            [ [40,50], [20,90]]
        )

        new Line(this.container,
            [ [40,50], [60,90]]
        )

    }
}

let man = new Man()
console.log(man)