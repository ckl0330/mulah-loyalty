// Page 1: Check Phone Number
function checkPhone() {
    let phone = document.getElementById("phone").value;

    // Validate that input contains only numbers
    if (!/^\d+$/.test(phone)) {
        alert("Please enter numbers only");
        return;
    }

    // Validate phone number length (typical Malaysian mobile numbers are 9-10 digits)
    if (phone.length < 9) {
        alert("Please enter a valid mobile number");
        return;
    }

    let fullPhone = "+60" + phone;

    // Check if the phone number matches the allowed loyalty number
    if (fullPhone === "+60173527250") {
        localStorage.setItem("phone", fullPhone);
        window.location.href = "page2.html";
    } else {
        alert("Invalid loyalty number. Please check your number and try again.");
    }
}

// Page 2: Save User Details
function saveDetails() {
    let name = document.getElementById("name").value.trim();
    let dd = document.getElementById("dd").value.trim();
    let mm = document.getElementById("mm").value.trim();
    let yyyy = document.getElementById("yyyy").value.trim();
    let email = document.getElementById("email").value.trim();
    let noEmail = document.getElementById("noEmail").checked;

    let isValid = true;

    // Hide all error messages first
    document.querySelectorAll('.error').forEach(error => {
        error.style.display = 'none';
    });

    // Validate Name - just check if not empty
    if (name === "") {
        document.getElementById("nameError").style.display = 'block';
        isValid = false;
    }

    // Validate Birthday - just check if all fields are filled
    if (dd === "" || mm === "" || yyyy === "") {
        document.getElementById("birthdayError").style.display = 'block';
        isValid = false;
    }

    // Validate Email (only if "No email address" is not checked)
    if (!noEmail && email === "") {
        document.getElementById("emailError").style.display = 'block';
        isValid = false;
    }
    
    // If "No email address" is checked, set email to a placeholder
    if (noEmail) {
        email = "No email provided";
    }

    // If all validations pass, save data and proceed
    if (isValid) {
        let birthday = dd + "/" + mm + "/" + yyyy;

        localStorage.setItem("name", name);
        localStorage.setItem("birthday", birthday);
        localStorage.setItem("email", email);

        window.location.href = "page3.html";
    }
}

// Page 3: Display Saved Data
function displayData() {
    // Retrieve data from localStorage
    let phone = localStorage.getItem("phone") || "Not provided";
    let name = localStorage.getItem("name") || "Not provided";
    let birthday = localStorage.getItem("birthday") || "Not provided";
    let email = localStorage.getItem("email") || "Not provided";

    // Display the data
    document.getElementById("phoneDisplay").textContent = phone;
    document.getElementById("nameDisplay").textContent = name;
    document.getElementById("birthdayDisplay").textContent = birthday;
    document.getElementById("emailDisplay").textContent = email;
}

// Function to go back to home page
function goBack() {
    // Clear localStorage if desired
    if (confirm("Do you want to clear your data and return to the home page?")) {
        localStorage.clear();
        window.location.href = "page1.html";
    }
}

// Page 2: Toggle email input based on checkbox
if (document.getElementById("noEmail")) {
    document.getElementById("noEmail").addEventListener("change", function() {
        let emailInput = document.getElementById("email");
        if (this.checked) {
            emailInput.disabled = true;
            emailInput.style.backgroundColor = "#f5f5f5";
            emailInput.value = "";
        } else {
            emailInput.disabled = false;
            emailInput.style.backgroundColor = "#fff";
        }
    });
}

// Auto-format phone input on Page 1
if (document.getElementById("phone")) {
    document.getElementById("phone").addEventListener("input", function(e) {
        // Remove non-numeric characters
        this.value = this.value.replace(/\D/g, '');
        
        // Update check icon color when valid number is entered
        let checkIcon = document.querySelector('.check-icon');
        if (this.value.length >= 9) {
            checkIcon.style.color = '#4CAF50';
        } else {
            checkIcon.style.color = '#ccc';
        }
    });
}

// Auto-tab functionality for birthday fields on Page 2
if (document.getElementById("dd")) {
    document.getElementById("dd").addEventListener("input", function() {
        if (this.value.length === 2) {
            document.getElementById("mm").focus();
        }
    });

    document.getElementById("mm").addEventListener("input", function() {
        if (this.value.length === 2) {
            document.getElementById("yyyy").focus();
        }
    });

    // Allow only numbers in birthday fields
    document.querySelectorAll('.birthday input').forEach(input => {
        input.addEventListener("input", function() {
            this.value = this.value.replace(/\D/g, '');
        });
    });
}