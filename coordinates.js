function calculateArea(coordinates){
    //this splits all the coordinates by ","
    let codSplit = coordinates.split(",");
    let defArea = 0;
    let no1 = codSplit.length;
    let points = []

    /**This condition checks for the index of codSplit if its not equal to the total lenght of the splitted Array - 1
     * or the last element of the array.
     */
    if(codSplit[0] != codSplit[no1 - 1]){
        //if the above condition is true push the second index of codSplit into codSplit
        codSplit.push(codSplit[1])
    }
    /**For Each of the Element in the codSplit Array, split all the element in it with a colon and assign them into
     * codSplit2
     */
    codSplit.forEach(element => {
        let codSplit2 = element.split(":");
        /**Add index 0 and 1 of codSplit2 to mini as X and Y */
        let mini = [];
        mini["X"] = codSplit2[0];
        mini["Y"]=codSplit2[1];

        //after that, push all those data from mini into the empty array of points
        points.push(mini)
    });
    //Where this calculates the total lenfht of the Array in points and assigns it to new variable called n
    let n = points.length;

    /**Then, run this loop through the points Array.
     * Mathematical formular for finding the area of an irregular polygon, the only difference is
     * that the are being converted to get correct answers for the coordinates....
    */
    for(let j = 0; j < n-1 ; j++){
        defArea += degreeToRadian(points[j+1]["Y"] - points[j]["Y"]) * (2 + Math.sin(degreeToRadian(points[j]["X"]))
          + Math.sin(degreeToRadian(points[j+1]["X"])))
    }
    defArea += degreeToRadian(points[n+1]["Y"] - points[0]["Y"]) + (2 + Math.sin(degreeToRadian(points[0]["X"]))
       + Math.sin(degreeToRadian(points[n-1]["X"])));
    
       //Calculates the absolute value of the processed poylgon
    let area = Math.abs(defArea * 6378137 * 6378137/2);

    return area;
}

//you declared the function for degreeToRadin which your using in the above block of code
//you also didnt pass in an argument
function degreeToRadian(degree){
    return (3.14159*degree)/180;
}