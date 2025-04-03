let svgMain = document.querySelector('#svgMain')
let ns = 'http://www.w3.org/2000/svg'


// Дефолтные параметры элементов
let defaultSetings = {
    stroke: 'wheat',
    strokeWidth: '3px',
    fill: 'none'
}




 // Класс контейнера <g>
class Container {
    constructor() {
        this.createContainer()
        this.container.elems = []
        this.container.insert = this.insert
        this.container.moveTo = this.moveTo
        this.container.update = this.update
        this.container.setScale = this.setScale
        this.container.setTranslate = this.setTranslate
        return this.container
    }

    //Создание контейнера <g> 
    createContainer() {
        let container = document.createElementNS(ns,'g')
        
        container.scale = 1
        container.translate = '0, 0'
        
        
        
        // Свойства для хранения смещения
        container.modifyX = 0;
        container.modifyY = 0;
        
        // Текущие координаты группы
        container.x = 0;
        container.y = 0;

        this.container = container
    }

    setScale(scal) {
        this.scale = scal
        this.update()
        return this
    }

    setTranslate(translate) {
        this.translate = translate
        console.log(this.translate)
        this.update()
        return this
    }

    //Метод добавления дочерних элементов
    insert(elem) {
        this.insertAdjacentElement('beforeend', elem.elem)
        
        this.elems.push(elem)
    }

   
    
    moveTo(x, y) {
        this.x = x;
        this.y = y;
        this.setAttribute('transform', `translate(${x + this.modifyX}, ${y + this.modifyY})`);
    }
    

    update() {
        this.setAttributeNS(null,'transform', `scale(${this.scale}) translate(${this.translate})`)
    }
    
}


class Figure {
    constructor() {
        this.elem = []
        this.cords = []


    }

    //Базовый метод обновления элемента
    update() {
        this.elem.setAttributeNS(null,'d',`M${this.getcords()}`)
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

    //Создание стандартных поинтеров
    _createPointers(cords) {
        
        if(cords == undefined) cords = this.cords
        

        this.pointers = []
        this.hiddenPointers = false

        if(!Array.isArray(cords[0])) {
         this.pointers.push(new Pointer(cords, this))
         return
        }
        for(let i = 0; i < this.cords.length; i++) {
            let cord = this.cords[i]
            this.pointers.push(new Pointer(cord, this))
        }
       
        
        
        return this.pointers
        
    }

    //Удаление стандартных поинтеров
    _removePointers() {
        this.hiddenPointers = true
        for(let i = 0; i < this.pointers.length; i++) {
            this.pointers[i].remove()
        }
    }

    


    getcords() {
        
        return this.cords.join(' ').replaceAll(',', ' ')
    }


   
}












// Класс поинтеров
class Pointer{
    // конструктор принимает координаты поинтера и обьект привязки
    constructor(cords, obj) {
        this.point = this.createPointer(cords)
        this.point.cords = cords
        this.point.changeCords = this.changeCords
        this.point.parent = obj
        addPointMovements(this.point) // Добавление поинтеру листнер передвижения см ListnerFunctions

        return this.point
        
        
    }

    //Создание поинтера и вставка его в холст
    createPointer(cords) {

        let pointer = document.createElementNS(ns,'g')
    
        let img = document.createElementNS(ns,'image')
        img.setAttributeNS(null, 'href', "data:image/svg+xml;base64,PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjE4cHgiIHZlcnNpb249IjEuMSIgc3R5bGU9ImNvbG9yLXNjaGVtZTogbGlnaHQgZGFyazsiPjxjaXJjbGUgY3g9IjkiIGN5PSI5IiByPSI1IiBzdHJva2U9IiNmZmYiIGZpbGw9IiMyOWI2ZjIiLz48L3N2Zz4=")
        img.setAttributeNS(null,'width', 18)
        img.setAttributeNS(null,'height', 18)
        img.setAttributeNS(null,'x', cords[0]-10)
        img.setAttributeNS(null,'y', cords[1]-10)
        img.addEventListener('dragstart', (e) => {
            e.preventDefault();
          });
        
        pointer.img = img
        pointer.insertAdjacentElement('afterbegin', img)
        svgMain.insertAdjacentElement('beforeend', pointer)
        
        return pointer

    }

    


    //Метод изменения координат поинтера
    changeCords(x,y) {
        this.cords[0] = x
        this.cords[1] = y
        this.img.setAttributeNS(null,'x', x-9)
        this.img.setAttributeNS(null,'y', y-9)
    }

    //Метод удаления поинтера
    remove() {
        this.point.remove()
    }
}







