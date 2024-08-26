const scriptURL =
  "https://script.google.com/macros/s/AKfycbzphrPw7fTJ_ASXAg6iSYgKv2NPtyzGX-e6has77dCzAwpli5pPRspUmQtGYvrJKQqgdg/exec";

const form = document.forms["appointmentForm"];


form.addEventListener("submit", (e) => {
  e.preventDefault();
  document.querySelector('input[name="send"]').value = "wait";

  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      alert("Thank you! your form is submitted successfully.");
  
    })
    // .then(() => {
    //   window.location.reload();
    // })
    .catch((error) => console.error("Error!", error.message));
  // alert("Thank you! your form is submitted successfully.");
});



