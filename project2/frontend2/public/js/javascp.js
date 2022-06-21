document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountStudentForm = document.querySelector("#createAccountStudent");
    const changePasswordForm = document.querySelector("#changePassword");
    const createAccountTeacherForm = document.querySelector("#positionRegisterT");
    const studentYearForm = document.querySelector("#studentYear");
    const position = document.getElementById("positionRegister");
    var pickedPosition = position.options[position.selectedIndex].text;
    let placeholder = document.querySelector("#studentform");

    document.querySelector("#createAcc").addEventListener("click", ev => {
        ev.preventDefault();
        loginForm.classList.add("hidden");
        createAccountStudentForm.classList.remove("hidden");
        changePasswordForm.classList.add("hidden");
        // createAccountTeacherForm.classList.add("hidden");
    });

    document.querySelector("#signIn").addEventListener("click", ev => {
        ev.preventDefault();
        loginForm.classList.remove("hidden");
        createAccountStudentForm.classList.add("hidden");
        changePasswordForm.classList.add("hidden");
        // createAccountTeacherForm.classList.add("hidden");
    });

    document.querySelector("#getPassword").addEventListener("click", ev => {
        ev.preventDefault();
        loginForm.classList.add("hidden");
        createAccountStudentForm.classList.add("hidden");
        changePasswordForm.classList.remove("hidden");
        // createAccountTeacherForm.classList.add("hidden");
    });
    position.addEventListener("change", ev => {
        ev.preventDefault();
        pickedPosition = position.options[position.selectedIndex].text;
        console.log(pickedPosition);
        if(pickedPosition == 'Employee'){
            studentYearForm.classList.add("hidden");
            placeholder.innerHTML = "";
        } else {
            studentYearForm.classList.remove("hidden");
            placeholder.innerHTML = `<p id="studentYear"  class="form_reg"><input type="text" class = "output" name="year" required placeholder="year"></p>`;
        }
    });


});

