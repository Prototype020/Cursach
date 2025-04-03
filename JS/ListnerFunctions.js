

const addPointMovements = function(point) {

    //Функция передвигания поинтера
    function Movepointer(event) {
        let X = event.pageX -svgMain.getBoundingClientRect().left 
        let Y = event.pageY - svgMain.getBoundingClientRect().top
        point.changeCords(X,Y)
    }

    point.addEventListener('mousedown', function() {
        point.parent.hideMidPointer()
        svgMain.addEventListener('mousemove' , Movepointer)
    })
    document.addEventListener('mouseup', function() {
        
        svgMain.removeEventListener('mousemove' , Movepointer)
    })
}



const addGroupMovments = function(group) {
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

   
    //Показывание границы
    function showBorder() {
        bbox = group.getBBox();
        border.setAttributeNS(null, 'x', bbox.x - 5);
        border.setAttributeNS(null, 'y', bbox.y - 5);
        border.setAttributeNS(null, 'width', bbox.width + 10);
        border.setAttributeNS(null, 'height', bbox.height + 10);
        
        if (!border.parentNode) {
            svgMain.insertAdjacentElement('afterbegin', border);
        }
    }

    //Сворачивание границы
    function hideBorder() {
        if (border.parentNode) {
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

                if(child.elem.showMidPointer) {
                    child.elem.hideMidPointer()
                }
            }
            
            
            

            // Изменение координат точек линии
            for (let i = 0; i < cords.length; i++) {
                cords[i][0] += deltaX;
                cords[i][1] += deltaY;
            }
        }

        startX = event.x;
        startY = event.y;
        
        showBorder();
    }
    

    //Функция вызывающаяся на щелчек вниз
    function handleMouseDown(ev) {
        if(ev.target in group.children) return
        ev.stopPropagation();
        showBorder();
        startX = ev.x;
        startY = ev.y;
        isDragging = true;
        

        document.addEventListener('mousemove', moveGroup);
        document.addEventListener('mouseup', handleMouseUp);
    }

    //Функция вызывающаяся на щелчек вверх
    function handleMouseUp() {
        isDragging = false;

        //Создание поинтеров
        for (const child of group.elems) {
            if(child.elem.hiddenPointers == true) {child.elem.createPointers()

                
                if(child.elem.showMidPointer) {
                    child.elem.showMidPointer()
                }
            }
        }

        document.removeEventListener('mousemove', moveGroup);
        document.removeEventListener('mouseup', handleMouseUp);
    }

    
    group.addEventListener('mousedown', handleMouseDown);
    border.addEventListener('mousedown', handleMouseDown);

    document.addEventListener('mousedown', function(ev) {
        if (ev.target !== group && ev.target !== border) {
            hideBorder();
        }
        if(ev.target == svgMain && ev.target) {
            for (const child of group.elems) {
                const cords = child.cords;
               
                //Удаление поинтера перед перетаскиванием
                if(child.elem.hiddenPointers == false) {
                    child.elem.removePointers()
    
                    if(child.elem.showMidPointer) {
                        child.elem.hideMidPointer()
                    }
                }
                
            }
        }
    });

    group.addEventListener('DOMNodeRemoved', function() {
        hideBorder();
        group.removeEventListener('mousedown', handleMouseDown);
        border.removeEventListener('mousedown', handleMouseDown);
    });
};




