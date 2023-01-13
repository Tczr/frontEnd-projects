const btns = document.querySelectorAll(".nav-btn");
btns.forEach(
    (btn)=>{
        btn.addEventListener(
            'click', (ev)=>{                
                const container = ev.composedPath().find(el=> el.className==="sildes-container");
                
                const direction = btn.dataset.crosualBtn==="left" ? -1 : 1;
                

                const slids = container.querySelectorAll(".slide");

                const oldActive= container.querySelector("[active-slide]");
                

                let index = [...slids].indexOf(oldActive) + direction;
                

               if(index<0) {index=slids.length - 1;}
               
               else if(index >= slids.length) {index=0;}

                const newActive= slids[index];

                newActive.setAttribute("active-slide",true);
                oldActive.removeAttribute("active-slide");

            }
        )
    }
)