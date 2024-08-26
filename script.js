document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const nextBtn = form.querySelector(".nextBtn");
  const backBtn = form.querySelector(".backBtn");
  const formFirst = document.querySelector(".form.first");
  const allRequiredFields = formFirst.querySelectorAll(
    "input[required], select[required]"
  );

  nextBtn.addEventListener("click", function (event) {
    // Get the value of the "Name" field
    let nameValue = document
      .querySelector('input[name="Customer Name"]')
      .value.trim();
    // Correct the format of the name (capitalize each first letter)
    let correctedName = nameValue
      .toLowerCase()
      .replace(/\b\w/g, function (char) {
        return char.toUpperCase();
      });
    // Set the corrected name value to the hidden "CustomerName" field
    document.getElementById("customer-name").value = correctedName;

    event.preventDefault();
    let allFilled = true;

    allRequiredFields.forEach((field) => {
      if (!field.value || field.value.includes("Select")) {
        field.classList.add("error");
        allFilled = false;
      } else {
        field.classList.remove("error");
      }
    });

    if (allFilled) {
      form.classList.add("secActive");
    } else {
      alert("Please fill all required fields before proceeding.");
    }
  });

  backBtn.addEventListener("click", function (event) {
    event.preventDefault();
    form.classList.remove("secActive");
  });

  form.addEventListener("submit", function (e) {
    const creditedTransactionMode = document.getElementById(
      "credited-transaction-mode"
    ).value;
    const debitedTransactionBank = document.getElementById(
      "debited-transaction-bank"
    ).value;
    e.preventDefault();

    const scriptURL = "";

    if (
      creditedTransactionMode === "Select Transaction Mode" ||
      debitedTransactionBank === "Select Debited Bank"
    ) {
      alert("Please select a valid Transaction Details.");
    } else {
      fetch(scriptURL, { method: "POST", body: new FormData(form) })
        .then((response) => {
          alert("Thank you! Your form is submitted successfully.");
          // console.log("Success!", response);
          // Clear the Customer Name and Phone fields
          location.reload();
        })
        .catch((error) => console.error("Error!", error.message));
    }
  });

  const categorySelect = document.getElementById("category-select");
  const departmentSelect = document.getElementById("department-select");
  const serviceSelect = document.getElementById("service-select");

  const secondDropdownOptions = {
    "General Services": [
      "Ration Card",
      "Voter Id",
      "Aadhar Card",
      "Pan Card",
      "College Application",
      "License and RTO Services",
      "Money Transfer Services",
      "Counselling Apply",
      "TN Police",
      "TNEB",
      "Online Payments",
      "Dharisanam Bookings",
      "Typing Services",
    ],
    "E-Savai": [
      "Income Certificate",
      "Community Certificate",
      "Nativity Certificate",
      "Legal Hier Certificate",
      "Intercaste Marriage Certificate",
      "Obc Certificate",
      "No Male Child Certificate",
      "First Graduate Certificate",
      "Small/Marginal Farmer Certificate",
      "Widow Certificate",
      "Deserted Women Certificate",
      "Disability Pension Scheme",
      "Widow Pension Scheme",
      "Deserted Women Pension Scheme",
      "Unmarried Women Pension Scheme",
      "Old Age Pension Scheme",
    ],
    "Job Application Support": ["TN Employment Registration"],
    "Travel Services": [
      "Passport",
      "Flight Ticket",
      "Visa",
      "Certificate Attestation",
      "Bus Booking",
      "Visa Stamping",
      "Cruise Booking",
      "Hotel Booking",
      "Medical Appointment",
      "Tour Services",
    ],
    "Tour Services": ["Domestic Tour Packages", "International Packages"],
  };

  const thirdDropdownOptions = {
    "Ration Card": [
      "New Smart Card Apply",
      "Add Member",
      "Remove Member",
      "Family Head Change",
      "Smart Card Duplicate Apply",
      "Address Change",
    ],
    "Voter Id": ["New Register", "Voter Id Duplicate Print", "Correction"],
    "Aadhar Card": [
      "Aadhar Address Change",
      "Aadhar Id Card",
      "Aadhar PVC Card Apply",
      "Aadhar Card Full",
    ],
    "College Application": ["Anna University", "Annamalai University"],
    "Pan Card": [
      "Pan New",
      "Pan Aadhar Link",
      "E-Pan Card Printing",
      "Pan Correction",
    ],
    "License and RTO Services": [
      "LLR Apply",
      "RTO Tax Payments",
      "Police E Challan Payments",
      "License Duplicate Card",
    ],
    "Money Transfer Services": [
      "Domestic Money Transfer",
      "AEPS Money Withdrawal (Aadhar ATM)",
      "UPI Money Withdrawal",
    ],
    "Counselling Apply": [
      "TNEA Engineering",
      "TNAU Agriculture",
      "TNDALU Law",
      "TANUVAS Veterinary",
      "Paramedical Science",
      "MBBS/BDS",
      "Diploma In Paramedical",
      "MD/MDS",
      "AIIMS/JIPMER",
      "Diploma In Engineering",
      "ITI Industrial Training",
    ],
    "TN Police": [
      "Police NOC (Self Verification)",
      "Document Missing",
      "Online Complaint",
      "FIR Print",
    ],
    TNEB: [
      "EB Bill Payment",
      "New Connection Payments",
      "New Service Connection",
      "Load Addition",
      "Load Reduction",
      "EB Name Transfer",
    ],
    "Online Payments": [
      "College Tuition Fees Payments",
      "College Admission Payments",
      "SBI Collect Payments",
      "RTO Tax Payments",
      "Karuvoolam Challan Payments",
      "Income Tax Payments",
      "Property Tax Payments (Rural)",
    ],
    "Dharisanam Bookings": ["Tirupathi Booking", "Sabarimala Booking"],
    "Typing Services": [
      "Tamil Typing",
      "English Typing",
      "Resume Typing",
      "Bio Data Typing",
      "Jathagam Typing",
    ],
    Passport: [
      "New Passport",
      "Passport Renewal",
      "Lost Or Damage Passport",
      "PCC",
      "Tatkal",
    ],
    "Flight Ticket": ["Flight Tickets", "Flight Ticket Rescheduling"],
    Visa: ["Tourist Visa", "Student Visa", "Visit Visa"],
    "Certificate Attestation": [
      "Birth Certificate Attestation",
      "Marriage Certificate Attestation",
      "Degree Certificate Attestation",
      "Educational Certificate Attestation",
      "Commercial Certificate Attestation",
      "Non-Commercial Certificate Attestation",
      "MEA Attestation",
      "HRD Attestation",
      "PCC Attestation",
    ],
    "Cruise Booking": ["Domestic", "International"],
    "Hotel Booking": ["Domestic", "International"],
    "Tour Services": ["Domestic", "International"],
    "TN Employment Registration": ["New Register", "Renewal", "Addition"],
  };

  function updateSecondDropdown() {
    const selectedCategory = categorySelect.value;
    const relevantDepartments = secondDropdownOptions[selectedCategory] || [];

    departmentSelect.innerHTML =
      "<option disabled selected>Select Service Department</option>";
    relevantDepartments.forEach((dept) => {
      const option = document.createElement("option");
      option.value = dept;
      option.textContent = dept;
      departmentSelect.appendChild(option);
    });

    serviceSelect.innerHTML =
      "<option disabled selected>Select Service Name</option>";
  }

  function updateThirdDropdown() {
    const selectedDepartment = departmentSelect.value;
    const relevantServices = thirdDropdownOptions[selectedDepartment] || [];

    serviceSelect.innerHTML =
      "<option disabled selected>Select Service Name</option>";
    if (relevantServices.length > 0) {
      relevantServices.forEach((service) => {
        const option = document.createElement("option");
        option.value = service;
        option.textContent = service;
        serviceSelect.appendChild(option);
      });
    } else {
      const option = document.createElement("option");
      option.value = selectedDepartment;
      option.textContent = selectedDepartment;
      serviceSelect.appendChild(option);
    }
  }

  categorySelect.addEventListener("change", updateSecondDropdown);
  departmentSelect.addEventListener("change", updateThirdDropdown);

  const referralCodeSelect = document.getElementById("referral-code-select");
  const customerSourceSelect = document.getElementById(
    "customer-source-select"
  );
  const leadSourceSelect = document.getElementById("lead-source-select");

  const customerSources = {
    "AIMS-2007": "AIMS",
    "AIMS-2024": "CR Digital Vibes",
  };

  const leadSources = {
    AIMS: "Walk-in",
    "CR Digital Vibes": "Instagram",
  };

  referralCodeSelect.addEventListener("change", function () {
    const selectedReferralCode = referralCodeSelect.value;
    const relevantCustomerSource = customerSources[selectedReferralCode] || "";

    customerSourceSelect.innerHTML =
      "<option disabled selected>Select Customer Source Name</option>";
    if (relevantCustomerSource) {
      const option = document.createElement("option");
      option.value = relevantCustomerSource;
      option.textContent = relevantCustomerSource;
      customerSourceSelect.appendChild(option);
      customerSourceSelect.value = relevantCustomerSource;
    }

    const relevantLeadSource = leadSources[relevantCustomerSource] || "";
    leadSourceSelect.innerHTML =
      "<option disabled selected>Select Lead Generated Source Name</option>";
    if (relevantLeadSource) {
      const option = document.createElement("option");
      option.value = relevantLeadSource;
      option.textContent = relevantLeadSource;
      leadSourceSelect.appendChild(option);
      leadSourceSelect.value = relevantLeadSource;
    }
  });

  customerSourceSelect.addEventListener("change", function () {
    const selectedCustomerSource = customerSourceSelect.value;
    const relevantLeadSource = leadSources[selectedCustomerSource] || "";

    leadSourceSelect.innerHTML =
      "<option disabled selected>Select Lead Generated Source Name</option>";
    if (relevantLeadSource) {
      const option = document.createElement("option");
      option.value = relevantLeadSource;
      option.textContent = relevantLeadSource;
      leadSourceSelect.appendChild(option);
      leadSourceSelect.value = relevantLeadSource;
    }
  });

  const mobileNumberInput = document.getElementById("mobile-number");

  mobileNumberInput.addEventListener("input", function () {
    const value = mobileNumberInput.value;
    if (!/^\d{0,10}$/.test(value)) {
      mobileNumberInput.value = value.slice(0, 10); // Limit to 10 digits
    }
  });

  mobileNumberInput.addEventListener("focusout", function () {
    const value = mobileNumberInput.value;
    if (!/^\d{10}$/.test(value)) {
      alert("Mobile number must be exactly 10 digits.");
    }
  });

  const applicationChargeInput = document.getElementById("application-charge");
  const serviceChargeInput = document.getElementById("service-charge");
  const totalAmountInput = document.getElementById("total-amount");

  applicationChargeInput.addEventListener("input", updateTotalAmount);
  serviceChargeInput.addEventListener("input", updateTotalAmount);

  function updateTotalAmount() {
    const applicationCharge = parseFloat(applicationChargeInput.value) || 0;
    const serviceCharge = parseFloat(serviceChargeInput.value) || 0;
    const totalAmount = applicationCharge + serviceCharge;
    totalAmountInput.value = totalAmount.toFixed(2); // Display total with 2 decimal places
  }
});
