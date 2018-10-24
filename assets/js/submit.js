//TODO Fill these in when the site should go live again.
const TABLE_ID = "";
const TABLE_NAME = "";
const API_KEY = "";
const redirectUri = "";

var inputs = document.querySelectorAll(".reg-input");

inputs.forEach(function (input) {
    input.addEventListener("keyup", ev => validate(input));
    inputs.forEach(function (input) {
        $(input).removeClass("invalid");
    });
});

function validate(input) {
    // Validation checking
    var emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    var phoneRegex = /((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/;
    if (input.id !== "emailInput" && input.id !== "phoneInput" && input.id !== "emergencyContactPhoneInput" && input.id !== "genderSelect") {
        if (!input.value) {
            $(input).addClass("invalid");
            return false;
        }
        else {
            $(input).removeClass("invalid");
            return true;
        }
    }
    else if (input.id === "emailInput") {
        if (!input.value.match(emailRegex)) {
            $(input).addClass("invalid");
            return false;
        }
        else {
            if (checkForPreviousSignUp(input.value)) {
                alert("That email has already been used. Please use a different email.");
                $(input).addClass("invalid");
                return false;
            } else {
                $(input).removeClass("invalid");
                return true;
            }
        }
    }
    else if (input.id === "phoneInput" || input.id === "emergencyContactPhoneInput") {
        if (!input.value.match(phoneRegex)) {
            $(input).addClass("invalid");
            return false;
        }
        else {
            $(input).removeClass("invalid");
            return true;
        }

    }
    else if (input.id === "genderSelect") {
        if (input.value === "default") {
            $(input).addClass("invalid");
            return false;
        }
        else {
            $(input).removeClass("invalid");
            return true;
        }
    }
}

function checkForPreviousSignUp(value) {
    var exists = false;
    $.ajax({
        type: "GET",
        url: "https://api.airtable.com/v0/" + TABLE_ID + "/" + TABLE_NAME + "?view=Grid%20view",
        dataType: "text",
        beforeSend: function(xhr, settings) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + API_KEY);
        },
        async: false,
        success: function (data) {
            data = JSON.parse(data);
            // document.getElementById('disclaimer').innerHTML = config.DISCLAIMER;
            data.records.forEach(function (record) {
                if (record.fields.Email === value) exists = true;
            });
        }
    });
    return exists;
}

function submit() {
    var inputs = document.querySelectorAll(".reg-input");

    var valid = true;
    inputs.forEach(function (input) {
        if (!validate(input)) {
            valid = false;
        }
    });
    if (!valid) {
        alert("Correct issues and try again");
        return;
    }

    var regData = {
        "fields": {
            "FirstName": inputs[0].value,
            "LastName": inputs[1].value,
            "Email": inputs[2].value,
            "Phone": stripPhoneNumber(inputs[3].value),
            "Gender": inputs[4].value,
            "EmergencyFirstName": inputs[5].value,
            "EmergencyLastName": inputs[6].value,
            "EmergencyPhone": stripPhoneNumber(inputs[7].value)
        }
    };
    $.ajax({
        type: "POST",
        url: "https://api.airtable.com/v0/" + TABLE_ID + "/" + TABLE_NAME,
        contentType: "application/json",
        data: JSON.stringify(regData),
        beforeSend: function(xhr, settings) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + API_KEY);
        },
        success: function (data) {
            window.location = redirectUri;
        },
        error: function () {
            alert("Something went wrong. Try again later, or contact the developer, below.")
        }
    });
    //Redirect to
}

function stripPhoneNumber(phoneNumber) {
    return phoneNumber.split(/\(|\)|\s|\-/).join("");
}

function showWaiver() {
    PDFObject.embed("../../waiver.pdf", "#waiverPDF");
    if (document.getElementById("waiverPDF").childNodes[0].tagName === "P") {
        document.getElementById("waiverPDF").childNodes[0].innerHTML = "This browser does not support inline PDFs. Please use the above download button to view it.";
        document.getElementById("waiverPDF").style.height = "fit-content";
    }
    $("#waiverPDF").css('display', 'block');
}