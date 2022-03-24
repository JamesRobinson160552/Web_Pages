var adjective, animal, name, size, town, food, number, emotion, price, total, story;


function showPage2(){
	document.getElementById("first_field").style.display = "none";
	document.getElementById("second_field").style.display = "block";
}

function showPage3(){
	document.getElementById("second_field").style.display = "none";
	document.getElementById("third_field").style.display = "block";
}

function showPage4(){
	document.getElementById("third_field").style.display = "none";
	document.getElementById("fourth_field").style.display = "block";
}

function showPage5(){
	document.getElementById("fourth_field").style.display = "none";
	document.getElementById("fifth_field").style.display = "block";
}

function showPage6(){
	document.getElementById("fifth_field").style.display = "none";
	document.getElementById("sixth_field").style.display = "block";
}

function showPage7(){
	document.getElementById("sixth_field").style.display = "none";
	document.getElementById("seventh_field").style.display = "block";
}

function showPage8(){
	document.getElementById("seventh_field").style.display = "none";
	document.getElementById("eigth_field").style.display = "block";
}

function showPage9(){
	document.getElementById("eigth_field").style.display = "none";
	document.getElementById("ninth_field").style.display = "block";
}

function makeStory(){
	document.getElementById("ninth_field").style.display = "none";
	story = "This is the story of a "+adjective+" "+animal+" named "+name;
	story += ". "+name+" lived in a "+size+" house in a town called ";
	story += silly_name+" which was famous for its freshly-made "+food+"s. ";
	story += name+" ate "+number+" "+food+"s for breakfast each day and felt ";
	story += emotion+". A "+food+" cost $"+price+" so "+name+" could buy a ";
	story += "week's supply for $"+(7*number*price)+".";
	document.getElementById("story").innerHTML = story;
	document.getElementById("story").style.display = "block";
}

function inputCheck(userInput){
	//Checks that the user has entered input
	if(userInput!=undefined){
		return true;
	}
	else{
		alert("You must enter something!");
		return false;
	}
}

function numberCheck(userInput){
	//Checks if the user has entered a number
	if(!isNaN(userInput)){
		return true;
	}
	else{
		alert("This field requires a number");
		return false;
	}
}

function wordCheck(userInput){
	//Checks if the user has entered a string
	if(isNaN(userInput) && userInput != ""){
		return true;
	}
	else{
		alert("This field requires a String");
		return false;
	}
}

function nameSubmit(){
	name = document.getElementById("name").value;
	if(wordCheck(name)){
		//console.log(name);
		showPage2();
	}
}

function adjectiveSubmit(){
	adjective = document.getElementById("adjective").value;
	if(wordCheck(adjective)){
		showPage3();
	}
}

function animalSubmit(){
	animal = document.getElementById("animal").value;
	if(wordCheck(animal)){
		showPage4();
	}
}

function sillySubmit(){
	silly_name = document.getElementById("silly_name").value;
	if(wordCheck(silly_name)){
		showPage5();
	}
}

function foodSubmit(){
	food = document.getElementById("food").value;
	if(wordCheck(food)){
		showPage6();
	}
}

function numberSubmit(){
	number = document.getElementById("number").value;
	if(numberCheck(number)){
		showPage7();
	}
}

function emotionSubmit(){
	emotion = document.getElementById("emotion").value;
	if(wordCheck(emotion)){
		showPage8();
	}
}

function priceSubmit(){
	price = document.getElementById("price").value;
	if(numberCheck(price)){
		showPage9();
	}
}

function sizeSubmit(){
	if(document.getElementById("big").checked){
		size = "big";
		makeStory();
	}
	else if(document.getElementById("small").checked){
		size = "small";
		makeStory();
	}
	else{
		alert("Please select a value");
	}
}


