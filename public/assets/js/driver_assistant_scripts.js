const checkBox = document.getElementById("set-availability");
console.log(checkBox);

function toggle() {
    console.log("here");
    var text1 = document.getElementById("text1");
    var text2 = document.getElementById("text2");
    if (checkBox.checked == true) {
        text1.style.display = "block";
        text2.style.display = "none";
    } else {
        text1.style.display = "none";
        text2.style.display = "block";
    }

}

$(document).ready(function(event){
    $.ajax({
        url: "/driver-assistants/getAvailability",
        type: "GET",
    })
        .done(function(result){
            checkBox.checked = result ? true : false;
            
        })
        .fail(function(err){
            console.log(err);
        });
});

$(checkBox).on('change', function(event){
    event.preventDefault();
    event.stopPropagation();

    data = {
        availability: checkBox.checked ? 1 : 0,
    }

    $.ajax({
        url: "/driver-assistants/updateAvailability",
        type: "POST",
        data: data,
    })
        .done(function(result){
            console.log(result);
            
        })
        .fail(function(err){
            console.log(err);
        });
});

