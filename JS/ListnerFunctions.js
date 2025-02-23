

const addPointMovements = function(point) {

    function Movepointer(event) {
        let X = event.pageX -svgMain.getBoundingClientRect().left 
        let Y = event.pageY - svgMain.getBoundingClientRect().top
        point.changeCords(X,Y)
        point.parent.update()
    }
    



    point.addEventListener('mousedown', function() {
        svgMain.addEventListener('mousemove' , Movepointer)
        console.log('f')
    })
    document.addEventListener('mouseup', function() {
        svgMain.removeEventListener('mousemove' , Movepointer)
        console.log('f')
    })
}