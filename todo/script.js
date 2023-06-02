//----------------------------------------------------------------------functions
function checkValidValue(){

    //saving value in variable
    textElement=document.querySelector('.text');
    dateElement=document.querySelector('.text-date');
    cb=document.querySelector('.checkbox');

    // checking value 
    if((textElement.value==='')||(dateElement.value)===''){

        alert('both inputs are required TEXT & DATE');

        document.querySelector('.text').value='';
        document.querySelector('.text-date').value='';

        textElement.value='';
        dateElement.value='';
        

    }else{


        const templateElementvalue=textElement.value;
        const dateElementvalue=dateElement.value;
        const cbValue=cb.checked;
        renderList.push([templateElementvalue,dateElementvalue,cbValue])
        updatels();
    }
}
function clearValue(){
    document.querySelector('.text').value='';
    document.querySelector('.text-date').value='';

}


function render(){

    displayElement.innerHTML='';

    for(i=0;i<renderList.length;i++){

    const temp=renderList[i];    

    const textValue=document.createElement('div');
    textValue.setAttribute('class','task');
    textValue.setAttribute('id',`text${i}`);

    const dateValue=document.createElement('div');
    dateValue.setAttribute('class','task');
    dateValue.setAttribute('id',`date${i}`);

    const delButton=document.createElement('button');
    delButton.setAttribute('type','button');
    delButton.setAttribute('class','delButton');
    delButton.setAttribute('id',`button${i}`);
    delButton.innerText='X';

   const status=document.createElement('input');
   status.setAttribute('type','checkbox');
   status.setAttribute('id',`checkbox${i}`);


    textValue.innerText=temp[0];
    dateValue.innerText=temp[1];
    status.checked=temp[2];

    displayElement.append(status);
    displayElement.append(textValue);
    displayElement.append(dateValue);
    displayElement.append(delButton);

    

    }
    delItem();

}

function refresh(){
    for(i=0;i<renderList.length;i++){
        let temp=document.querySelector(`#checkbox${i}`).checked;
        renderList[i][2]=temp;
        updatels();
    }
}
function line(){
    for(i=0;i<renderList.length;i++){
        let temp=document.querySelector(`#checkbox${i}`).checked;
        if(temp){
            document.querySelector(`#text${i}`).setAttribute('class','linethrough');
            document.querySelector(`#date${i}`).setAttribute('class','linethrough');
            renderList[i][2]=true;
            updatels();
        }
        else{
            document.querySelector(`#text${i}`).removeAttribute('class');
            document.querySelector(`#date${i}`).removeAttribute('class');

            document.querySelector(`#text${i}`).setAttribute('class','tasks');
            document.querySelector(`#date${i}`).setAttribute('class','tasks');

            renderList[i][2]=false;
            updatels();
        }
    }
}
function delItem(){
    for(i=0;i<renderList.length;i++){
        let temp=document.querySelector(`#button${i}`);
        temp.addEventListener('click',()=>{

            //---------code from chat gpt
            const index=parseInt(temp.id.slice(-1));
            //---------

            renderList.splice(index, 1);
            updatels();
            render();
        });
    }
}

function updatels(){
    const temp=JSON.stringify(renderList);
    localStorage.setItem('data',temp);
    // console.log('ls updated');
}

function updateRenderList(){
    let temp=localStorage.getItem('data');
    if(temp===null){
        return;
    }else{
        renderList=JSON.parse(temp);
        render();
        line();
    }
}


//----------------------------------------------------------------------variable

// const templateElement=document.querySelector('.js-template').innerHTML;
const containerElement=document.querySelector('.js-container');

let textElement;
let dateElement;
let cb;
let renderList=[];

const addButtonElement=document.querySelector('.js-add-button');

const clearElement=document.querySelector('.js-del');

let displayElement=document.querySelector('.js-display');

//local storage
 updateRenderList();

//on add click
addButtonElement.addEventListener('click',()=>{
    refresh();
    checkValidValue();
    render();
    line();
    
})

//on clear click
clearElement.addEventListener('click',()=>{
    clearValue();
})


//refresh value change
displayElement.addEventListener('click',()=>{

    line();
});

