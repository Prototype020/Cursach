let selectedElem = null;

const addPointMovements = function(point) {
    let startX, startY;
    let isDragging = false;

    const parent = point.parent;

    function movePointer(event) {
        if (!isDragging) return;

        // 1. Получаем текущие координаты курсора
        const currentX = event.clientX;
        const currentY = event.clientY;

        // 2. Вычисляем смещение относительно начальной точки
        const dx = currentX - startX;
        const dy = currentY - startY;

        // 3. Перемещаем точку 
        point.moveOn(dx, dy);

        // 4. Обновляем начальные координаты для следующего шага
        startX = currentX;
        startY = currentY;

        // 5. Обновляем родительский элемент
        if(parent._hideMidPointer) {
        parent._hideMidPointer();
        parent._showMidPointer();
        parent.update();
        }
    }

    point.addEventListener('mousedown', function(ev) {
        ev.stopPropagation();
        isDragging = true;

        // Запоминаем начальные координаты курсора
        startX = ev.clientX;
        startY = ev.clientY;

        // Начинаем слушать движение мыши
        document.addEventListener('mousemove', movePointer);
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
        document.removeEventListener('mousemove', movePointer);
    });
};

/* settings обьект, должен хранить свойства:
 1) border = true создает границу
 2) rotatePointer = true Создает поинтер вращения

*/



const addGroupMovements = function(group, settings) {
    settings == undefined? settings = '' : settings
    let bbox;
    let startX, startY;
    let isDragging = false;

    const border = document.createElementNS(ns, 'rect');
    border.setAttributeNS(null, 'fill', '#ffe0b200');
    border.setAttributeNS(null, 'stroke', 'white');
    border.setAttributeNS(null, 'stroke-width', '1');
    border.setAttributeNS(null, 'stroke-dasharray', '5, 5');
    border.style.pointerEvents = 'all';
    border.style.cursor = 'move';

    const zoomValue = document.querySelector('.zoom-value');


   
    //Показывание границы
    function showBorder() {
        if(!settings.border) return
        bbox = group.getBBox();
        border.setAttributeNS(null, 'x', bbox.x - 5);
        border.setAttributeNS(null, 'y', bbox.y - 5);
        border.setAttributeNS(null, 'width', bbox.width + 10);
        border.setAttributeNS(null, 'height', bbox.height + 10);
        group.border = border
        if (!border.parentNode) {
            selectedElem = group
            svgMain.insertAdjacentElement('afterbegin', border)
        }
    }

    //Сворачивание границы
    function hideBorder() {
        if(!settings.border) return
        if (border.parentNode) {
            group.border = false
            border.remove();
        }
    }

    function moveGroup(event) {
        if (!isDragging) return;
        

        //На сколько перетащен элемент
        let deltaX = event.x - startX;
        let deltaY = event.y - startY;

        for (const child of group.elems) {
            const cords = child.cords;
           
            //Удаление поинтера перед перетаскиванием
            if(child.elem.hiddenPointers == false) {
                child.elem.removePointers()

                
            }
            
            let zoom = zoomValue.textContent.replace('%', '')
            zoom /= 100
            
            console.log(zoom)

            group.moveOn(deltaX/2/zoom, deltaY/2/zoom)
        }

        startX = event.x;
        startY = event.y;
        
        showBorder();
    }
    

    //Функция вызывающаяся на щелчек вниз
    function handleMouseDown(ev) {
        console.log(ev.target)
        if(ev.target in group.children) return
        ev.stopPropagation();
        selectedElem = group
        showBorder();
        group.removeRotatePointer()
        startX = ev.x;
        startY = ev.y;
        isDragging = true;
        

        document.addEventListener('mousemove', moveGroup);
        document.addEventListener('mouseup', handleMouseUp);
    }

    //Функция вызывающаяся на щелчек вверх
    function handleMouseUp() {
        isDragging = false;
        group.createRotatePointer()

        //Создание поинтеров
        for (const child of group.elems) {
            
            if(child.elem.hiddenPointers == true) {child.elem.createPointers()
            }
        }

        document.removeEventListener('mousemove', moveGroup);
        document.removeEventListener('mouseup', handleMouseUp);
    }

    
    group.addEventListener('mousedown', handleMouseDown);
    border.addEventListener('mousedown', handleMouseDown);

    document.addEventListener('mousedown', function(ev) {
        
        if(ev.target == svgMain && ev.target) {
            for (const child of group.elems) {
               

                //Удаление поинтера перед перетаскиванием
                if(child.elem.hiddenPointers == false) {
                    child.elem.removePointers()
                }
                selectedElem = null
                hideBorder();
                group.removeRotatePointer()
            }

        }
        
        
    });

    
};




