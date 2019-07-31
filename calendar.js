function update() {
    var month = document.getElementById("months").value;
    if (month == "jan" || month == "mar" || month == "may" || month == "jul" || month == "aug" || month == "oct" || month == "dec"){
        document.getElementById("ed").style.visibility = "visible";
    } else {
        document.getElementById("ed").style.visibility = "hidden";
    }
}