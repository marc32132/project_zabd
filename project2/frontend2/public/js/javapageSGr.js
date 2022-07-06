document.getElementById("logoutLink").onclick = function () {
    document.getElementById("logout").submit();
};

 var user;
 fetch("/currentUser")
 .then(res => res.json())
 .then(data => user = data)
 .then(() => console.log(user))

    fetch("/class/allclasses")
    .then(function(response){
        return response.json();
    })
    .then(function(classeOs){
        let out ="";
        let name = user.name[0].toUpperCase() + user.name.slice(1).toLowerCase();
        let surname = user.surname[0].toUpperCase() + user.surname.slice(1).toLowerCase();
        let placeholder = document.querySelector("#classDisplayStudent");
        
        for(let classO of classeOs){
      
                    if(classO.participants.includes(user._id) ) {
                        console.log("username: ", user.name);
                    out += `
                    <tr>
                        <td>${classO.className}</td>
                        <td>${classO.groupNumber}</td>
                        <td><form action="/class/removeParticipant" method="post">
                        <input class="hidden" type="text" name="className" value="${classO.className}">
                        <input class="hidden" type="text" name="groupNumber" value="${classO.groupNumber}">
                        <input class="hidden" type="text" name="student" placeholder="student" value="${user._id}">
                        <input class="btn btn-secondary" type="submit" value="leave">
                        
                        </td>
                    <tr>
                    `
                    }
              
            }
        
        
        let nameOfUser = document.querySelector("#nameTagUser");
        nameOfUser.innerHTML = `Welcome  ${name}`; 
        placeholder.innerHTML = out;
    });
   