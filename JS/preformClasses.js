class Line extends Figure{

    constructor(...basicCords) {
        super()

        this._setDefaultSettings(basicCords) // Создание базовой линии

        this.elem.cords = this.cords
            this.elem.createPointers = this._createPointers
            this.elem.removePointers = this._removePointers
            this.elem.showMidPointer = this._showMidPointer
            this.elem.hideMidPointer = this._hideMidPointer
            this.elem.hiddenPointers = true
        this.elem.par = this
        
       
 
    
        
        
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
    

    
    
    _showMidPointer() {

        
        let cords = this.cords


        let midPointers = []
        this.midPointers = midPointers
        for(let i = 0; i < cords.length-1; i++) {
            
            let cords1 = cords[i]
            
            let cords2 = cords[i+1]
            
            let newCords = [(cords2[0] + cords1[0])/2, (cords2[1] + cords1[1])/2]
            let newPointer = new Pointer(newCords, this)
            newPointer.setAttributeNS(null, 'opacity', 0.6)
            

            midPointers.push(newPointer)

            newPointer.addEventListener('mousedown', (ev) => {
                cords.splice(i+1, 0, this.par.setProxyUpdate(newCords))
                this.hideMidPointer()
                this.removePointers()
                this.createPointers()
                this.showMidPointer()


                
            })





        }
    
    }

    
    _hideMidPointer() {
        console.log(this.midPointers)
        for(let i = 0; i < this.midPointers.length; i++) {
            this.midPointers[i].remove()
        }
        this.midPointers = []
    }

        
        
   


    

    
}



class Circle extends Figure {
    constructor(...basicCords) {
        super()

        this._setDefaultSettings(basicCords) // Создание базовой линии

        this.elem.cords = this.cords
        this.elem.par = this
        
        
       
 
    
        
        
    }


    _setDefaultSettings(basicCords) {

        let circle = document.createElementNS(ns,'circle')
        circle.setAttributeNS(null,'stroke',defaultSetings.stroke)
        circle.setAttributeNS(null,'stroke-width', defaultSetings.strokeWidth)
        circle.setAttributeNS(null,'fill', defaultSetings.fill)
        circle.setAttributeNS(null,'r', '10')
        this.rad = '10'
        this.elem = circle
        
        
        if(basicCords.toString() == false) {
            
        this.cords.push(this.setProxyUpdate[(field.clientWidth/2 + field.scrollLeft + 50),(field.clientHeight/2 + field.scrollTop)])
        } else {
                this.cords.push(this.setProxyUpdate(basicCords[0]))
        }
        
        this.update()
        
        
        
    }


    update() {
        let cords = this.cords[0]
        this.elem.setAttributeNS(null,'cx',`${cords[0]}`)
        this.elem.setAttributeNS(null,'cy',`${cords[1]}`)
        this.elem.setAttributeNS(null,'r',`${this.rad}`)
    }

    //Метод добавление обнавления на изменение значений координат элемента
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

let circle = new Circle([50,50])