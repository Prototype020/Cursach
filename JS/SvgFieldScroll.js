let startX, startY;

function handleMouseMove(event) {
    let scrolledX = field.scrollLeft - (event.x - startX)/20;
    let scrolledY = field.scrollTop - (event.y - startY)/20;
    field.scrollTop = scrolledY;
    field.scrollLeft = scrolledX;
}

svgMain.addEventListener('mousedown', function(ev) {
    if(ev.target != svgMain) return;
    startX = ev.x;
    startY = ev.y;

    svgMain.addEventListener('mousemove', handleMouseMove);
});

svgMain.addEventListener('mouseup', function() {
    svgMain.removeEventListener('mousemove', handleMouseMove);
});

svgMain.addEventListener('mouseleave', function() {
    svgMain.removeEventListener('mousemove', handleMouseMove);
});