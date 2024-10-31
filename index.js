/* 


####### GENERAL FORMATS ########

IDs: 

Group container: holder-1
Group's names container: names-holder-1
Group's scores container: scores-container-1


Specific name: group-1-name-1
Specific score: group-1-row-1-col-1

*/



/* 
#
#
############### GROUP & GROUP CALCULATOR FUNCTIONS #####################
#
#
*/

let groupNumber = 0;
let totalFencers = 0;
let tableauSize = 0;
let numberOfByes = 0;

let fencersInEachGroup = [];

let scores = [];
let numberOfMatches = [];
let names = [];
let wins = [];
let percentages = [];
let plusMinus = [];
let touchesFor = [];
let touchesAgainst = [];
let groupResults = [{}]; // Rank after pools = groupResults[i]. (starts from 1)


let fencersRanks = [];
let matches = [];


function createGroupResults(){

    for (let h = 0; h<groupNumber;h++){
        let currentGroupNumberFencers = fencersInEachGroup[h].value
    
        for (let i = 0; i<currentGroupNumberFencers;i++){
            groupResults.push({
                name: names[h+1][i+1],
                wins: wins[h+1][i+1],
                matches: numberOfMatches[h+1][i+1],
                winPercentage: percentages[h+1][i+1],
                touchesF: touchesFor[h+1][i+1],
                touchesA: touchesAgainst[h+1][i+1],
                PM: plusMinus[h+1][i+1]})
        }
    }

}

function sortGroupResults(){

    groupResults.sort((a,b) =>{
        const winDiff = parseFloat(b.winPercentage) - parseFloat(a.winPercentage);
        if (winDiff !== 0){
            return winDiff
        }

        const plusMinusDiff = parseFloat(b.PM) - parseFloat(a.PM);
        if (plusMinusDiff !== 0){
            return plusMinusDiff;
        }

        const touchesForDiff = parseFloat(b.touchesF) - parseFloat(a.touchesF);
        if (touchesForDiff !==0){
            return touchesForDiff;
        }

        return parseFloat(a.touchesA) - parseFloat(b.touchesA);
    })

}

function createRankingTable(){

    let container = document.createElement("div");
    container.classList.add("table-holder");
    document.body.append(container);

    let table = document.createElement("table");
    table.classList.add("table");
    container.append(table);

    let caption = document.createElement("caption");
    caption.classList.add("caption");
    table.append(caption);

    let thead = document.createElement("thead");
    table.append(thead);
        //create 8x <th scope="column">Rank,name...</th>
    let columnNames = ["Rank","Name","V","M","Ind","TF","TA","Diff"];

    for (let i = 0; i<8;i++){
        let column = document.createElement("th");
        column.setAttribute("scope","column");
        column.setAttribute("id",`col-${i}`)
        thead.append(column);
        document.getElementById(`col-${i}`).innerHTML = columnNames[i];
    }

    let tbody = document.createElement("tbody");
    table.append(tbody);

    let valueNames = ["name","wins","matches","winPercentage","touchesF","touchesA","PM"];

    for (let i=0; i<totalFencers;i++){
        let tr = document.createElement("tr");
        let rankVal = document.createElement("th");
        rankVal.setAttribute("scope","row");
        rankVal.innerHTML = i+1;
        tbody.append(tr);
        tr.append(rankVal);

        for (let j=0;j<7;j++){
            let tdValue = document.createElement("td");
            tdValue.setAttribute("id",`tdvalue-${i}-${j}`);
            tr.append(tdValue);
            document.getElementById(`tdvalue-${i}-${j}`).innerText = groupResults[i+1][valueNames[j]];
        }
    }

}

function calculateWinPercentage(){

    for (let h=0; h<groupNumber;h++){
        
        wins[h+1]=[];
        percentages[h+1]=[];
        let currentGroupNumberFencers = fencersInEachGroup[h].value;
        
        for (let i = 0;i<currentGroupNumberFencers;i++){
            wins[h+1][i+1]=0;

            for (let j=0;j<currentGroupNumberFencers;j++){
                if (i !== j){
                    if (scores[h+1][i+1][j+1] == 5){
                        wins[h+1][i+1]++;
                    }
                }
            }
        
        
            percentages[h+1][i+1] = (wins[h+1][i+1] / (currentGroupNumberFencers - 1)).toFixed(3);
        
        
        
        
        }
    }

}

