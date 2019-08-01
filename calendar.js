function updateView() {
    var month = document.getElementById("months").value;
    var year = document.getElementById("years").value;
    if (month == "January" || month == "March" || month == "May" || month == "July" || month == "August" || month == "October" || month == "December"){
        document.getElementById("31").style.visibility = "visible";
        document.getElementById("30").style.visibility = "visible";
        document.getElementById("29").style.visibility = "visible";
    } else {
        document.getElementById("31").style.visibility = "hidden";
        if (month == "February"){
            document.getElementById("30").style.visibility = "hidden";
            if (year == "2020" || year == "2024" || year == "2028"){
                document.getElementById("29").style.visibility = "visible";
            } else {
                document.getElementById("29").style.visibility = "hidden";
            }
        } else {
            document.getElementById("30").style.visibility = "visible";
        }
    }
}

function dayclick(day) {
    var month = document.getElementById("months").value;
    var year = document.getElementById("years").value;
    var listel = document.getElementById("days").getElementsByTagName("LI");
    for (var i = 0; i < listel.length; i++) {
        listel[i].style.backgroundColor = "rgb(187, 164, 174)";
    }
    document.getElementById(day).style.backgroundColor = "rgb(132,89,107)";

    document.getElementById("chheading").innerHTML = "Events on " + month + " " + day + ", " + year + ":";
    document.getElementById("changeback").style.visibility = "visible";
}

function changeback() {
    var listel = document.getElementById("days").getElementsByTagName("LI");
    for (var i = 0; i < listel.length; i++) {
        listel[i].style.backgroundColor = "rgb(187, 164, 174)";
    }
    document.getElementById("chheading").innerHTML = "Future Events";
    document.getElementById("changeback").style.visibility = "hidden";
}