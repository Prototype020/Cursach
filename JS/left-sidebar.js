const leftSidebar = document.getElementById('sidebar')




const appendFigure = function(elem) {
    const brick = document.createElement('div')
    const svg = document.createElementNS(ns,'svg')

    
    
   

    brick.append(svg)
    svg.dataset.figure = elem.name
    svg.append(elem)
    svg.className = 'brick'


    

    brick.className = 'brick'

    leftSidebar.append(brick)
}





function getFigureByName(name) {
    switch(name){
        case 'Human': return new Human()
        case 'Arrow': return new Arrow()
            
    }
}

leftSidebar.addEventListener('click', (ev) => {
    if(ev.target.tagName !== 'svg') return
    
    const figureName = ev.target.dataset.figure

    const figure = getFigureByName(figureName)
    console.log(ev)
    svgMain.append(figure)
})



appendFigure(new Human().setScale(0.4).moveTo(13,45)) 
