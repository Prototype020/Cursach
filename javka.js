let brics = document.querySelectorAll('.brick')


let filed = document.querySelector('#field')

const currentBorder = false;

document.addEventListener('click', hideBorder)


const createBlock = function(event) {
    let RectField = filed.getBoundingClientRect()
    let block = document.createElement('div')
    const className = event.target.closest('.brick').dataset.determ
    block.className = className
    
    filed.insertAdjacentElement('afterbegin', block)
    console.log(Math.floor(RectField.x + RectField.width/2) + 'px')
    block.style.right = Math.floor(Math.random() * 10 + RectField.x + RectField.width/2) + 'px'
    block.style.top = Math.floor(Math.random() * 10 + RectField.y + RectField.height/2) + 'px'
    


    let border = createBorder(block)
    block.addEventListener('click', function() {
        border.style.visibility = 'visible'
    })

    filed.addEventListener('click', function(event) {
        if(!(event.target == filed)) return
        border.style.visibility = 'hidden'
    }) 
    block.bord = border
    

    

    return block
    
}


 function hideBorder() {
    if(!currentBorder) return
    currentBorder.style.visibility = "hiden"
}




const createBorder = function(elm) {
        let bound = elm.getBoundingClientRect()
        let Border = document.createElement('div')
        Border.className = 'Border'
        Border.right = bound.x +'px'
        Border.top = bound.y +'px'
        console.log(elm.offsetHeight)
        Border.style.height = elm.offsetHeight + 5 + 'px'
        Border.style.width = elm.offsetWidth + 5 + 'px'
        elm.insertAdjacentElement('afterbegin', Border)









        return Border
    
}











console.log(document.body.firstElementChild.getBoundingClientRect())
for(item of brics) {
    console.log(item.dataset.determ)
    item.addEventListener('mouseover', function(event) {  
        event.target.closest('.brick').style.backgroundColor = 'rgb(57, 97, 97)'
    })
    item.addEventListener('mouseout',function(event) {
        event.target.closest('.brick').style.backgroundColor = 'rgb(47, 79, 79)'
    })
    item.addEventListener('mousedown',function(event) {
        event.target.closest('.brick').style.backgroundColor = 'rgb(47, 79, 79)'
    })
    item.addEventListener('mouseup', function(event) {  
        event.target.closest('.brick').style.backgroundColor = 'rgb(57, 97, 97)'
    })

    
    item.addEventListener('click', function(event) {  
        currentElem = event.target.closest('.brick').dataset.determ
        console.log(currentElem)
    })

    console.log(item.addEventListener('click', createBlock))
    
}

