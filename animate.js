function animateCSS(el, animation) {
    return new Promise(resolve => {
        
        const animationName = `animate__${animation}`
        el.classList.add(`animate__animated`, animationName)
        el.addEventListener('animationend', handleAnimationEnd, { once: true })
        
        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            event.stopPropagation()
            el.classList.remove(`${prefix}animated`, animationName)
            resolve('Animation ended')
        }
    })
}