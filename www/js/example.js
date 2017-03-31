for(var i = 0; i <data.movies.length; i++){
    var a = document.createElement("a");
    a.href = " "
    a.setAttriubte("data-movie", data.movies[i].id);
    a.addEventListener('touchstart',function(ev){
        var anchor = ev.currentTarget;
        currentId = anchor.getAttribute("data-movie");
        
        //if modal for edit
            // loop through id's
            // if modl for currentId
            // add details to modal form
    });
}