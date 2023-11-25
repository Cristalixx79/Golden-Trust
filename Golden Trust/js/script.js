"use strict"

window.onload = function () {
    const preloader = document.querySelector('.loader');
    preloader.classList.add('_loaded_hiding');

    window.setTimeout(function () {
        preloader.classList.remove('_loaded_hiding');
        preloader.classList.add('_loaded');
    }, 2500);
}
function ibg() {

    let ibg = document.querySelectorAll(".ibg");

    for (var i = 0; i < ibg.length; i++) {
        if (ibg[i].querySelector('img')) {
            ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
        }
    }
}
ibg();

const animItems = document.querySelectorAll('.anim-items');
if (animItems.length > 0) {
    window.addEventListener('scroll', animateOnScroll);
    function animateOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 2;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active');

                /* animItem.addEventListener('mouseover', function(e){
                    animItem.classList.add('_hov');
                }); */

                setTimeout(removeAnimation, 1000, animItem);
            } else if ((scrollY < animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active-2');
            }
        }
    }

    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.scrollX || document.documentElement.scrollLeft,
            scrollTop = window.scrollY || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }

    setTimeout(() => {
        animateOnScroll();
    }, 2600);
}
function removeAnimation(animItem) {
    if (animItem.classList.contains("_active")) {
        animItem.classList.add("_no-anim");
    }
}

const questions = document.querySelectorAll(".item-questions__head");
if (questions.length > 0) {
    for (let index = 0; index < questions.length; index++) {
        const question = questions[index];

        question.addEventListener("click", function (e) {
            question.classList.toggle("_active");
            question.nextElementSibling.classList.toggle("_active");
        });
    }
}

const menuLinks = document.querySelectorAll('.page-scroll[data-goto]');
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', function (e) {
            const menuLink2 = e.target;
            if (menuLink2.dataset.goto && document.querySelector(menuLink2.dataset.goto)) {
                const gotoBlock = document.querySelector(menuLink2.dataset.goto);
                const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY;
                console.log(gotoBlock)
                /* if(burgerIcon.classList.contains('_active')){
                    burgerIcon.classList.remove('_active');
                    burgerIcon.nextElementSibling.classList.remove('_active');
                    document.body.classList.remove('_lock');
                } */

                window.scrollTo({
                    top: gotoBlockValue,
                    behavior: "smooth",
                });
                e.preventDefault();
            }
        });
    });
}
const menuLinks2 = document.querySelectorAll('.page-scroll2[data-goto]');
if (menuLinks2.length > 0) {
    menuLinks2.forEach(menuLink => {
        menuLink.addEventListener('click', function (e) {
            for(let i = 0; i < menuLinks2.length; i++){
                if(menuLinks2[i].classList.contains("_active")){
                    menuLinks2[i].classList.remove("_active");
                }
            }
            menuLink.classList.add("_active");
            
            const menuLink2 = e.target;
            if (menuLink2.dataset.goto && document.querySelector(menuLink2.dataset.goto)) {
                const gotoBlock = document.querySelector(menuLink2.dataset.goto);
                const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY;

                window.scrollTo({
                    top: gotoBlockValue,
                    behavior: "smooth",
                });
                e.preventDefault();
            }
        });
    });
    window.onscroll = function () {
        console.log('cew')
        if(scrollY >= 661 && scrollY < 1600){
            for(let i = 0; i < menuLinks2.length; i++){
                if(menuLinks2[i].classList.contains("_active")){
                    menuLinks2[i].classList.remove("_active");
                }
            }
            menuLinks2[1].classList.add("_active");
        }
        if(scrollY >= 1600){
            for(let i = 0; i < menuLinks2.length; i++){
                if(menuLinks2[i].classList.contains("_active")){
                    menuLinks2[i].classList.remove("_active");
                }
            }
            menuLinks2[2].classList.add("_active");
        }
        if(scrollY < 661){
            for(let i = 0; i < menuLinks2.length; i++){
                if(menuLinks2[i].classList.contains("_active")){
                    menuLinks2[i].classList.remove("_active");
                }
            }
            menuLinks2[0].classList.add("_active");
        }
    }
}