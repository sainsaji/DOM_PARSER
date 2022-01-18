const state = {
    xmlDocObj:null,
    nodes:['MemberId','TeamId','FirstName','LastName','Gender','MobileNumber','Email']
}


const loadXml = () => {
    let xhttp;
    if(window.XMLHttpRequest){
        xhttp = new XMLHttpRequest();
    }else{
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.onreadystatechange = function(){
        if(xhttp.readyState == 4 && xhttp.status == 200){
            showTable(xhttp.responseXML)
        }
    }

    xhttp.open('GET','progress_tracking.xml',true);
    xhttp.send();
}

const showTable = (xmlRes) => {
    if(!xmlRes){return;}
    state.xmlDocObj = xmlRes;
    let table;
    table = `<tr style='background:#36304a;color:#fff;'>
        <th>Member Id</th>
        <th>Team Id</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Gender</th>
        <th>Mobile Number</th>
        <th>Email</th>
        <th>Actions</th>
        </tr>`;
    const x = xmlRes.getElementsByTagName("Member");
    for(let i=0;i<x.length;i++){
        table += `<form onsubmit="submitFormHandler()">
        <tr>
            <td>${xmlRes.getElementsByTagName("MemberId")[i].childNodes[0].nodeValue}</td>
            <td>${xmlRes.getElementsByTagName("TeamId")[i].childNodes[0].nodeValue}</td>
            <td>${xmlRes.getElementsByTagName("FirstName")[i].childNodes[0].nodeValue}</td>
            <td>${xmlRes.getElementsByTagName("LastName")[i].childNodes[0].nodeValue}</td>
            <td>${xmlRes.getElementsByTagName("Gender")[i].childNodes[0].nodeValue}</td>
            <td>${xmlRes.getElementsByTagName("MobileNumber")[i].childNodes[0].nodeValue}</td>
            <td>${xmlRes.getElementsByTagName("Email")[i].childNodes[0].nodeValue}</td>
            <td id='edit_delete_cont_${i}'>
                <ion-icon name="pencil-outline" class="edit_icon" onclick="changeNode(${i})"></ion-icon>
                <ion-icon onclick="removeNode(${i})" name="trash-outline" class="delete_icon"></ion-icon>
            </td>
            <td id='submit_cancel_cont_${i}' class='hide'>
                <input type=submit><ion-icon type='submit' name="arrow-forward-circle-outline" class="edit_icon" style="color:green;"></ion-icon></submit>
                
                <ion-icon class="delete_icon" name="close-circle-outline"></ion-icon>
            </td>
            </tr>
        </form>`;
    }
    document.getElementById("member_table").innerHTML = table;
}

const removeNode = (id) => {
    if(id == null){return}
    let child = state.xmlDocObj.getElementsByTagName('Member')[id];
    state.xmlDocObj.documentElement.removeChild(child);
    showTable(state.xmlDocObj)
}

const changeNode = (id) => {
    if(id == null){return}
    document.getElementById("form_cont").classList.toggle('hide');
    const form = document.getElementById("changeForm");
    let formElem = `
    <input disabled class='input_fields' type='text' placeholder='Member Id' value='${state.xmlDocObj.getElementsByTagName("MemberId")[id].childNodes[0].nodeValue}'/>
    <input disabled class='input_fields' type='text' placeholder='Team Id' value='${state.xmlDocObj.getElementsByTagName("TeamId")[id].childNodes[0].nodeValue}'/>
    <input class='input_fields' type='text' placeholder='First Name' value='${state.xmlDocObj.getElementsByTagName("FirstName")[id].childNodes[0].nodeValue}'/>
    <input class='input_fields' type='text' placeholder='Last Name' value='${state.xmlDocObj.getElementsByTagName("LastName")[id].childNodes[0].nodeValue}'/>
    <input class='input_fields' type='text' placeholder='Gender' value='${state.xmlDocObj.getElementsByTagName("Gender")[id].childNodes[0].nodeValue}'/>
    <input class='input_fields' type='text' placeholder='Mobile Number' value='${state.xmlDocObj.getElementsByTagName("MobileNumber")[id].childNodes[0].nodeValue}'/>
    <input class='input_fields' type='text' placeholder='Email' value='${state.xmlDocObj.getElementsByTagName("Email")[id].childNodes[0].nodeValue}'/>
    <div class='btn_cont'>
        <button class='submit_btn' type='submit' onclick='submitFormHandler(${id})'>Submit</button>
        <button class='cancel_btn' onclick='cancelFormHandler()'>Cancel</button>
    </div>
    `;

    form.innerHTML = formElem;
    
}



const submitFormHandler = (id) => {
    event.preventDefault();
    const inputFields = document.getElementsByClassName("input_fields");
    state.xmlDocObj.getElementsByTagName("MemberId")[id].childNodes[0].nodeValue = inputFields[0].value;
    state.xmlDocObj.getElementsByTagName("TeamId")[id].childNodes[0].nodeValue = inputFields[1].value;
    state.xmlDocObj.getElementsByTagName("FirstName")[id].childNodes[0].nodeValue = inputFields[2].value;
    state.xmlDocObj.getElementsByTagName("LastName")[id].childNodes[0].nodeValue = inputFields[3].value;
    state.xmlDocObj.getElementsByTagName("Gender")[id].childNodes[0].nodeValue = inputFields[4].value;
    state.xmlDocObj.getElementsByTagName("MobileNumber")[id].childNodes[0].nodeValue = inputFields[5].value;
    state.xmlDocObj.getElementsByTagName("Email")[id].childNodes[0].nodeValue = inputFields[6].value;
    console.log(inputFields[0].value)
    showTable(state.xmlDocObj)
    cancelFormHandler();
}

const cancelFormHandler = () => {
    event.preventDefault();
    document.getElementById("form_cont").classList.toggle('hide');

}

const addNewFormHandler = () => {
    event.preventDefault();
    document.getElementById("form_cont").classList.toggle('hide');
    document.getElementById("form_heading").innerHTML = "Add new node"
    const form = document.getElementById("changeForm");
    let formElem = `
    <input class='input_fields' type='text' placeholder='Member Id' value=''/>
    <input class='input_fields' type='text' placeholder='Team Id' value=''/>
    <input class='input_fields' type='text' placeholder='First Name' value=''/>
    <input class='input_fields' type='text' placeholder='Last Name' value=''/>
    <input class='input_fields' type='text' placeholder='Gender' value=''/>
    <input class='input_fields' type='text' placeholder='Mobile Number' value=''/>
    <input class='input_fields' type='text' placeholder='Email' value=''/>
    <div class='btn_cont'>
        <button class='submit_btn' type='submit' onclick='addNewNodeHandler()'>Submit</button>
        <button class='cancel_btn' onclick='cancelFormHandler()'>Cancel</button>
    </div>
    `;

    form.innerHTML = formElem;
}

const addNewNodeHandler = () => {
    event.preventDefault();
    const inputFields = document.getElementsByClassName("input_fields");
    const newnode = state.xmlDocObj.createElement("Member")
    state.nodes.map((el,i) => {
        let newTitle = state.xmlDocObj.createElement(el)
        let newText = state.xmlDocObj.createTextNode(inputFields[i].value)
        newTitle.appendChild(newText)
        newnode.appendChild(newTitle);
    });

    state.xmlDocObj.documentElement.insertBefore(newnode,null)
    showTable(state.xmlDocObj)
    cancelFormHandler()
}

loadXml();



