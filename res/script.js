const state = {
    xmlDocObj:null,
    nodes:['assignmentid','service_type','driver_name','technitian_name','vehicle_type']
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

    xhttp.open('GET','emp_assign.xml',true);
    xhttp.send();
}

const showTable = (xmlRes) => {
    if(!xmlRes){return;}
    state.xmlDocObj = xmlRes;
    let table;
    table = `<tr style='background:#36304a;color:#fff;'>
        <th>Assignment ID</th>
        <th>Service Type</th>
        <th>Driver Name</th>
        <th>Technitian Name</th>
        <th>Vehicle Type</th>
        <th>Actions</th>
        </tr>`;
    const x = xmlRes.getElementsByTagName("Team");
    for(let i=0;i<x.length;i++){
        table += `<form onsubmit="submitFormHandler()">
        <tr>
            <td style='border:2px solid black;'>${xmlRes.getElementsByTagName("assignmentid")[i].childNodes[0].nodeValue}</td>
            <td style='border:2px solid black;'>${xmlRes.getElementsByTagName("service_type")[i].childNodes[0].nodeValue}</td>
            <td style='border:2px solid black;'>${xmlRes.getElementsByTagName("driver_name")[i].childNodes[0].nodeValue}</td>
            <td style='border:2px solid black;'>${xmlRes.getElementsByTagName("technitian_name")[i].childNodes[0].nodeValue}</td>
            <td style='border:2px solid black;'>${xmlRes.getElementsByTagName("vehicle_type")[i].childNodes[0].nodeValue}</td>
           
            <td id='edit_delete_cont_${i}'>
                <ion-icon onclick="removeNode(${i})" name="trash-outline" class="delete_icon"></ion-icon>
                <ion-icon name="pencil-outline" class="edit_icon" onclick="changeNode(${i})"></ion-icon>
            </td>
            
            </tr>
        </form>`;
    }
    document.getElementById("team_table").innerHTML = table;
}

const removeNode = (id) => {
    if(id == null){return}
    let child = state.xmlDocObj.getElementsByTagName('Team')[id];
    state.xmlDocObj.documentElement.removeChild(child);
    showTable(state.xmlDocObj)
}

const changeNode = (id) => {
    if(id == null){return}
    document.getElementById("form_cont").classList.toggle('hide');
    const form = document.getElementById("changeForm");
    let formElem = `
    <input disabled class='input_fields' type='text' placeholder='Assignment Id' value='${state.xmlDocObj.getElementsByTagName("assignmentid")[id].childNodes[0].nodeValue}'/>
    <input disabled class='input_fields' type='text' placeholder='Service Type' value='${state.xmlDocObj.getElementsByTagName("service_type")[id].childNodes[0].nodeValue}'/>
    <input class='input_fields' type='text' placeholder='Driver Name' value='${state.xmlDocObj.getElementsByTagName("driver_name")[id].childNodes[0].nodeValue}'/>
    <input class='input_fields' type='text' placeholder='Technitian Name' value='${state.xmlDocObj.getElementsByTagName("technitian_name")[id].childNodes[0].nodeValue}'/>
    <input class='input_fields' type='text' placeholder='Vehicle Type' value='${state.xmlDocObj.getElementsByTagName("vehicle_type")[id].childNodes[0].nodeValue}'/>
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
    state.xmlDocObj.getElementsByTagName("assignmentid")[id].childNodes[0].nodeValue = inputFields[0].value;
    state.xmlDocObj.getElementsByTagName("service_type")[id].childNodes[0].nodeValue = inputFields[1].value;
    state.xmlDocObj.getElementsByTagName("driver_name")[id].childNodes[0].nodeValue = inputFields[2].value;
    state.xmlDocObj.getElementsByTagName("technitian_name")[id].childNodes[0].nodeValue = inputFields[3].value;
    state.xmlDocObj.getElementsByTagName("vehicle_type")[id].childNodes[0].nodeValue = inputFields[4].value;
    console.log(inputFields[0].value)
    showTable(state.xmlDocObj)
    cancelFormHandler();
}

const cancelFormHandler = (id) => {
    event.preventDefault();
    document.getElementById("form_cont").classList.toggle('hide');

}

const addNewFormHandler = () => {
    event.preventDefault();
    document.getElementById("form_cont").classList.toggle('hide');
    document.getElementById("form_heading").innerHTML = "Add new node"
    const form = document.getElementById("changeForm");
    let formElem = `
    <input class='input_fields' type='text' placeholder='Assignment Id' value=''/>
    <input class='input_fields' type='text' placeholder='Service Type' value=''/>
    <input class='input_fields' type='text' placeholder='Driver Name' value=''/>
    <input class='input_fields' type='text' placeholder='Technitian Name' value=''/>
    <input class='input_fields' type='text' placeholder='Vehicle Type' value=''/>
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
    const newnode = state.xmlDocObj.createElement("Team")
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



