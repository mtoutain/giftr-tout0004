//app.js
"use strict"

if (document.deviceready) {
    document.addEventlistener('deviceready', init);
} else {
    document.addEventListener('DOMContentLoaded', init)
}


//Global Variables
var peepList = {peeps:[]};
var index = 0;
var currentId = null;
var gifts = [];
var key = "giftr-tout0004";
var localNote = null;

function init(){
 window.addEventListener('push',pageChanged);
//localStorage.clear();
    if(!localStorage.getItem(key)){
    localStorage.setItem(key, JSON.stringify(peepList));
    }
    pageChanged();            
}

function savePeeps(){

    let name = document.getElementById("peepName").value;    
    let dob = document.getElementById("peepDOB").value;

    let newPeep = {
        id: Date.now(),
        fullname: name,
        DOB : dob,
        ideaList: []
    }
    
    peepList.peeps.push(newPeep);
    localStorage.setItem(key,JSON.stringify(peepList));
    
    removeEvents();
    showPeeps();
    hideModal();

}

function showPeeps(){
    
    peepList = JSON.parse(localStorage.getItem(key));
    
    let value = peepList.peeps;
    let ul = document.getElementById("peepList");
    ul.innerHTML=""; 
    
                    //sort through date of birth
    function compare(a, b) {
            if (a.DOB.substring(5) < b.DOB.substring(5)) return -1;
            if (a.DOB.substring(5) > b.DOB.substring(5)) return 1;
            return 0;
    }
    
    peepList.peeps.sort(compare);
                //loop through peepList and create List of peeps
        value.forEach(function(value){
            let name = value.fullname;
            let dob = value.DOB;
            let id = value.id;
       
            let li = document.createElement("li");
                li.className ="table-view-cell peep";
                li.setAttribute("data-id", id);
        
        let a1 = document.createElement("a");
            if(name == ""){
            a1.innerHTML = "Some Person";
            }else{
            a1.innerHTML = name;
            }
            a1.href="#peepsModal";
            a1.addEventListener("touchstart",editPeeps);
       
        let a2 = document.createElement("a");
            a2.className = "navigate-right pull-right";
            a2.href="gifts.html";
            a2.addEventListener("touchstart", giftList);
           
        let span1 = document.createElement("span");
        let span2 = document.createElement("span");
           
            span2.innerHTML = moment(dob).format("MMM Do");
        
            ul.appendChild(li);
            li.appendChild(span1);
            span1.appendChild(a1);
            li.appendChild(a2);
            a2.appendChild(span2);
    });
}

function editPeeps(ev){
   
    let a = ev.currentTarget;
    let span = a.parentElement;
    let peepId = span.parentElement.getAttribute("data-id");
    //console.log(a.parentElement.getAttribute("data-id"));
    //console.log(peepId);
    
    currentId = peepId;
    
     peepList = JSON.parse(localStorage.getItem(key));
    
     let peeps = peepList.peeps;
    
     peeps.forEach(function(peeps){
        if(currentId == peeps.id){
            console.log(currentId);

          let name = peeps.fullname;
          let dob = peeps.DOB;
            console.log(name);
            console.log(dob);
        
            document.getElementById("peepName").value = name;
            document.getElementById("peepDOB").value = dob;  
        }   
    }); 
    
     
    document.querySelector(".btn-negative").style.display="block";
    
    var saveBtn = document.getElementById("saveBtn");
        saveBtn.addEventListener('touchend', saveEditPeeps);
    
    var cancelBtn2 = document.getElementById("cancelBtn2");
        cancelBtn2.addEventListener("touchend", cancelButton);
    var delBtn = document.getElementById("deleteButton");
        delBtn.addEventListener("touchend", deletePeeps)
}

function saveEditPeeps(){
    console.log("test");
    //var saveBtn = document.getElementById("saveBtn");
    let peeps = peepList.peeps;
    
    peeps.forEach(function(peeps){
        if(currentId == peeps.id){
    
        peeps.fullname = document.getElementById("peepName").value;
        peeps.DOB = document.getElementById("peepDOB").value;
      
        localStorage.setItem(key, JSON.stringify(peepList));
       
        showPeeps();
        removeEvents();
        hideModal();
        }
   
    });
}

function deletePeeps(){
    index = -1;
    
    let peeps = peepList.peeps;
    let ul = document.getElementById("peepList");
    let li = document.querySelector("[data-id='"+currentId+"']")
    console.log(li);
    
    for(var i = 0; i < peeps.length; i++){
        //console.log(peeps[i].id.toString());
         if(currentId == peeps[i].id){
            index = i;
             break;
        }
    };
   console.log(index);
    if(index > -1){
        peeps.splice(index, 1);
        
    };
    console.log(localStorage);
    if(peeps.length > -1){
        localStorage.setItem(key, JSON.stringify(peepList));
        console.log("i did it");
   }
    console.log(localStorage);
       if(li.getAttribute("data-id") == currentId){
           console.log("i made it here");
           ul.removeChild(li);
       }
    
    showPeeps();
    removeEvents();
    hideModal();
}