function calculatePlusMinus(){


    for (let h = 0; h<groupNumber;h++){
        touchesFor[h+1]=[];
        touchesAgainst[h+1]=[];
        plusMinus[h+1]=[];
        let currentGroupNumberFencers = fencersInEachGroup[h].value;

        for (let i=0;i<currentGroupNumberFencers;i++){
            touchesFor[h+1][i+1]=0;
            touchesAgainst[h+1][i+1]=0;
            plusMinus[h+1][i+1]=0;

            for (let j =0; j<currentGroupNumberFencers;j++){
                if (i !== j){
                    touchesFor[h+1][i+1]+=scores[h+1][i+1][j+1]*1;
                    touchesAgainst[h+1][i+1]+=scores[h+1][j+1][i+1]*1;
                }
                
            }

        }

        for (let i=0;i<currentGroupNumberFencers;i++){
            plusMinus[h+1][i+1] = touchesFor[h+1][i+1] - touchesAgainst[h+1][i+1];
        }
    }


}

function storeNames(){

    for (let h = 0;h<groupNumber;h++){
        names[h+1]=[];

        let currentGroupNumberFencers = fencersInEachGroup[h].value;

        for (let i=0;i<currentGroupNumberFencers;i++){
            names[h+1][i+1] = [];
            let currentName = document.getElementById(`group-${h+1}-name-${i+1}`);
            names[h+1][i+1] = currentName.value;
        }
    }

}

function storeScores(){  

    for (let h = 0; h<groupNumber;h++){

        scores[h+1]=[];
        numberOfMatches[h+1]=[];
        
        let currentGroupNumberFencers = fencersInEachGroup[h].value;
        console.log(currentGroupNumberFencers);

        for (let i = 0; i<currentGroupNumberFencers;i++){

            scores[h+1][i+1]=[];
            numberOfMatches[h+1][i+1]=[];

            for (let j=0;j<currentGroupNumberFencers;j++){
                if (i !== j){
                    let currentScore = document.getElementById(`group-${h+1}-row-${i+1}-col-${j+1}`);
                    scores[h+1][i+1][j+1] = currentScore.value;
                    numberOfMatches[h+1][i+1]++;

                }
            }
        }
    }

}

function updateGroupCounter(){
    groupNumber++;
    let fencersInGroup = parseInt(document.getElementById("input-group-size-field").value)
    console.log("Group count:",groupNumber)
    totalFencers += fencersInGroup;
    console.log("Total fencers count: ", totalFencers)
    
    fencersInEachGroup.push({
        key:groupNumber,
        value:fencersInGroup
        })
    console.log("Fencers in each group: ", fencersInEachGroup)
}

