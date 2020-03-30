

function nussinov(sequence){
    let i = 0;
    let j = sequence.length - 1;
    const allComobosOfGreatestLength = s(i,j);
    return allComobosOfGreatestLength;

    function s(i,j){
        
        if(j-i === 1 && basePair(i,j)){
            return [ [[i,j]] ];
        }
        if(j-i === 1 && !basePair(i,j)){
            return [[]];
        }
        if(j===i)
            return [[]];
            
            
        //let one = [[[]]]
        
        let one = basePair(i,j) ? pushEach(s(i+1,j-1), [i,j]) : []
        let two = s(i+1, j)
        let three = s(i,j-1)
        let caseFour = four(i,j);
        
        let allArrays = [];
        allArrays.push(one,two,three, caseFour);
        //allArrays.push(caseFour)
    
       
        //allArray = [[arrays of length a],[arrays of length b], [arrays of length c]]
        //say c = a > b
        //do findMax->
        //finalarray = [arrays from allArrays[0] and allArrays [2]]
        //final array = [[()()][()()][()()][()()]]
        
        let arrayOfAllLargestArrays = findMax(allArrays) //REMOVE DUPLICATES
        let largestUniqueArrays = removeSelfDuplicates(arrayOfAllLargestArrays);
        return largestUniqueArrays;
        
        
    }

    function four(i,j){
        let allArrays = []
        for(let k = i+1; k < j; k++){
            let current = pushEachAll(s(i,k), s(k+1,j)) //current contains arrays of the same length
            let currentNoDups = removeSelfDuplicates(current)

           //remove elements from current that are already in all arrays
            let cleanCurrent = removeDuplicates(currentNoDups, allArrays)//allArrays=4d current=3d
        }
        return findMax(allArrays)
    }
    function removeSelfDuplicates(current){
        let indexToRemove = []
        let cleanArr = []
        for(let i = 0; i < current.length-1; i++){
            if(!indexToRemove.includes(i)){
                for(let j=i+1; j<current.length; j++){
                    if(JSON.stringify(current[i]) === JSON.stringify(current[j])){
                        indexToRemove.push(j)
                    }
                }
            }
        }
        for(let i=0; i<current.length; i++){
            if(!indexToRemove.includes(i)){
                cleanArr.push(current[i]);
            }
        }
        return cleanArr;
    }

    function removeDuplicates(current, allArrays){
        
        for(let i=0; i<current.length; i++){
            allArrays.forEach(arr=>{
                arr.forEach(innerArr => {
                    if(JSON.stringify(current[i]) == JSON.stringify(innerArr)){
                        current.splice(i, 1)
                    }
                })
            })
        }
        return current
    }

    function pushEachAll(arr1, arr2){
        if(arr1[0].length === 0 && arr2[0].length !== 0)
            return arr2;
        else if(arr2[0].length === 0 && arr1[0].length !== 0)
            return arr1;
        else if(arr1[0].length === 0 && arr2[0].length === 0)
            return [[]];
        else{
            let finalArray = [];
            arr1.forEach(arr1array => {
                arr2.forEach(arr2array=>{
                    finalArray.push(arr1array.concat(arr2array))
                })
            })
            return finalArray;
        }
        

    }

    //allArrays = [[arrays of length a],         [arrays of length b],     [arrays of length c]]
    //allArrays = [[[()()()],[()()()],[()()()]], [[()()][()()]],           [[()()()]]]
    function findMax(allArrays){
        let maxPairs = 0;
        let finalArray = [];
        allArrays.forEach(arr => {
            if(arr.length > 0)
                if(arr[0].length > maxPairs)
                    maxPairs = arr[0].length;
        });

        allArrays.forEach( arr => {
            //console.log(arr)
            if(arr.length > 0)
                if(arr[0].length == maxPairs){
                  arr.forEach( subArr =>{
                    finalArray.push(subArr);
                  });
                }
        });
        
        return finalArray
    }


    function pushEach(arrayBeingPushedTo, pairToPush){
        if(arrayBeingPushedTo[0].length === 0)
            arrayBeingPushedTo[0].push(pairToPush)
        else{
            //console.log(arrayBeingPushedTo)
            arrayBeingPushedTo.forEach(arr => {
                arr.push(pairToPush);
            })
        }
        return arrayBeingPushedTo
    }


    function basePair(i,j){
        const baseOne = sequence[i];
        const baseTwo = sequence[j];

        switch(baseOne){
            case 'A':
                return baseTwo === 'U' ? true: false;
            case 'U':
                return baseTwo === 'A' ? true: false;
            case 'C':
                return baseTwo === 'G' ? true: false;
            case 'G':
                return baseTwo === 'C' ? true: false;
        }
        
    }
}

