const calculator = document.querySelector(".calculator")
const display = calculator.querySelector(".display_calc")
const button = calculator.querySelector(".buttons")

const state={
    N1:null,
    N2:null,
    operation:null
}

button.addEventListener('click',(ev)=>{
    const target = ev.target
    const element =target.textContent
    const text = display.textContent
    if( element>=0 && element<=9 ){ 
        adddNumber(element);
        if(text=="|"){
            display.textContent=element;
        }else{ 
            if(state.operation==null){
                display.textContent=state.N1
            }else{
                display.textContent=state.N2
            }
        }

    } 
    else{
        // setOperatioin(target)  
        // target.style.backgroundColor='#99999996'
        
        checkOperator(target)
    }

    console.log("element clicked"+element);

    

    console.log("state:"+Object.values(state))
   
})

// function setOperatioin(target){
    
// }
function cleanDisplay(){
    if(display.textContent!=null && display.textContent.length>0)
    {
        display.textContent='|'
    }
}

function clearState(){

    state.N1=null
    state.N2=null
    if(state.operation!=null){
        state.operation.style.backgroundColor="#FFFFFF"
        state.operation=null
    }else{
        console.log("cannot clean null option")
    }
    
}
function readyToCalculate(){
    if(state.N1!=null && state.N2!=null && state.operation!=null)
        return true
    
        return false
}
function adddNumber(n){
    //do soeme changes
        if(state.operation==null){
            if(state.N1==null){
                state.N1=n
            }else{
                state.N1+=n
            }
        }else{
            if(state.N2==null){
                state.N2=n
            }else{
                state.N2+=n;
            }
        }
        /* else if(state.N2==null){
            state.N2=Number.parseInt(n)
         }*/
}       

function checkOperator(operator){
    if(operator.value=="clear")
    {
        clearState()
        cleanDisplay()
    }
    else if(operator.textContent=='%')
    {
        validForPercentage()
    }
    else if(operator.textContent=='=')
    {
        if(readyToCalculate()){

            const firstNumber= Number.parseFloat(state.N1)
            const secondNumber =Number.parseFloat(state.N2)
            const operator = state.operation.value
            console.log("calc"+ firstNumber+" "+operator+" "+secondNumber)
            const total= calculate(firstNumber,secondNumber,operator);
            clearState();
            state.N1=total;
            
            display.textContent=total;
        }
    }
    else{
        addOperator(operator)
    }
    
}


function addOperator(operator){
    operator.style.backgroundColor='#99999996'
    if(state.operation==null){
            state.operation=operator;
    }else{
        console.log("change the operation from "+state.operation.textContent+" to "+ operator.textContent)
        state.operation.style.backgroundColor="#FFFFFF"
        state.operation=operator;
        

    }
}

function calculate(n1,n2,operation){
    if(n1!=null && n2!=null && operation != null){
        console.log("operation use"+operation)
        switch (operation) {
            case "add" :   return add(n1,n2)
            case "minus" :   return subtract(n1,n2)
            case "divide" :   return divde(n1,n2)
            case "multiply" :   return multiply(n1,n2)
        
            default:
                break;
        }
    }else return
}

function add(n1,n2){
    
    return n1+n2
}

function subtract(n1,n2){
  
    return n1-n2
}

function divde(n1,n2){
    return n1/n2
}

function multiply(n1,n2){
    return n1*n2
}