function giftList(ev){
    //ev.preventDefault();
    
    let a = ev.currentTarget;
    let peepId = a.parentElement.getAttribute("data-id");
    
   
    console.log(peepId);
    currentId = peepId;
}

//gift functions
function saveGifts(){
    //get values from form
    let item = document.getElementById("item").value;
    let at = document.getElementById("at").value;
    let cost = document.getElementById("cost").value;
    let url = document.getElementById("url").value;
    
    peepList = JSON.parse(localStorage.getItem(key));
  
    let newIdea = {
        idea: item,
        at: at,
        cost : cost,
        url: url
    }

    peepList.peeps.forEach(function(peep){
        console.log(currentId);
        console.log(peep.id);
        if(currentId == peep.id){
           
           peep.ideaList.push(newIdea);
            
        }
       
    })
    
    localStorage.setItem(key,JSON.stringify(peepList));
    
//clear form
    document.getElementById("item").value = "";
    document.getElementById("at").value = "";
    document.getElementById("cost").value = "";
    document.getElementById("url").value = "";
    
    removeGiftEvents();
    showGifts();
    hideGiftModal();
   
}
function showGifts(){
        
    var gifts= [];
    let h2 = document.getElementById("giftTitle");
        h2.className="giftH2"
    let giftDiv = document.createElement("div");
        giftDiv.className = "noGifts";
        giftDiv.innerHTML = "Add a Gift Idea?";
        
    peepList = JSON.parse(localStorage.getItem(key));
    
    peepList.peeps.forEach(function(peep){
        if(currentId == peep.id){
          gifts = peep.ideaList;
            console.log(title);
        if(peep.fullname == ""){
            h2.innerHTML = "Some Wish List"
        }else{
            h2.innerHTML = peep.fullname +"'s Wish List";
        }
           
    }
    });
    
    //peepList.peeps.fullname + "'s WishList";
    
    let ul = document.getElementById("giftList");
    ul.innerHTML=""; 
    ul.appendChild(giftDiv);
    if(gifts.length == 0){
        giftDiv.style.display = "block";
    }else{
    for(var i= 0; i < gifts.length; i++){

            let what = gifts[i].idea;
            let where = gifts[i].at;
            let cost = gifts[i].cost
            let url = gifts[i].url;
        
            let li = document.createElement("li");
            li.classList = "table-view-cell";
            let a = document.createElement("a");
                a.href = "#giftModal";
            if(what == ""){
                a.innerHTML = "Gift?";
             }else{
                 a.innerHTML = what;
             }
           
            let span = document.createElement("button");
            span.className="btn btn-positive";
            span.innerHTML = "Delete";
            span.addEventListener("touchend",deleteGifts);
        
            let div = document.createElement("div");
            div.className ="giftBox";
        
            let h3 = document.createElement("h3");
            h3.className="giftName";
            //h3.className="pull-left";
           
            h3.addEventListener("touchend",editGifts);
            
            let p1 = document.createElement("p");
            p1.className ="giftLocation";
            p1.innerHTML = where;
           // p1.className = "pull-left";
            let p2 = document.createElement("p");
            p2.className = "giftCost";
            p2.innerHTML = cost;
            //p2.className = "pull-left";
        
            let p3 = document.createElement("a");
            p3.className ="giftUrl";
            p3.href = "https://" + gifts[i].url;
            p3.target = "_blank";
            p3.innerHTML = url;
            //p3.className = "pull-left";
               
            ul.appendChild(li);
            li.appendChild(span);
            li.appendChild(div);
            div.appendChild(h3);
            h3.appendChild(a);
            div.appendChild(p1);
            div.appendChild(p2);
            div.appendChild(p3);   
    }
    }
}

