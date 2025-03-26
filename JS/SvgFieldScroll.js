let startX, startY;
let startScrollLeft, startScrollTop;

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


