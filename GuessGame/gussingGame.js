let randomNumber = Math.floor(Math.random()*100)+1

const form = document.querySelector("form")
const input = form.querySelector('input')
const submitBtn = form.querySelector(".green-btn")
const resetBtn = form.querySelector(".gray-btn")


const results = document.querySelector('.results')
 

const tries = document.querySelector('.number-of-tries')

const playingStack = []
console.log("hint guess numbe is: "+randomNumber)


form.addEventListener("submit",(ev)=>{
    ev.preventDefault()
    
    let leftTries = Number.parseInt(tries.textContent)-1
    console.log("tries left:"+leftTries)
    showTries(leftTries)
    if(leftTries>0){
        const value= Number.parseInt(input.value);
       
        if(value!=undefined){
            

            playingStack.push(value)
            
            if(isEqual(value)){
                disableInput()
                activateResetBtn()
                showResult(value,"correct you've guessed it right","awesome")
                console.log("correct")
            }else{
                const answer = isHiOrLow(value)
                if(answer=="high"){
                    showResult(value,"you're guess too high")
                    console.log("you're guess too high")

                }else if(answer=="low"){
                    showResult(value,"you're guess too low")

                    console.log("you're guess too low")

                }else{
                    console.log("answers is:"+answer)
                    
                }
            }
        }
    }else{
        disableInput()
        activateResetBtn()

        showResult(null,"Game Over")

    }
})


function isHiOrLow(value){
    
    if(value>randomNumber)return "high"
    if(value<randomNumber)return "low"
}

function disableInput(){
    input.className="disableInput"
}
function isEqual(value){ return value==randomNumber }

function activateResetBtn(){
    submitBtn.classList.replace("display","display-none")
    resetBtn.classList.replace("display-none","display")

}

function showTries(triesLeft){
    tries.textContent=triesLeft
}

function showResult(value, msg, msgRes="wrong!!"){
    
    const result = results.querySelector(".result")
    const message = results.querySelector(".message")
    const guesses = results.querySelector(".guesses")

    if(msg!=="Game Over"){
        
        if(guesses.textContent.length==0){
            guesses.textContent=" You're guesses: "
        }
        guesses.textContent+=value+" "
        result.textContent=msgRes
    }
    
    message.textContent=msg

}

resetBtn.addEventListener("click",()=>{
    if(resetBtn!=null || resetBtn!=undefined){
        console.log("reset button get cliked")
        tries.textContent=10
        deActivate()
        results.querySelector(".result").textContent=null
        results.querySelector(".message").textContent=null
        results.querySelector(".guesses").textContent=null
        getRandomNumber()
    }
})

function deActivate(){
    resetBtn.classList.replace("display","display-none")
    submitBtn.classList.replace("display-none","display")
    input.value=''
    input.className="activeInput"
}

function getRandomNumber(){
    randomNumber=Math.floor(Math.random() * 100 )+1
}