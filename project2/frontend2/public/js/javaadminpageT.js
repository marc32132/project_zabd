document.getElementById("logoutLink").onclick = function () {
    document.getElementById("logout").submit();
};
fetch("/admin/allemployees")
.then(function(response){
    return response.json();
})
.then(function(users){
    let out2 ="";
    let placeholder2 = document.querySelector("#teacherDisplay");
    
    for(let user of users){
        if(user.position == 'Employee'){
            out2 += `
            <tr>
                <td>${user.login}</td>
                <td>${user.name}</td>
                <td>${user.surname}</td>
                <td>${user.mail}</td>

                <td><form action="/admin/allusersDel" method="post">
                <input class="hidden" type="text" name="login" value="${user._id}">
                <input class="btn btn-secondary" type="submit" value="delete">
              </form></td>
            <tr>
            ` 
        }
    }
    placeholder2.innerHTML = out2;
});
