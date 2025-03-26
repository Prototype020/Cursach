

const addPointMovements = function(point) {

    function Movepointer(event) {
        let X = event.pageX -svgMain.getBoundingClientRect().left 
        let Y = event.pageY - svgMain.getBoundingClientRect().top
        point.changeCords(X,Y)
        point.parent.update()
        console.log(point.cords)
    }
    



    point.addEventListener('mousedown', function() {
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

    function hideBorder() {
        if (border.parentNode) {
            border.remove();
        }
    }

    function moveGroup(event) {
        if (!isDragging) return;
        
        let deltaX = event.x - startX;
        let deltaY = event.y - startY;

        for (const child of group.elems) {
            const cords = child.cords;
            for (let i = 0; i < cords.length; i++) {
                cords[i][0] += deltaX;
                cords[i][1] += deltaY;
            }
        }

        startX = event.x;
        startY = event.y;
        
        // Update border position
        showBorder();
    }
    

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

    function handleMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', moveGroup);
        document.removeEventListener('mouseup', handleMouseUp);
    }

    
    group.addEventListener('mousedown', handleMouseDown);
    border.addEventListener('mousedown', handleMouseDown);

    document.addEventListener('mousedown', function(ev) {
        if (ev.target !== group && ev.target !== border) {
            hideBorder();
        }
    });

    group.addEventListener('DOMNodeRemoved', function() {
        hideBorder();
        group.removeEventListener('mousedown', handleMouseDown);
        border.removeEventListener('mousedown', handleMouseDown);
    });
};


function handleMouseMove(event) {
    // Вычисляем разницу между текущими и начальными координатами
    let deltaX = event.x - startX;
    let deltaY = event.y - startY;

    // Применяем разницу к прокрутке
    field.scrollLeft = startScrollLeft - deltaX;
    field.scrollTop = startScrollTop - deltaY;
}

svgMain.addEventListener('mousedown', function(ev) {
    // Игнорируем, если клик не на svgMain
    if (ev.target != svgMain) return;

    // Запоминаем начальные координаты и текущую прокрутку
    startX = ev.x;
    startY = ev.y;
    startScrollLeft = field.scrollLeft;
    startScrollTop = field.scrollTop;

    // Добавляем обработчик перемещения мыши
    svgMain.addEventListener('mousemove', handleMouseMove);
});

svgMain.addEventListener('mouseup', function() {
    // Удаляем обработчик перемещения мыши
    svgMain.removeEventListener('mousemove', handleMouseMove);
});

svgMain.addEventListener('mouseleave', function() {
    // Удаляем обработчик перемещения мыши
    svgMain.removeEventListener('mousemove', handleMouseMove);
});