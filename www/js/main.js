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

function savePeeps(){

 //get values from form
    let name = document.getElementById("peepName").value;    
    let dob = document.getElementById("peepDOB").value;
//create contact for local storage
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

}