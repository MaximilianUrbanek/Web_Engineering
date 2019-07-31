function updateView() {
    var month = document.getElementById("months").value;
    if (month == "jan" || month == "mar" || month == "may" || month == "jul" || month == "aug" || month == "oct" || month == "dec"){
        document.getElementById("31").style.visibility = "visible";
        document.getElementById("30").style.visibility = "visible";
        document.getElementById("29").style.visibility = "visible";
    } else {
        document.getElementById("31").style.visibility = "hidden";
        if (month == "feb"){
            document.getElementById("30").style.visibility = "hidden";
            if (document.getElementById("years").value == "20" || document.getElementById("years").value == "24" || document.getElementById("years").value == "28"){
                document.getElementById("29").style.visibility = "visible";
            } else {
                document.getElementById("29").style.visibility = "hidden";
            }
        } else {
            document.getElementById("30").style.visibility = "visible";
        }
    }
    
}