
var yInitial = 150;
const MARGIN = 50;
const LETTER_GAP = 50
const VERTICAL_GAP = 150

function setup() {
    let params = getURLParams();
    let seqArray = params.seq.split('');
    if(seqArray.length>12){
        alert("Enter 12 bases or less");
        return 0;
    }
    let combos = nussinov(seqArray);

    let height = combos.length * VERTICAL_GAP + 100
    let width =  seqArray.length * LETTER_GAP +100
    console.log(width)
    console.log(height);
    createCanvas(width,height)
    drawSequences(seqArray, yInitial, combos.length)
    drawArcs(combos, yInitial)
    displayInfo(params.seq, combos[0].length, combos.length);
    
}

function displayInfo(sequenceString, numMaxFolds, numCombonations){
    let string = "<br>The maximun number of times <strong>" + sequenceString 
                    + "</strong> can be folded is <strong>" + numMaxFolds 
                    +"</strong><br>There are <strong>" + numCombonations 
                    + "</strong> ways these folds can occour:";

    let info = document.createElement("DIV")
    info.innerHTML = string;
    let infoContainer = document.getElementById("info");
    infoContainer.appendChild(info) 
}

function drawArcs(combos, yInitial){
    console.log("in")
    for(let i=0; i<combos.length; i++){
        for(let j=0; j<combos[i].length; j++){ 
            let x1 = (combos[i][j][0]*LETTER_GAP)+MARGIN
            let x2 = (combos[i][j][1]*LETTER_GAP)+MARGIN
            let xCenter = (x1 + x2)/2
            let y = yInitial + (i*VERTICAL_GAP)
            let width = (x2 - x1)

            noFill();
            arc(xCenter+4, y-12, width, width/3, PI,0 )

        }
    }

}



function drawSequences(seq, yInitial, numSeq){
    for(let i=0; i< numSeq; i++ ){
        for(let j = 0; j < seq.length; j++ ){
            text(seq[j], MARGIN+(j*LETTER_GAP), yInitial+(i*VERTICAL_GAP))
        }
    }
}