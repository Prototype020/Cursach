let svgMain = document.querySelector('#svgMain')
let ns = 'http://www.w3.org/2000/svg'

let defaultSetings = {
    stroke: 'white',
    strokeWidth: '4px',
    fill: 'black'
}


class Line {

    constructor(determ) {
        this.pointers = []
        this.createLine()
        this._setDefaultSettings()
        
       
        
        
    }

    _setDefaultSettings() {
        
        this.createPointer([(field.clientWidth/2 + field.scrollLeft),(field.clientHeight/2 + field.scrollTop)])
        this.createPointer([(field.clientWidth/2 + field.scrollLeft + 50),(field.clientHeight/2 + field.scrollTop)])
         
        


    }

    createPointer(cords) {
        let pointer = new Pointer(cords,this)
        this.pointers.push(pointer)
        console.dir(pointer)
        
        this.update()
        
        

    }
        
        
        
        
        

    update() {
        this.line.setAttributeNS(null,'d',`M${this.getcords()}`)
    }
    

    addIntermediatePoints() {
        
    }

    getcords() {
        return this.pointers.map((item) => item.cords).join(' ').replaceAll(',', ' ')
    }

    createLine() {
        let line = document.createElementNS(ns,'path')
        line.setAttributeNS(null,'stroke',defaultSetings.stroke)
        line.setAttributeNS(null,'stroke-width', defaultSetings.strokeWidth)
        line.setAttributeNS(null,'fill', 'none')
        svgMain.insertAdjacentElement('afterbegin', line)
        this.line = line
        
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
        let pointer = document.createElementNS(ns,'circle')
        pointer.setAttributeNS(null,'cx', cords[0])
        pointer.setAttributeNS(null,'cy', cords[1])
        pointer.setAttributeNS(null,'r', 5)
        pointer.setAttributeNS(null,'fill', 'white')
        pointer.setAttribute(null,'draggable', 'true')
        pointer.cords = this.cords
        
        
        svgMain.insertAdjacentElement('afterbegin',pointer)
        
        return pointer

    }

    changeCords(x,y) {
        this.cords = [x,y]
        this.setAttributeNS(null,'cx', x)
        this.setAttributeNS(null,'cy', y)
    }
}

let line = new Line()
let point = new Pointer([40,40])