function generateGroup(){
    
    document.getElementById("calculate-group-results-button").removeAttribute("disabled")
    
    let numberFencers = document.getElementById("input-group-size-field").value;
    console.log(numberFencers)

   const fullContainer = document.createElement("div");
   fullContainer.setAttribute("id",`full-holder-${groupNumber}`);
   fullContainer.classList.add("full-container");
   document.body.append(fullContainer);



    
    
    const headerRow = document.createElement("div");
    headerRow.classList.add("header-row");
    fullContainer.append(headerRow);

    const headerEmptySpaceContainer = document.createElement("div");
    headerEmptySpaceContainer.classList.add("header-empty-space-container");
    headerRow.append(headerEmptySpaceContainer);

    const headerNameContainer = document.createElement("div");
    headerNameContainer.classList.add("header-name-container");
    headerRow.append(headerNameContainer);

    const headerEmptySpace = document.createElement("input");
    headerEmptySpace.classList.add("header-empty-space");
    headerEmptySpace.setAttribute("disabled","true");
    headerEmptySpaceContainer.append(headerEmptySpace);

    const secondHeaderEmptySpace = document.createElement("input");
    secondHeaderEmptySpace.classList.add("second-header-empty-space");
    secondHeaderEmptySpace.setAttribute("disabled","true");
    headerEmptySpaceContainer.append(secondHeaderEmptySpace);
   

//
   
    
    

    for (let i=0; i<numberFencers;i++){
        const numberLabel = document.createElement("input");
        numberLabel.classList.add("number-label");
        numberLabel.setAttribute("id",`label-${groupNumber}-${i+1}`);
        numberLabel.setAttribute("disabled","true");
        headerNameContainer.append(numberLabel);
        document.getElementById(`label-${groupNumber}-${i+1}`).value = `${i+1}`;

    }
    
//
    const container = document.createElement("div");
    container.setAttribute("id",`holder-${groupNumber}`);
    container.classList.add("group-container");
    fullContainer.append(container);

    const rowLabelContainer = document.createElement("div");
    rowLabelContainer.classList.add("column-label-container");
    container.append(rowLabelContainer);

   

    for (let i=0;i<numberFencers;i++){
        const columnLabel = document.createElement("input");
        columnLabel.classList.add("column-label");
        columnLabel.setAttribute("id",`column-label-${groupNumber}-${i+1}`);
        columnLabel.setAttribute("disabled","true");
        rowLabelContainer.append(columnLabel);
        document.getElementById(`column-label-${groupNumber}-${i+1}`).value = `${i+1}`;
    }


    const namesContainer = document.createElement("div");
    namesContainer.setAttribute("id",`names-holder-${groupNumber}`);
    namesContainer.classList.add("names-container");
    container.append(namesContainer);


    const scoresContainer = document.createElement("div");
    scoresContainer.setAttribute("id",`scores-container-${groupNumber}`);
    scoresContainer.classList.add("scores-container");
    container.append(scoresContainer);


    for (let i =0; i < numberFencers;i++){
        const nameInput = document.createElement("input");
        nameInput.setAttribute("id",`group-${groupNumber}-name-${i+1}`); // ex. #group-1-name-1
        nameInput.classList.add("name-input");
        namesContainer.append(nameInput);
    }

    for (let i=0; i<numberFencers;i++){
        const scoresRow = document.createElement("div");
        scoresRow.setAttribute("id",`scores-row-${i+1}`);
        scoresRow.classList.add("scores-row-holder");
        scoresContainer.append(scoresRow);

        for (let j = 0; j<numberFencers;j++){
            
            if (i===j){
                const disabledScoreBox = document.createElement("input");
                disabledScoreBox.classList.add("disabled-score-box");
                disabledScoreBox.setAttribute("disabled","true");
                scoresRow.append(disabledScoreBox);
            } else {
                const scoreInput = document.createElement("input");
                scoreInput.setAttribute("id",`group-${groupNumber}-row-${i+1}-col-${j+1}`); // ex. #group-1-row-1-col-1
                scoreInput.setAttribute("min","0");
                scoreInput.setAttribute("max","5");
                scoreInput.setAttribute("type","number");
                scoreInput.classList.add("score-input");
                scoresRow.append(scoreInput);
                scoreInput.setAttribute("onchange","validateGroupInput(this)")
            }

        }
    }

    //** .group-container{display:flex; }   .names-container{display:flex; flex-direction:column}  .scores-container{display:flex; flex-direction:column}   .name-input{}  .scores-row-holder{display:flex}   .disabled-score-box{width:50px; height:50px; background-color:gray;}   .score-input{width:50px; height:50px}  */


    const endDiv = document.createElement("div");
    endDiv.classList.add("end-div");
    container.append(endDiv);

}

function validateGroupInput(input){
    if (input.value > 5 || input.value < 0){
        console.log("Invalid score input");
        input.value = "";
        alert("Score must be a number between 0 and 5.");
    }
}

function calculateResults(button){
    button.toggleAttribute("disabled");
    document.getElementById("generate-group-button").toggleAttribute("disabled");
    storeScores();
    storeNames();
    calculatePlusMinus();
    calculateWinPercentage();
    createGroupResults();
    sortGroupResults();
    createRankingTable();

    console.log(groupResults)

    const tableauButton = document.createElement("button");
    tableauButton.setAttribute("id","tableau-button");
    document.body.append(tableauButton);
    document.getElementById("tableau-button").innerHTML = "Create tableau";
}



/*################################ */


function nearestPowerOfTwo(){

    let power = 0;
    let powerOfTwo = 2**power;


    while (powerOfTwo < totalFencers){
        power++;
        powerOfTwo = 2**power;
    };

    tableauSize = powerOfTwo;
    numberOfByes = tableauSize - totalFencers;
}

