

// const equation = document.getElementById('equation');


// input ex = (10 + 2) * 5 
/*

   validateparentheses() ** Done **
    push just branthces;


    VaildateExpresion()  ** Done **
    just loop through the input expression and see if there's  a double operator
    and store the two numbers as one number e.g. 55 it's a one number not 5 5 as separate number

    convertToPostFix() ** Tomorrow **
    convert the expression to postfix
    evaluateExpression(){ ** Tomorrow **
       evaluate the expression after converte it to postFix or prefix
       and then just add the numbers and if you see an operator 
       pop all the number that inside stack and evaluate.

       
    }
*/

/*equation.addEventListener('change',ev=>{
    let elM = ev.target.value;
    // console.log(elM);
    const n = elM.length;
    if(n<=0){
        console.log("Cannot parse empty Text!!");
    }else{
        //Modifide 
        let validExepression=false;
        validExepression=validateExepression(elM);
        console.log(validExepression);
        if(validExepression){
        // Post fix operater
            console.log("is exepression valid:"+validateParentheses(elM)); 
        }  else{ console.log("Not valid expresion contains characters")}
    }
});*/

function validateParentheses(expression){
    const balanceStack = [];
    for(let index=0, n=expression.length; index<n; index++ ){
        if(expression[index]=='(' || expression[index]=='['||expression[index]=='{'){
            console.log("Pushing: "+expression[index]);
            balanceStack.push(expression[index]);

        }
        else if(expression[index]==')' || expression[index]==']'||expression[index]=='}' )
        {
            if(isEmpty(balanceStack) || !arePair(balanceStack[balanceStack.length-1],expression[index]) ){
                
                return false;
            }
            else
                balanceStack.pop();
        } 
    }
    if (isEmpty(balanceStack)) {
        return true;
    };
}

function isEmpty(list){
    console.log("is empty: "+ list.length);
    return list.length==0 //true if list size ==0 false otherwise
}

function arePair(open, close){
    
    console.log("open :"+open+" close:"+ close);
    
    if(open=='(' && close==')') return true;
    if(open=='{' && close=='}') return true;
    if(open == '[' && close==']') return true;
    return false;

}


function validateExepression(exepression){
    let previousElement='';
    for(let index=0, n=exepression.length; index<n; index++ ){
        console.log("validate element in index="+index+" : "+ exepression[index])

        if(exepression[index]<=9 && exepression[index]>=0)
        {   
            console.log("change previous element from: "+previousElement
            +" to: "+exepression[index])
            previousElement=exepression[index];
           
        }else if(exepression[index]=='+' || exepression[index]=='-' || exepression[index]=='/' || exepression[index]=='*')
        {
            if(previousElement =='+' || previousElement=='-' || previousElement=='/' || previousElement=='*'){
                return false;
            }
            else{
                console.log("change previous element from: "+previousElement
                +" to: "+exepression[index])
                
                previousElement=exepression[index];
            }
        }
        else{
            return false;
        }
    }
    if(previousElement<=9 && previousElement>=0 ){
        console.log("ended with? "+ previousElement)
        return true; //ended with a number.
    }

    return false;
}

function validate(event) {
    console.log("hey");
    event.preventDefault();
    const equation = event.target['equation'].value;
    checkEquation(equation);
}

/* new calc impl*/

const display = document.getElementById('display');

function handelBtn(value){

    if(value && value.length>0){
        console.log(display.textContent);

        if(display.textContent=='|'){
            console.log("matches begining")
            display.textContent=value;
        }else{
            display.textContent+=value;
        }
    }
}
function clearText(){
    console.log(display.textContent);
    if(display.textContent!='|')
    {
        console.log("clearing....");
        display.textContent='|';
    }
}

function percentage(){
    const number =display.textContent;
    const isItAcsiptibale=readyForPercentage(number);
    console.log("text:"+display.textContent);
    console.log("is ready for persentage?"+isItAcsiptibale);
    if(isItAcsiptibale){
        display.textContent=number/100;
    }
}


function readyForPercentage(text){
    let validity=false;  
    const n = text.length;
    if(text!='|' && n>0){
        for(let i=0; i<n; i++){
            if(!(text[i]>=0 && text[i]<=9)){
                return false;
            }
            else{
                validity=true;
            }
        }
    }
    return validity;
}

//
function calculate(){
    const equation = display.textContent;
    const n = equation.length;
    let postFixEquation = '';
    const operations = [];
    let previousElement='';

    if(n>0 && equation!='|'){
        for(let i=0; i<n; i++){
            if(equation[i]>=0 && equation[i]<=9){
                console.log("change previous element from: "+previousElement
                    +" to: "+equation[i])
                previousElement=equation[i];
                postFixEquation+=equation[i];
            }else{

                if(previousElement =='+' || previousElement=='-' || previousElement=='/' || previousElement=='*'){
                    return false;
                }
                else{
                    console.log("change previous element from: "+previousElement
                    +" to: "+equation[i]);
                    previousElement=equation[i];
                }
                console.log("pushing:"+equation[i]);
                while(operations.length != 0 && getOrder(equation[i]) <= getOrder(operations[operations.length - 1])) {
                    postFixEquation += operations[operations.length - 1];
                    operations.pop();
                }
                operations.push(equation[i]);
            }
        }

        while(operations.length>0){
            postFixEquation+=operations.pop();
        }

        let evaluateStack=[];
        let total=0;
        for(let i =0 ; i<n; i++){
            if(postFixEquation[i]>=0 && postFixEquation[i]<=9){
                console.log("find number pushing:"+postFixEquation[i]);
                evaluateStack.push(postFixEquation[i]);
            }else{
                switch (postFixEquation[i]) {
                    case '+':
                        while(evaluateStack.length>0){
                            console.log("total:"+total)
                             total+=Number.parseInt(evaluateStack.pop());
                             console.log("adding:"+total)
                        }
                        break;
                
                    case '-':
                        while(evaluateStack.length>0){
                            console.log("total:"+total)
                             total-=Number.parseInt(evaluateStack.pop());
                             console.log("subtarcting:"+total)
                        }
                        break;
                }
            }
        }   
    
     display.textContent=total;
    console.log("final equation:"+postFixEquation);
    }
}


function getOrder(char){
    if(char == '/' || char=='*')
        return 2;
    else if(char == '+' || char == '-')
        return 1;
    else
        return -1;

}


