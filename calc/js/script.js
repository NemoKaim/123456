function input(){  
    document.getElementById("text").value+=document.getElementById(event.target.id).innerHTML;
}
function answer(){
    document.getElementById("text").value+="="+eval(document.getElementById("text").value)
}
function cleear(){
    document.getElementById("text").value = ""; 
}