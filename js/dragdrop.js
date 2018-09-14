'use strict';
/*
_____                                 _
|  __ \                    ___        | |
| |  | |_ __ __ _  __ _   ( _ )     __| |_ __ ___  _ __
| |  | | '__/ _` |/ _` |  / _ \/\  / _` | '__/ _ \| '_ \
| |__| | | | (_| | (_| | | (_>  < | (_| | | | (_) | |_) |
|_____/|_|  \__,_|\__, |  \___/\/  \__,_|_|  \___/| .__/
                   __/ |                          | |
                  |___/                           |_|
Version : 1.0
Modified Date : 13th Sep 2018
*/



const DragDrop =class dragdrop{
	
	
	constructor(selector){
		
		this.mainContainer=document.querySelector(selector);
		this.setEventListener();
		this.droppedIn="";
		
		
	}

	get dragStatus(){
		return false;
	}
	set dragStatus(val){
		return val;
	}

	get taskID(){
		return;
	}
	
	trackAllID(droppedIn) {
		console.log(droppedIn);
		
		let container = document.querySelector("div[data-name='" + droppedIn + "']");
		console.log(container);
		let allID = container.querySelectorAll('div.card');
		let tasksID = [];
		let i = 0;

		while (i < allID.length) {
			tasksID.push(allID[i].dataset.id);
			i++;
		}

		return tasksID;
		
	}
	drop(){
		
	}
	dropBox(e){
		
		
		e.stopPropagation();
		
		let dataType = e.dataTransfer.getData("type");
		let dataid = e.dataTransfer.getData("id");
		
		// Assign value of droppedIn
		if (e.currentTarget.dataset.type == "item") {
			this.droppedIn = e.currentTarget.parentElement.dataset.name;
		} else {
			this.droppedIn = e.currentTarget.dataset.name;
		}
		console.log(this.droppedIn);
		
		if (dataType == "item") {
			let data = e.dataTransfer.getData("text/html");
			let address = e.dataTransfer.getData("address");
			let parentEle = e.currentTarget.parentElement;
			// if both are item then sorting
			
			if (e.currentTarget.parentElement.dataset.type == "origin" && address == "container") {
				console.log("You can not palace this item");
			} else {
				console.log(e.currentTarget);
				
				if (e.currentTarget.dataset.type == "item") {
					// Sorting

					let dragEle = this.mainContainer.querySelector("div[data-id='" + dataid + "']");

					if (dragEle.parentElement == e.currentTarget.parentElement) {
						parentEle.insertBefore(dragEle, e.currentTarget);
						dragEle.classList.remove('dragStart');

						//Sorting in own container
						console.log(dataid);
						console.log('sorting in own container');


					} else {
						parentEle.insertBefore(dragEle, e.currentTarget);
						dragEle.classList.remove('dragStart');

						//migrate to another container and sort
						console.log(trackAllID(this.droppedIn));
						console.log(dataid);
						console.log('migrate to another conatiner');
					}
					dragStatus = "dropped";
					// }
				} else {
					// Migrating
					
					let dragEle = this.mainContainer.querySelector("div[data-id='" + dataid + "']");

					if (dragEle.parentElement.dataset.type == e.currentTarget.dataset.type || dragEle.parentElement.dataset.type == "origin") {

						if (dragEle.parentElement != e.currentTarget) {
							console.log("Pure Migrate another Container")
						} else {
							console.log("Sorting on at last");
						}
						console.log(this.droppedIn);
						this.trackAllID(this.droppedIn);
						//this.trackAllID.push(parseInt(dataid));
							e.currentTarget.appendChild(dragEle);
							dragEle.classList.remove('dragStart');
							this.dragStatus = "dropped";
							console.log(this.trackAllID(this.droppedIn));
					   
					} else {
						console.log("Activity : zzzz");
					}
				}
				e.currentTarget.classList.remove('dragging');
			}
			
			} 
			
	}
	dragEnterBox(e){
		console.log("Drag Enter Box");
		
		let data = e.dataTransfer.getData("text/html");
		
		let myindex = Array.from(e.currentTarget.parentNode.children).indexOf(e.currentTarget);
		if (e.currentTarget.dataset.type == "container") {
			e.currentTarget.classList.add('dragging');
		}
		this.dragStatus = "dragEnter";
	}
	dragLeaveBox(e){
		console.log("Drag Leave Box");
		let data = e.dataTransfer.getData("text");
		e.currentTarget.classList.remove('dragging');
	}
	dragOverBox(e){
		console.log('Drag Over Box');
		let myindex = Array.from(e.currentTarget.parentNode.children).indexOf(e.currentTarget);
		e.currentTarget.classList.add('dragging');
		this.dragStatus = "dragOver";
		e.preventDefault();
		
	}
	dragStartBox(e){
		console.log('dropStartBox:Start');
		e.dataTransfer.setData("text/html", e.currentTarget.innerHTML);
		e.dataTransfer.setData("type", "item");
		e.dataTransfer.setData("address", e.currentTarget.parentElement.dataset.type);
		e.dataTransfer.setData("id", e.currentTarget.dataset.id);
		console.log(e.currentTarget);
		e.currentTarget.classList.add('dragStart');
		this.dragStatus="start";
		console.log('dropStartBox:End');
		this.setEventListener;
	}
	dragEndBox(e){
		 console.log('dragEndBox');
		if (this.dragStatus == "dropped") {
			let parentEle = document.querySelector("div[data-name='" + droppedIn + "']");
			let allTasks = parentEle.querySelectorAll('.card');


		} else {
			console.log(e);
			e.currentTarget.classList.remove('dragStart');
			e.currentTarget.classList.remove('dragging');
		}
	   
		this.setEventListener;
	}
	
	clickContainer(){
		console.log("It is been clicked");
	}
	toggleEle(e) {
		
		let patt = /d-none/;
		let cardBody = e.currentTarget.querySelectorAll('.card-body');
		let str = cardBody[0].className;
		let isMatch = patt.test(str);
		if (isMatch == true) {
			cardBody[0].classList.remove('d-none');
		} else {
			cardBody[0].classList.add('d-none');
		}
	}
	setEventListener() {

		let allEle = document.querySelectorAll('.ele');
		let i = 0;
				
		while (i < allEle.length) {
			allEle[i].addEventListener("drop", this.dropBox.bind(this), false);
			allEle[i].addEventListener("dragenter", this.dragEnterBox, false);
			allEle[i].addEventListener("dragleave", this.dragLeaveBox, false);
			allEle[i].addEventListener("dragover", this.dragOverBox, false);
			allEle[i].addEventListener("dragstart", this.dragStartBox, false);
			allEle[i].addEventListener("dragend", this.dragEndBox, false);
			allEle[i].addEventListener("click", this.toggleEle, false);
			i++;
		}
		
		let allEles = document.querySelectorAll('.dragContainer');

		
		let j = 0;
		while (j < allEles.length) {

			allEles[j].addEventListener("drop", this.dropBox.bind(this), false);
			allEles[j].addEventListener("dragenter", this.dragEnterBox, false);
			allEles[j].addEventListener("dragleave", this.dragLeaveBox, false);
			allEles[j].addEventListener("dragover", this.dragOverBox, false);
			allEles[j].addEventListener("click", this.clickContainer, false);
			

		j++;
		}

		

	}
	
	
}	




