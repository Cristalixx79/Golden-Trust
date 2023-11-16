"use strict"

window.onload = function () {
    const preloader = document.querySelector('.loader');
    preloader.classList.add('_loaded_hiding');

    window.setTimeout(function () {
        preloader.classList.remove('_loaded_hiding');
        preloader.classList.add('_loaded');
    }, 2500);
}
function ibg(){

    let ibg=document.querySelectorAll(".ibg");
    
    for (var i = 0; i < ibg.length; i++) {
        if(ibg[i].querySelector('img')){
            ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
        }
    }
}
    
ibg();

const animItems = document.querySelectorAll('.anim-items');

if(animItems.length > 0){
    window.addEventListener('scroll', animateOnScroll);
    function animateOnScroll(){
        for (let index = 0; index < animItems.length; index++){
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if(animItemHeight > window.innerHeight){
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if((scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight)){
                animItem.classList.add('_active');

                animItem.addEventListener('mouseover', function(e){
                    animItem.classList.add('_hov');
                });
            }else if((scrollY < animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight)){
                animItem.classList.add('_active-2');
            }
        }
    }

    function offset(el){
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.scrollX || document.documentElement.scrollLeft,
            scrollTop = window.scrollY || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }

    setTimeout(() => {
        animateOnScroll();
    }, 2700);
}