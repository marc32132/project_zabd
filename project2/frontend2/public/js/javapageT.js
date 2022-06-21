document.getElementById("logoutLink").onclick = function () {
    document.getElementById("logout").submit();
};

 fetch("/currentUser")
 .then(res => res.json())
 .then(user => {
    let nameOfUser = document.querySelector("#nameTagUser");
    let teacherName = document.querySelector("#teacherName");
    let name = user.name[0].toUpperCase() + user.name.slice(1).toLowerCase(); 
    let surname = user.surname[0].toUpperCase() + user.surname.slice(1).toLowerCase(); 
    teacherName.innerHTML = `<input type="text" name="teacher" required value="${name + surname}">`;
    nameOfUser.innerHTML = `Welcome  ${name}`; 
    console.log(surname)
    })

  
   