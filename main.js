//Variable Initialization
let UncoverCards = 0;
let Card1 = null;
let Card2 = null;
let FirstResult = null;
let SecondResult= null;
let movements = 0;
let success= 0;
let timer = false; 
let timer2=30;
let initialTime=timer2;
let Countdown=null;

// sounds
let winAudio= new Audio('./sounds/win.wav');
let clickAudio= new Audio('./sounds/click.wav');
let loseAudio= new Audio('./sounds/lose.wav');
let rightAudio= new Audio('./sounds/right.wav');
let wrongAudio= new Audio('./sounds/wrong.wav');

//Pointing to html document
let ShowMovements = document.getElementById('movements');
let ShowSuccess = document.getElementById('success')
let ShowTime = document.getElementById('t-left')



//Random Number Generation
let number = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
number = number.sort(() =>{return Math.random() -0.5});
console.log(number);

//Funtions
function CountTime(){
    Countdown = setInterval(()=>{
        timer2--;
        ShowTime.innerHTML=`Time: ${timer2} seconds`; 
        if(timer2==0){
            clearInterval(Countdown);
            //block cards
            BlockCards();
            loseAudio.play();
        }
    },1000)
}


function BlockCards(){
    for(let i = 0; i<=15 ; i++){
        let LockedCard = document.getElementById(i);
        LockedCard.innerHTML = `<img src="./images/${number[i]}.png" alt="">`;
        LockedCard.disabled=true;
    }
}

//Principal Function
function uncover(id){
   if(timer == false){
    CountTime();
    timer= true;
   }


    UncoverCards++;


    if (UncoverCards ==1){
        //Show First Number
        Card1 = document.getElementById(id);
        FirstResult = number[id]
        Card1.innerHTML = `<img src="./images/${FirstResult}.png" alt="">`;
        clickAudio.play();

        //Disable First Button
        Card1.disabled = true;
    }else if(UncoverCards == 2){
         //Show Second Number
         Card2 = document.getElementById(id);
         SecondResult = number[id]
         Card2.innerHTML = `<img src="./images/${SecondResult}.png" alt="">`;

         //Disable Second Button
         Card2.disabled= true;

         //Increase Movements
        movements++;
        ShowMovements.innerHTML = `Movements: ${movements}`; 

        if (FirstResult == SecondResult){
            UncoverCards = 0 ;

            //Increase success
            success++;
            ShowSuccess.innerHTML =`Success: ${success}`;
            rightAudio.play();

            
            if(success == 8){
                winAudio.play();
                clearInterval(Countdown);
                ShowTime.innerHTML = `Excellent!! You only took ${initialTime - timer2} seconds `;
                ShowSuccess.innerHTML = `Success: ${success} 🤑`;
                ShowMovements.innerHTML = `Movements: ${movements} 😱`; 
            }
            
        }else{
            wrongAudio.play();
            //Cover mismatched values
            setTimeout(()=>{
                Card1.innerHTML = ' ';
                Card2.innerHTML = ' ';
                Card1.disabled= false;
                Card2.disabled=false;
                UncoverCards = 0;
            },700);
        }
    }
}
