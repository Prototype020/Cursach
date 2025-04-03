const leftSidebar = document.getElementById('sidebar')


const appendFigure = function(elem) {
    const brick = document.createElement('div')
    const svg = document.createElementNS(ns,'svg')

    
    
   

    brick.append(svg)
    svg.append(elem)
    svg.className = 'brick'

    


    

    brick.className = 'brick'

    leftSidebar.append(brick)
    
    
}

appendFigure(new Human().setScale(0.45).setTranslate('25, -10')) 
appendFigure(new Arrow().setScale(0.3).setTranslate('30,60'))