function editGifts(ev){
   //var gifts = [];
   //var index = 0;
        let peeps = peepList.peeps;
        let li = ev.currentTarget.parentElement;
        let giftName = li.querySelector("a").textContent;
        console.log(giftName);
    
   peepList.peeps.forEach(function(peep){
        if(currentId == peep.id){
          gifts = peep.ideaList; 
            console.log(gifts);
        }
    });
    
        for(var i= 0; i < gifts.length; i++){
            if(gifts[i].idea == giftName){
            index = i;
          //console.log(index);
            break;
            }
        }
 
    
    let idea = gifts[index].idea;
    let at = gifts[index].at;
    let cost = gifts[index].cost;
    let url = gifts[index].url;

    document.getElementById("item").value = idea;
    document.getElementById("at").value = at;
    document.getElementById("cost").value = cost;
    document.getElementById("url").value = url;
    
    let saveGiftBtn = document.getElementById("saveGiftBtn");
     saveGiftBtn.addEventListener("touchend",saveEditGifts);
    let cancelGiftBtn1 = document.getElementById("cancelGiftBtn1");
     cancelGiftBtn1.addEventListener("touchend",removeGiftEvents);
    let cancelGiftBtn2 = document.getElementById("cancelGiftBtn2");
     cancelGiftBtn2.addEventListener("touchend",cancelGiftButton); 
}
function saveEditGifts(){

    gifts[index].idea = document.getElementById("item").value;
    gifts[index].at = document.getElementById("at").value;
    gifts[index].cost = document.getElementById("cost").value;
    gifts[index].url = document.getElementById("url").value;
    
    localStorage.setItem(key, JSON.stringify(peepList));
    
    showGifts();
    removeGiftEvents();
    hideGiftModal();
}
function deleteGifts(ev){
        let delBtn = document.querySelector("btn-positive");
        var gifts= [];

    peepList.peeps.forEach(function(peep){
        if(currentId == peep.id){
          gifts = peep.ideaList;  
        }
    });
    
        let li = ev.currentTarget.parentElement;
        let giftIdea = li.querySelector("h3").textContent;
        index = -1;
        for (let i = 0; i < gifts.length; i++) {
            console.log(gifts[i]);
            if (gifts[i].idea == giftIdea) {
                index = i;
                break; 
            }
        }
        console.log(index);
        if (index > -1) {
            gifts.splice(index, 1);
        }
        li.parentElement.removeChild(li);
        if (gifts.length > -1) {
         
         localStorage.setItem(key, JSON.stringify(peepList));
         delBtn.removeEventListener("touchend", deleteGifts);
       
            showGifts();
            removeGiftEvents();
    }
}

function addEvents(){
//add event listeners to modal window
    var saveBtn = document.getElementById("saveBtn");
        saveBtn.addEventListener('touchend', savePeeps);
          
    var cancelBtn1 = document.getElementById("cancelBtn1");
        cancelBtn1.addEventListener('touchend', removeEvents);
    
    var cancelBtn2 = document.getElementById("cancelBtn2");
        cancelBtn2.addEventListener("touchend", cancelButton);
    
    console.log("events added!");
}
function addGiftEvents(){
 
 let saveGiftBtn = document.getElementById("saveGiftBtn");
     saveGiftBtn.addEventListener("touchend",saveGifts);

    
 let cancelGiftBtn1 = document.getElementById("cancelGiftBtn1");
     cancelGiftBtn1.addEventListener("touchend",removeGiftEvents);
   
 let cancelGiftBtn2 = document.getElementById("cancelGiftBtn2");
     cancelGiftBtn2.addEventListener("touchend",cancelGiftButton);
    
     
   
    
 console.log("added");
}

function removeEvents(){
    
    let saveBtn = document.getElementById("saveBtn");
        saveBtn.removeEventListener('touchend',savePeeps);
        saveBtn.removeEventListener('touchend',saveEditPeeps);
        saveBtn.removeEventListener('touchend', hideModal);
    let cancelBtn1 = document.getElementById("cancelBtn1");
        cancelBtn1.removeEventListener('touchstart', removeEvents);
    let cancelBtn2 = document.getElementById("cancelBtn2");
        cancelBtn2.removeEventListener("touchend", removeEvents)
        cancelBtn2.removeEventListener("touchend", hideModal)
        
    document.getElementById("peepName").value="";
    document.getElementById("peepDOB").value="";
    
    var delBtn = document.getElementById("deleteButton");
        delBtn.addEventListener("touchend", deletePeeps);
    
    document.querySelector(".btn-negative").style.display="none";
        
    
}
function removeGiftEvents(){
 let saveGiftBtn = document.getElementById("saveGiftBtn");
     saveGiftBtn.removeEventListener("touchend",saveGifts);
     saveGiftBtn.removeEventListener("touchend",saveEditGifts);
     
 let cancelGiftBtn1 = document.getElementById("cancelGiftBtn1");
     cancelGiftBtn1.removeEventListener("touchend",removeGiftEvents);
 let cancelGiftBtn2 = document.getElementById("cancelGiftBtn2");
     cancelGiftBtn2.removeEventListener("touchend",cancelGiftButton);
     
    
    document.getElementById("item").value ="";
    document.getElementById("at").value ="";
    document.getElementById("cost").value="";
    document.getElementById("url").value="";
    console.log("events Removed");
      
}

function pageChanged(){
    var addPeepBtn = document.getElementById("addPeepBtn");
    var addGiftBtn = document.getElementById("addGiftBtn");
    
    if(document.getElementById("peepList")){
       
            addPeepBtn.addEventListener('touchend', addEvents);
            showPeeps();

            console.log("page one");
        }
        else if(document.getElementById("giftList")){
             
             //addPeepBtn.removeEventListener('touchend',addEvents);
             addGiftBtn.addEventListener("touchend", addGiftEvents);
        
            showGifts();
            console.log("page two");
            
        }             
}
function hideModal(){
    let peepForm = document.querySelector("#peepsModal");
        peepForm.classList.toggle("active");
    console.log("hidden");
}
function hideGiftModal(){
    let giftForm = document.querySelector("#giftModal");
        giftForm.classList.toggle("active");
}
function cancelButton(){
    removeEvents();
    hideModal();
}
function cancelGiftButton(){
    removeGiftEvents();
    hideGiftModal
}