/*

let dragStatus = false;
let droppedIn = "";
let tasksID;
let mainContainer = document.querySelector('.mainContainer');



function trackAllID(droppedIn) {
    let container = document.querySelector("div[data-name='" + droppedIn + "']");
    console.log(container);
    let allID = container.querySelectorAll('div.card');
    tasksID = [];
    let i = 0;

    while (i < allID.length) {
        //tasksID.push(allID[i].dataset.id);
        tasksID.push(allID[i].dataset.id);
        i++;
    }

    return tasksID;

}

function dropBox(e) {

    e.stopPropagation();
    let dataType = e.dataTransfer.getData("type");
    let dataid = e.dataTransfer.getData("id");

    if (e.currentTarget.dataset.type == "item") {
        droppedIn = e.currentTarget.parentElement.dataset.name;
    } else {
        droppedIn = e.currentTarget.dataset.name;
    }

    if (dataType == "item") {
        let data = e.dataTransfer.getData("text/html");
        let address = e.dataTransfer.getData("address");
        let parentEle = e.currentTarget.parentElement;
        // if both are item then sorting
        if (e.currentTarget.parentElement.dataset.type == "origin" && address == "container") {
            console.log("You can not palace this item");
        } else {
            console.log(e.currentTarget);
            if (e.currentTarget.dataset.type == "item") {
                // Sorting

                let dragEle = mainContainer.querySelector("div[data-id='" + dataid + "']");

                if (dragEle.parentElement == e.currentTarget.parentElement) {
                    parentEle.insertBefore(dragEle, e.currentTarget);
                    dragEle.classList.remove('dragStart');

                    //Sorting in own container
                    console.log(dataid);
                    console.log('sorting in own container');


                } else {
                    parentEle.insertBefore(dragEle, e.currentTarget);
                    dragEle.classList.remove('dragStart');

                    //migrate to another container and sort
                    console.log(trackAllID(droppedIn));
                    console.log(dataid);
                    console.log('migrate to another conatiner');
                }
				dragStatus = "dropped";
                // }
            } else {
                // Migrating
                let dragEle = mainContainer.querySelector("div[data-id='" + dataid + "']");

                if (dragEle.parentElement.dataset.type == e.currentTarget.dataset.type || dragEle.parentElement.dataset.type == "origin") {

                    if (dragEle.parentElement != e.currentTarget) {
                        console.log("Pure Migrate another Container")
                    } else {
                        console.log("Sorting on at last");
                    }
                    let allIDs = trackAllID(droppedIn);
                    allIDs.push(parseInt(dataid));
                        e.currentTarget.appendChild(dragEle);
                        dragEle.classList.remove('dragStart');
                        dragStatus = "dropped";
                        console.log(trackAllID(droppedIn));
                   
                } else {
                    console.log("Activity : zzzz");
                }
            }
            e.currentTarget.classList.remove('dragging');
        }
    }
    //  event.preventDefault();
}

function dragEnterBox(e) {
    console.log("Drag Enter Box");
    let data = e.dataTransfer.getData("text/html");
    
    dragStatus = "dragenter";
    let myindex = Array.from(e.currentTarget.parentNode.children).indexOf(e.currentTarget);
    
    if (e.currentTarget.dataset.type == "container") {
        e.currentTarget.classList.add('dragging');
    }
    dragStatus = "dragEnter";


}

function dragLeaveBox(e) {
    let data = e.dataTransfer.getData("text");
    e.currentTarget.classList.remove('dragging');
}

function dragOverBox(e) {
    
    let blankEle = document.createElement('div');
    let myindex = Array.from(e.currentTarget.parentNode.children).indexOf(e.currentTarget);
    e.currentTarget.classList.add('dragging');
    dragStatus = "dragOver";
    e.preventDefault();

}

function dragStartBox(e) {
    console.log('dropStartBox:Start');

    e.dataTransfer.setData("text/html", e.currentTarget.innerHTML);
    e.dataTransfer.setData("type", "item");
    e.dataTransfer.setData("address", e.currentTarget.parentElement.dataset.type);
    e.dataTransfer.setData("id", e.currentTarget.dataset.id);
    console.log(e.currentTarget);
    e.currentTarget.classList.add('dragStart');
    dragStatus = "start";
    console.log('dropStartBox:End');
    setEventListener();

}

function dragEndBox(e) {
    console.log('dragEndBox');
    if (dragStatus == "dropped") {
        let parentEle = document.querySelector("div[data-name='" + droppedIn + "']");
        let allTasks = parentEle.querySelectorAll('.card');


    } else {
        //console.log(e.currentTarget);
        //console.log(e.fromElement);
        console.log(e);
        e.currentTarget.classList.remove('dragStart');
        e.currentTarget.classList.remove('dragging');
    }
    //let data = e.dataTransfer.getData("text");
    setEventListener();

}

function toggleEle(e) {
    console.log(e.currentTarget);
    let patt = /d-none/;
    let cardBody = e.currentTarget.querySelectorAll('.card-body');
    let str = cardBody[0].className;
    let isMatch = patt.test(str);
    if (isMatch == true) {
        cardBody[0].classList.remove('d-none');
    } else {
        cardBody[0].classList.add('d-none');
    }
}

function clickContainer() {
    console.log("It is been clicked");
}

function setEventListener() {

    let allEle = document.querySelectorAll('.ele');
    console.log("Total Ele :" + allEle.length);
    let i = 0;
    while (i < allEle.length) {
        allEle[i].addEventListener("drop", dropBox, false);
        allEle[i].addEventListener("dragenter", dragEnterBox, false);
        allEle[i].addEventListener("dragleave", dragLeaveBox, false);
        allEle[i].addEventListener("dragover", dragOverBox, false);
        allEle[i].addEventListener("dragstart", dragStartBox, false);
        allEle[i].addEventListener("dragend", dragEndBox, false);
        allEle[i].addEventListener("click", toggleEle, false);
        i++;
    }


    let allEles = document.querySelectorAll('.dragContainer');

    console.log("Total Container Ele :" + allEles.length);
    let j = 0;
    while (j < allEles.length) {

        allEles[j].addEventListener("drop", dropBox, false);
        allEles[j].addEventListener("dragenter", dragEnterBox, false);
        allEles[j].addEventListener("dragleave", dragLeaveBox, false);
        allEles[j].addEventListener("dragover", dragOverBox, false);
        allEles[j].addEventListener("click", clickContainer, false);
        // allEles[j].addEventListener("dragstart", dragStartBox, false);
        // allEles[j].addEventListener("dragend", dragEndBox, false);

        j++;
    }

}
setEventListener();
*/
