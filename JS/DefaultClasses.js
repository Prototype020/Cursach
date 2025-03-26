let svgMain = document.querySelector('#svgMain')
let ns = 'http://www.w3.org/2000/svg'

let defaultSetings = {
    stroke: 'white',
    strokeWidth: '4px',
    fill: 'black'
}





class Container {
    constructor() {
        this.createContainer()
        this.container.elems = []
    }

    createContainer() {
        let container = document.createElementNS(ns,'g')
        svgMain.insertAdjacentElement('beforeend', container)
        
        
        container.modifyX = 0
        container.modifyY = 0

        this.container = container
    }


    insert(elem) {
        this.container.insertAdjacentElement('beforeend', elem.elem)
        
        this.container.elems.push(elem)
    }
    
    
}


class Figure {
    constructor() {
        this.elem = []
        this.cords = []


    }

    update() {
        this.elem.setAttributeNS(null,'d',`M${this.getcords()}`)
    }


    setProxyUpdate(arr) {
        if (!Array.isArray(arr)) {
            throw new Error('Input must be an array');
        }

        const upd = this.update.bind(this);

        return new Proxy(arr, {
            set(target, prop, value, receiver) {
               if (prop === 'length' || (String(prop).match(/^\d+$/) && prop < 1000000)) {
                    const result = Reflect.set(target, prop, value, receiver);
                    upd();
                    return result;
                }
                return Reflect.set(target, prop, value, receiver);
            }
        });
    }
}





class Line extends Figure{

    constructor(...basicCords) {
        super()

        this._setDefaultSettings(basicCords) // Создание базовой линии

        this.elem.cords = this.cords
        
        
       
 
    
        
        
    }

    _setDefaultSettings(basicCords) {

        let line = document.createElementNS(ns,'path')
        line.setAttributeNS(null,'stroke',defaultSetings.stroke)
        line.setAttributeNS(null,'stroke-width', defaultSetings.strokeWidth)
        line.setAttributeNS(null,'fill', 'none')
        this.elem = line
        
        if(basicCords.toString() == false) {
            
        this.cords.push(this.setProxyUpdate[(field.clientWidth/2 + field.scrollLeft),(field.clientHeight/2 + field.scrollTop)])
        this.cords.push(this.setProxyUpdate[(field.clientWidth/2 + field.scrollLeft + 50),(field.clientHeight/2 + field.scrollTop)])
        } else {
            for(let i = 0; i < basicCords.length; i++) {
                
                this.cords.push(this.setProxyUpdate(basicCords[i]))
                
            }
        }
        this.update()
        
        
        
    }
    
    
    //Создание стандартных поинтеров
    createPointer(cords) {
        this.pointers = []
        if(!Array.isArray(cords[0])) {
         this.pointers.push(new Pointer(cords, this))
         return
        }
        for(let i = 0; i < this.cords.length; i++) {
            let cord = this.cords[i]
            this.pointers.push(new Pointer(cord, this))
        }
       
        
        this.update()
        
    }
    
    showIntermediatePointer() {
        for(let i = 0; i < this.cords.length; i++) {
            let pointer1 = this.cords[i]
            let pointer2 = this.cords[i+1]
            

        }
        
    }
        
        
   
        

    


    getcords() {
        return this.cords.join(' ').replaceAll(',', ' ')
    }

    

    
    
}







class Pointer{

    constructor(cords, obj) {
        this.point = this.createPointer(cords)
        this.point.cords = cords
        this.point.changeCords = this.changeCords
        this.point.parent = obj
        addPointMovements(this.point)

        return this.point
        
        
    }

    createPointer(cords) {
        console.log(cords)

        let pointer = document.createElementNS(ns,'g')
    
        let img = document.createElementNS(ns,'image')
        img.setAttributeNS(null, 'href', "data:image/svg+xml;base64,PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjE4cHgiIHZlcnNpb249IjEuMSIgc3R5bGU9ImNvbG9yLXNjaGVtZTogbGlnaHQgZGFyazsiPjxjaXJjbGUgY3g9IjkiIGN5PSI5IiByPSI1IiBzdHJva2U9IiNmZmYiIGZpbGw9IiMyOWI2ZjIiLz48L3N2Zz4=")
        img.setAttributeNS(null,'width', 18)
        img.setAttributeNS(null,'height', 18)
        img.setAttributeNS(null,'x', cords[0]-10)
        img.setAttributeNS(null,'y', cords[1]-10)
        img.setAttribute('draggable', 'false')
        
        pointer.img = img
        pointer.insertAdjacentElement('afterbegin', img)
        svgMain.insertAdjacentElement('beforeend',pointer)
        
        return pointer

    }



    changeCords(x,y) {
        this.cords[0] = x
        this.cords[1] = y
        this.img.setAttributeNS(null,'x', x-9)
        this.img.setAttributeNS(null,'y', y-9)
    }
}






let point = new Pointer([40,40])



class Arrow{

    constructor() {
        this.createArrow()
        addGroupMovments(this.container.container)
    }


    createArrow() {
        this.container = new Container()
        
        this.container.insert(new Line([200,200],[200,250]))
        this.container.insert(new Line([300,200],[300,250]))
        
    }
}


class hz {
    constructor() {
        let container = new Container()
let line = new Line([200,200],[300,300])
container.insert(line)
addGroupMovments(container.container)
return line
    }
}
let line = new hz()

line.createPointer(line.cords)