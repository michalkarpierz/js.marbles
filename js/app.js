var App = App || {};

App.container = $("#container");
App.marbleTypes = {"red": {id:1,html:"<div class=\"marble red\"></div>"},"blue":{id:2,html:"<div class=\"marble blue\"></div>"},"green":{id:3,html:"<div class=\"marble green\"></div>"},"grey":{id:4,html:"<div class=\"marble grey\"></div>"},"orange":{id:5,html:"<div class=\"marble orange\"></div>"},"pink":{id:6,html:"<div class=\"marble pink\"></div>"},"black":{id:7,html:"<div class=\"marble black\"></div>"}};
App.emptyFields = [];
App.marbles = [];
App.selectedField = null;
App.newMarbles = [];

App.RandomFieldId = function() {
    var random = Math.floor((Math.random()*App.emptyFields.length))
        , number = App.emptyFields[random];
    App.emptyFields.splice(random,1);
    return number;
};

App.RandomMarbleType = function() {
    var number = Math.floor((Math.random()*7)+1);
    for(var prop in App.marbleTypes)
    {
        if(App.marbleTypes.hasOwnProperty(prop))
        {
            if(App.marbleTypes[prop].id == number)
                return App.marbleTypes[prop];
        }
    }
};

App.IsFiedFree = function(field) {
    for(var key in App.marbles)
    {
        if(key == field)
            return false;
    }
    return true;
};

App.GetMarbleTypeHtmlById = function(id) {
    for(var prop in App.marbleTypes)
    {
        if(App.marbleTypes.hasOwnProperty(prop))
        {
            if(App.marbleTypes[prop].id == id)
                return App.marbleTypes[prop].html;
        }
    }
};

App.RefreshGameField = function() {
    for(var fieldId in App.marbles)
        $("#"+fieldId).html(App.GetMarbleTypeHtmlById(App.marbles[fieldId])); 
};

App.ClearGameField = function() {
    for(var i=0;i<81;i++)
        $("#"+i).html(""); 
};

App.PutThreeMarblesOnGameField = function() {
    var x = "";
    App.newMarbles = [];
    for(var i=0; i<3;i++)
    {
        var filedId = App.RandomFieldId()
            , marbleType = App.RandomMarbleType();
        App.marbles[filedId] = marbleType.id;
        App.newMarbles.push(filedId);
    }
    App.RefreshGameField();
};

App.DeleteMarbleFromField = function(fieldId) {
    var newArr = [];
    for(var key in App.marbles)
    {
        if(key != fieldId)
            newArr[key] = App.marbles[key];
    }
    App.marbles = newArr;
};

App.GetKeyFromEmptyFieldsArray = function(id) {
    for(var key in App.emptyFields)
    {
        if(App.emptyFields[key] == id)
            return key;
    }
};

App.EdgeNumberWhenCheckingRight = function(key) {
    if(key < 9) return 9;
    else if(key < 18) return 18;
    else if(key < 27) return 27;
    else if(key < 36) return 36;
    else if(key < 45) return 45;
    else if(key < 54) return 54;
    else if(key < 63) return 63;
    else if(key < 72) return 72;
    else return 81;
};

App.EdgeNumberWhenCheckingLeft = function(key) {
    if(key < 9) return -1;
    else if(key < 18) return 8;
    else if(key < 27) return 17;
    else if(key < 36) return 26;
    else if(key < 45) return 35;
    else if(key < 54) return 44;
    else if(key < 63) return 53;
    else if(key < 72) return 62;
    else return 71;
};

App.RemoveFromMarblesArr = function(serie) {
    for(var i=0; i<serie.length; i++)
    {
        App.DeleteMarbleFromField(serie[i]);
        App.emptyFields.push(parseInt(serie[i]));
    }
}

App.RemoveMarbles = function() {
    for(var key in App.marbles)
    {
        var serie = []
            , key = parseInt(key)
            , marbleType = App.marbles[parseInt(key)]
            , down = key + 9
            , right = key + 1
            , slantRight = key + 10
            , slantLeft = key + 8;
        
        serie.push(key);
        
        //check down
        while(down < 81)
        {
            if(App.IsFiedFree(down) == false)
            {
                if(App.marbles[down] == marbleType)
                {
                    serie.push(down);
                    down += 9;
                }
                else
                    break;
            }
            else 
                break;
        }
        
        if(serie.length > 4)
        {
            App.RemoveFromMarblesArr(serie);
            break;
        }
        
        //check right
        while(right < App.EdgeNumberWhenCheckingRight(key))
        {
            if(App.IsFiedFree(right) == false)
            {
                if(App.marbles[right] == marbleType)
                {
                    serie.push(right);
                    right++;
                }
                else
                    break;
            }
            else 
                break;
        }
        
        if(serie.length > 4)
        {
            App.RemoveFromMarblesArr(serie);
            break;
        }
        
        //check slant right
        while(slantRight < 81)
        {
            if(App.IsFiedFree(slantRight) == false)
            {
                if(App.marbles[slantRight] == marbleType)
                {
                    serie.push(slantRight);
                    slantRight += 10;
                }
                else
                    break;
            }
            else 
                break;
        }
        
        if(serie.length > 4)
        {
            App.RemoveFromMarblesArr(serie);
            break;
        }
        
        //check slant left
        while(slantLeft < 81)
        {
            if(App.IsFiedFree(slantLeft) == false)
            {
                if(App.marbles[slantLeft] == marbleType)
                {
                    serie.push(slantLeft);
                    slantLeft += 8;
                }
                else
                    break;
            }
            else 
                break;
        }
        
        if(serie.length > 4)
        {
            App.RemoveFromMarblesArr(serie);
            break;
        }
    }
};

