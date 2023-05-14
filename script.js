let wordText = document.querySelector(".word"),

    hintText = document.querySelector(".hint span"),

    timeText = document.querySelector(".time b"),

    inputField = document.querySelector("input"),

    refreshButton = document.querySelector(".refresh-word"),

    checkButton = document.querySelector(".check-word");

let correctWord, timer;

let recognizerWordTimer = maxTime => {

    clearInterval(timer);

    timer = setInterval(() => {

      if(maxTime > 0 ) {

        //Decreaming maxTime By -1

        maxTime--;

        return timeText.innerText = maxTime;

      }

      clearInterval(timer);

      alert(`Time Is Over! ${correctWord.toUpperCase()} Was The Correct Word`);

      //Calling recognizerWord Function So That The Game Will Restart

      recognizerWord();

    },1000);

};

let recognizerWord = () => {

    //Calling recognizerWordTimer Function With Passing 30 As maxTime Value
 
    recognizerWordTimer(30);

    //Getting The randomObject From words

    let randomObject = words[Math.floor(Math.random() * words.length)];

    //Splitting Each Letter Of Random Word

    let splitWord = randomObject.word.split("");

    for (let index = splitWord.length - 1; index > 0; index--) {

        //Getting randomNumber
        
        let randomNumber = Math.floor(Math.random() * (index + 1));

        //Shuffling And Swiping splitWord Letters Randomly

        [splitWord[index], splitWord[randomNumber]] = [splitWord[randomNumber], splitWord[index]];

    };

    //Passing Shuffled Word As wordText

    wordText.innerHTML = splitWord.join("");

    //Passing randomObject Hint As hintText

    hintText.innerText = randomObject.hint;

    //Passing The Random Word To correctWord

    correctWord = randomObject.word.toLowerCase();

    //Making The Input Field Empty

    inputField.value = "";

    //Setting Input maxlength Attribute Value To Word Length

    inputField.setAttribute("maxlength", correctWord.length);

    console.log(randomObject);

};

recognizerWord();

refreshButton.addEventListener("click", recognizerWord);

let checkWord = () => {

    //Getting The User Value

    let typedWord = inputField.value.toLocaleLowerCase();

    // console.log(typedWord);

    //If User Didn't Enter Anything Then Show The Below Given Alert Box

    if (!typedWord) return alert("PLease Enter A Word!")

    //If User Typed Word Doesn't Matched With The Correct Word Then Show The Below Given Alert Box

    if (typedWord !== correctWord) return alert(`Oops! ${typedWord} Is Not A Correct Word`);

    //If Above Given Conditions Failed Then Show The Below Given Alert Box

    alert(`That's Nice! ${typedWord.toUpperCase()} Is A Correct Word`);

    recognizerWord();

};

checkButton.addEventListener("click", checkWord);