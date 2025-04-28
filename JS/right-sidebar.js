document.addEventListener('DOMContentLoaded', function() {
    // Элементы управления
    const fillInput = document.getElementById('element-fill');
    const strokeInput = document.getElementById('element-stroke');
    const strokeWidthInput = document.getElementById('element-stroke-width');
    const strokeWidthValue = document.querySelector('.range-wrapper .range-value');
    const strokeColorValue = document.querySelector('.color-input-wrapper .color-value');
    
    // Обработчики событий для элементов управления
    fillInput.addEventListener('input', function() {
        if (selectedElem) {
            selectedElem.setFill(this.value);
        }
    });
    
    strokeInput.addEventListener('input', function() {
        if (selectedElem) {
            selectedElem.setStroke(this.value);
            strokeColorValue.textContent = this.value.toUpperCase();
        }
    });
    
    strokeWidthInput.addEventListener('input', function() {
        if (selectedElem) {
            const width = this.value + 'px';
            selectedElem.setStrokeWidth(width);
            strokeWidthValue.textContent = width;
        }
    });
    
    // Функция для обновления панели при выборе элемента
    function updatePanelWithElement(element) {
        if (!element) {
            // Сброс значений, если элемент не выбран
            fillInput.value = '#FFD7B5';
            strokeInput.value = '#A78A7F';
            strokeWidthInput.value = 2;
            strokeWidthValue.textContent = '2px';
            strokeColorValue.textContent = '#A78A7F';
            return;
        }
        
        // Получаем стили первого дочернего элемента (для примера)
        const firstChild = element.elems[0]?.elem;
        if (firstChild) {
            // Заливка
            const fill = firstChild.getAttribute('fill');
            if (fill && fill !== 'none') {
                fillInput.value = fill;
            }
            
            // Обводка
            const stroke = firstChild.getAttribute('stroke');
            if (stroke) {
                strokeInput.value = stroke;
                strokeColorValue.textContent = stroke.toUpperCase();
            }
            
            // Толщина обводки
            const strokeWidth = firstChild.getAttribute('stroke-width');
            if (strokeWidth) {
                const widthValue = parseInt(strokeWidth);
                strokeWidthInput.value = widthValue;
                strokeWidthValue.textContent = strokeWidth;
            }
        }
    }
    
    // Обновляем панель при изменении выбранного элемента
    document.addEventListener('mousedown', function(ev) {
        if (ev.target === svgMain) {
            updatePanelWithElement(null);
        } else if (selectedElem) {
            updatePanelWithElement(selectedElem);
        }
    });
});