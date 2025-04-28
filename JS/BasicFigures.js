class Arrow{

    constructor() {
        this.createArrow()
        addGroupMovements(this.container)
        return this.container
    }


    createArrow() {
        this.container = new Container()
        this.container.name = 'Arrow'
        this.container.insert(new Line([0,0],[0,50]))
        this.container.insert(new Line([100,0],[100,50]))
        
    }
}


class Human {
    constructor() {
        let container = new Container()
        let circle = new Circle([30,30])
        let line = new Line([30,40],[30,100],[30,50],[0,50],[60,50],[30,50],[30,100],[50,120],[30,100],[10,120  ])
        
        let line2 = new Line([200,270])
        
        container.insert(circle)
        container.insert(line)
        container.name = 'Human'
        
        
        addGroupMovements(container,{
            border: true,
            rotatePointer: true
        })
        return container
    }
}

class manyHumans {
    constructor() {
        let container = new Container()

        let line1 = new Line([90,40],[30,100],[30,50],[0,50],[60,50],[30,50],[30,100],[50,120],[30,100],[10,120  ])
        let line2 = new Line([160,40],[30,100],[30,50],[0,50],[60,50],[30,50],[30,100],[50,120],[30,100],[10,120  ])
        let line3 = new Line([300,40],[30,100],[30,50],[0,50],[60,50],[30,50],[30,100],[50,120],[30,100],[10,120  ])
        container.insert(line1)
        container.insert(line2)
        container.insert(line3)

        addGroupMovements(container,{
            border: true,
            rotatePointer: true
        })

        return container
    }
}
let group = new manyHumans()
svgMain.append(group)