App.Test_ShowArr = function(arr) {
    var x = "";
    var rowLp = 0;
    for(var i=0; i<81; i++)
    {  
        if(arr[i] == -1)
            x += "- ";
        else
            x += arr[i]+" ";

        if(i==8 || i==17 || i==26 || i==35 || i==44 || i==53 || i==62 || i==71 || i==80)
        {
            rowLp++;
            console.log("["+rowLp+"] "+x);
            x = "";
        }
    }
};

App.IsMarbleMovePossible = function(marbleFieldId,targetFieldId) {
    var queue = []
        , arr = App.marbles.slice(0);

    for(var i=0; i<81; i++)
    {
        if(App.IsFiedFree(i))
            arr[i] = -1;
        else
            arr[i] = 'x';
    }

    arr[marbleFieldId] = 0;
    queue.push(marbleFieldId);

    while(queue.length > 0)
    {  
        var field = parseInt(queue[0])
            , fieldUp = field - 9
            , fieldDown = field + 9
            , fieldRight = field + 1
            , fieldLeft = field - 1;

        if(queue.length == 1) 
            queue = [];
        else
            queue = queue.slice(1,queue.length);
  
        if(fieldDown < 81)
        {  
            if(arr[fieldDown] == "-1")
            {
                arr[fieldDown] = parseInt(arr[field]) + 1;
                queue.push(fieldDown);
            }
        }

        if(fieldUp > 0)
        {
            if(arr[fieldUp] == "-1")
            {
                arr[fieldUp] = parseInt(arr[field]) + 1;
                queue.push(fieldUp);
            }
        }
        
        if(fieldRight < App.EdgeNumberWhenCheckingRight(field))
        {
            if(arr[fieldRight] == "-1")
            {
                arr[fieldRight] = parseInt(arr[field]) + 1;
                queue.push(fieldRight);
            }
        }
        
        if(fieldLeft > App.EdgeNumberWhenCheckingLeft(field))
        {
            if(arr[fieldLeft] == "-1")
            {
                arr[fieldLeft] = parseInt(arr[field]) + 1;
                queue.push(fieldLeft);
            }
        }

        if(field == targetFieldId)
        {
            return true;
        }
    }
    return false;
};

App.GenerateFieldsArray = function() {
    for(var i=0;i<81;i++)
        App.emptyFields.push(i);
}();

App.GenerateGameField = function() {
    var innerHtml = ""
        ,counter = 0;
    for(var j=0; j<9; j++)
    {
        for(var i=0; i<9; i++)
        {
            innerHtml += "<div id=\""+counter+"\" class=\"field\" style=\"float:left;margin-right:2px;\"></div>";
            counter++;
        }
    }
    App.container.html(innerHtml);
}();

App.PutThreeMarblesOnGameField();

$(".field").click(function() {
    var isFieldFree = App.IsFiedFree(this.id);
    if(App.selectedField == null)
    {
        if(isFieldFree == false)
        {
            App.selectedField = this.id;
            $("#"+App.selectedField+" .marble").css({"border":"2px solid"});
        }
    }
    else if(App.selectedField == this.id)
    {
        $("#"+App.selectedField+" .marble").css({"border":"none"});
        App.selectedField = null;
    }
    else
    {
        var marbleTypeFrom = App.marbles[App.selectedField]
            , targetFieldId = parseInt(this.id);

        if(isFieldFree && App.IsMarbleMovePossible(App.selectedField,this.id))
        {   
            App.DeleteMarbleFromField(App.selectedField);
            App.marbles[targetFieldId] = marbleTypeFrom;
            App.emptyFields.splice(App.GetKeyFromEmptyFieldsArray(targetFieldId),1);
            App.emptyFields.push(parseInt(App.selectedField));
            App.selectedField = null;
            $("#"+App.selectedField+" .marble").css({"border":"none"});
            App.RemoveMarbles();
            App.PutThreeMarblesOnGameField();
            App.ClearGameField();
            App.RefreshGameField();  
            App.RemoveMarbles();
            App.ClearGameField();
            App.RefreshGameField(); 
        }
    }
});