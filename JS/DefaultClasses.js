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
        this.container.moveOn = this.moveOn
        this.container.setScale = this.setScale
        this.container.setRotate = this.setRotate
        this.container.update = this.update
        this.container.createRotatePointer = this._createRotatePointer
        this.container.removeRotatePointer = this._removeRotatePointer
        
        // Добавляем новые методы для управления стилями
        this.container.setStroke = this.setStroke
        this.container.setFill = this.setFill
        this.container.setStrokeWidth = this.setStrokeWidth
        this.container.setStrokeDasharray = this.setStrokeDasharray
        this.container.setOpacity = this.setOpacity
        this.container.setStyle = this.setStyle
        
        return this.container
    }


     // Устанавливает цвет обводки для всех дочерних элементов

    setStroke(color) {
        this.elems.forEach(child => {
            if (child.elem.setStroke) {
                child.elem.setStroke(color);
            } else if (child.elem.setAttribute) {
                child.elem.setAttribute('stroke', color);
            }
        });
        return this;
    }

    
     // Устанавливает цвет заливки для всех дочерних элементов
     
    setFill(color) {
        this.elems.forEach(child => {
            if (child.elem.setFill) {
                child.elem.setFill(color);
            } else if (child.elem.setAttribute) {
                child.elem.setAttribute('fill', color);
            }
        });
        return this;
    }

    
     // Устанавливает толщину обводки для всех дочерних элементов
   
    setStrokeWidth(width) {
        // Если передано число, добавляем 'px'
        if (typeof width === 'number') {
            width = `${width}px`;
        }
        
        this.elems.forEach(child => {
            if (child.elem.setStrokeWidth) {
                child.elem.setStrokeWidth(width);
            } else if (child.elem.setAttribute) {
                child.elem.setAttribute('stroke-width', width);
            }
        });
        return this;
    }

    
     //Устанавливает пунктирность обводки для всех дочерних элементов
    
    setStrokeDasharray(pattern) {
        this.elems.forEach(child => {
            if (child.elem.setStrokeDasharray) {
                child.elem.setStrokeDasharray(pattern);
            } else if (child.elem.setAttribute) {
                child.elem.setAttribute('stroke-dasharray', pattern);
            }
        });
        return this;
    }

   
    setOpacity(opacity) {
        this.elems.forEach(child => {
            if (child.elem.setOpacity) {
                child.elem.setOpacity(opacity);
            } else if (child.elem.setAttribute) {
                child.elem.setAttribute('opacity', opacity);
            }
        });
        return this;
    }

    setStyle(styles) {
        Object.entries(styles).forEach(([property, value]) => {
            this.elems.forEach(child => {
                if (child.elem.setAttribute) {
                    child.elem.setAttribute(property, value);
                }
            });
        });
        return this;
    }


    //Создание контейнера <g> 
    createContainer() {
        let container = document.createElementNS(ns,'g')
        
        container.scale = 1
        container.translate = '0, 0'
        container.rotate = '0'
        
        
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

    setRotate(rot) {
        this.rotate = rot
        this.update()
        return this
    }




    _createRotatePointer() {
        // Создаем круг-индикатор для вращения
        this.rotatePointer = document.createElementNS(ns, 'circle');
        this.rotatePointer.setAttribute('r', '3');
        this.rotatePointer.setAttribute('stroke', 'white');
        this.rotatePointer.setAttribute('stroke-width', '1');

        this.rotatePointer.style.cursor = 'grab';
        // Размещаем его справа от группы (на расстоянии 30px)
        this.rotatePointer.setAttribute('cx', (this.getBBox().width + group.x) * group.scale +10);
        this.rotatePointer.setAttribute('cy', group.y);
        
        // Добавляем в группу
        svgMain.appendChild(this.rotatePointer);
        
        // Флаги и переменные для обработки вращения
        let isRotating = false;
        let startAngle = 0;
        let initialRotation = parseFloat(this.rotate) || 0;
        
        // Получаем SVG элемент и его положение на странице
        const svgRect = this.getBoundingClientRect();
        
        // Обработчики событий
        const handleMouseDown = (e) => {
            e.stopPropagation();
            isRotating = true;
            this.rotatePointer.style.cursor = 'grabbing';
            this.rotatePointer.style.visibility = 'hidden'
            
            // Получаем начальный угол между курсором и центром группы
            const bbox = this.getBBox();
            const centerX = svgRect.left + bbox.x + bbox.width/2;
            const centerY = svgRect.top + bbox.y + bbox.height/2;
            
            startAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180 / Math.PI;
            initialRotation = parseFloat(this.rotate) || 0;
        };
        
        const handleMouseMove = (e) => {
            if (!isRotating) return;
            
            const bbox = this.getBBox();
            const centerX = svgRect.left + bbox.x + bbox.width/2;
            const centerY = svgRect.top + bbox.y + bbox.height/2;
            
            // Вычисляем текущий угол
            const currentAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180 / Math.PI;
            const angleDiff = currentAngle - startAngle;
            
            // Обновляем вращение группы
            this.setRotate(initialRotation + angleDiff);
        };
        
        const handleMouseUp = () => {
            isRotating = false;
            this.rotatePointer.style.cursor = 'grab';
            this.rotatePointer.style.visibility = 'visible'
        };
        
        // Назначаем обработчики
        this.rotatePointer.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        
        // Метод для очистки (удаления обработчиков)
        this.cleanupRotatePointer = () => {
            this.rotatePointer.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            if (this.rotatePointer.parentNode === this) {
                this.removeChild(this.rotatePointer);
            }
        };
        
        return this.rotatePointer;
    }

    _removeRotatePointer(){
        if(this.rotatePointer) {
        this.rotatePointer.remove()
        }
    }
    
    



    

    //Метод добавления дочерних элементов
    insert(elem) {
        this.insertAdjacentElement('beforeend', elem.elem)
        elem.elem.container = this
        
        this.elems.push(elem)
    }


    moveOn(x,y) {
        this.x += x;
        this.y += y;
        this.update()
        return this
    }

   
    
    moveTo(x, y) {
        this.x = x;
        this.y = y;
        this.update()
        return this
    }
    

    update() {
        // Получаем bounding box элемента без текущих трансформаций
        const bbox = this.getBBox();
        
        // Вычисляем центр элемента в локальных координатах
        const centerX = bbox.x + bbox.width / 2;
        const centerY = bbox.y + bbox.height / 2;
        
        // Собираем полную строку трансформации в правильном порядке:
        // 1. Переносим центр в начало координат
        // 2. Применяем вращение
        // 3. Возвращаем на исходную позицию
        // 4. Применяем масштабирование
        // 5. Применяем перемещение
        const transform = 
            `translate(${this.x + this.modifyX}, ${this.y + this.modifyY}) 
             scale(${this.scale}) 
             translate(${centerX}, ${centerY}) 
             rotate(${this.rotate}) 
             translate(${-centerX}, ${-centerY})`;
        
        // Применяем трансформацию к основному элементу
        this.setAttributeNS(null, 'transform', transform);
        
        // Обновляем границу, если она есть
        if (this.border) {
            // Для границы используем ту же трансформацию
            this.border.setAttributeNS(null, 'transform', transform);
        }
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
        const elem = this.elem;
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

        const group = this.container
        
        const scale = group.scale
        const modX = group.x + group.modifyX
        const modY = group.y + group.modifyY

        

        this.pointers = []
        this.hiddenPointers = false

        if(!Array.isArray(cords[0])) {
            

         this.pointers.push(new Pointer(cords, this))
         return
        }

        for(let i = 0; i < this.cords.length; i++) {
            const cord = this.cords[i]

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
        this.point = this.createPointer(cords,obj)
        this.point.cords = cords
        this.point.changeCords = this.changeCords
        this.point.parent = obj
        this.point.moveOn = this.moveOn
        this.point.oldX = 0
        this.point.oldY = 0
        addPointMovements(this.point) // Добавление поинтеру листнер передвижения см ListnerFunctions

        return this.point
        
        
    }

    //Создание поинтера и вставка его в холст
    createPointer(cords,obj) {
        if(obj.container) {
            const group = obj.container

        } else if(obj) {
            const group = obj
        } else throw new Error('не указан обьект при создании поинтера')

        const pointer = document.createElementNS(ns,'g')
    
        const img = document.createElementNS(ns,'image')
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

        pointer.container = group


        group.insertAdjacentElement('beforeend', pointer)
        
        return pointer

    }

    


    //Метод изменения координат поинтера
    changeCords(x,y) {
        this.cords[0] = x
        this.cords[1] = y
        this.img.setAttributeNS(null,'x', x-9)
        this.img.setAttributeNS(null,'y', y-9)
    }

   
    moveOn(x,y) {
        this.cords[0] += x 
        this.cords[1] += y 
        this.img.setAttributeNS(null,'x', this.cords[0]-10)
        this.img.setAttributeNS(null,'y', this.cords[1]-10)
        
    }

    //Метод удаления поинтера
    remove() {
        this.point.remove()
    }
}







