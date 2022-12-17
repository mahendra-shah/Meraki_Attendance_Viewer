window.addEventListener("message", (event) => {
//   console.log(event.data, "999999999999999999999999999999999");
  if (event.origin != "https://meet.google.com") return;
  const data = JSON.parse(event.data);
  const localData = JSON.parse(localStorage.getItem("Meraki_Attendance_Data"));
  if (localData) {
    localData.push(data);
    localStorage.setItem("Meraki_Attendance_Data", JSON.stringify(localData));
    window.location.reload();
  } else {
    localStorage.setItem("Meraki_Attendance_Data", JSON.stringify([data]));
    window.location.reload();
  }
});

const localRecords = JSON.parse(localStorage.getItem("Meraki_Attendance_Data"));
const rev_record = localRecords.reverse()
const tbody = document.getElementById("history");
for (let record in rev_record) {
  tbody.innerHTML += `
  <tr>
    <td>${localRecords[record].meeting_title}</td>
    <td>${localRecords[record].meeting_time}</td>
    <td>
  ${localRecords[record].meet_duration}
  </td>
  <td>
    <img src="images/attendees-icon.svg" class="icon-at" />
      <span id="attendees-count" class="ml-1">${
        JSON.parse(localRecords[record].attendee_names).length
      }</span>
  </td>
  <td>
    <ul class="persons">
      
        ${localRecords[record].PROFILE_URLS.map((ele, ind) => {
          return `
            <li>
              <a href="#">
                <img src="${ele}" alt="Person" class="img-fluid last-${ind}">
              </a>
            </li>

            `;
        })}
    </ul>
  </td>
  <td><span
    id='${record}'
    onclick="testing(${record})"  
    class="veiw"
    type="button"
    data-bs-toggle="modal"
    data-bs-target="#myModal"
  >
    view
  </span></td>
    <td><img src="images/remove.svg" class="icon-at" />  </td>
</tr>
              `;
}

function testing(rec){
  const recData = rev_record[rec]
  const pop = document.getElementById('tb')
  const parsedNames = JSON.parse(recData.attendee_names)
  const parsedDuration = JSON.parse(recData.attendedDurationInSec)
  for(let ind = 0; parsedNames.length > ind; ind++ ){
    let new_time = String(parsedDuration[ind]/60).split(".")
    let create_tmt = `${new_time[0]} : ${new_time[1].slice(0,2)}`
    pop.innerHTML += `
      <tr>
          <td class="col-xs-3 profile-img"><img src="${recData.PROFILE_URLS[ind]}" class="img-fluid" /></td>
          <td class="col-xs-5">${parsedNames[ind]}</td>
          <td class="col-xs-4">${create_tmt}</td>
        </tr>
      `
  }
  

}


function clearData(){
  close = document.getElementById("tb")
  close.innerHTML = `
  <tr style="width: 480px !important;top:0px"
  class="position-sticky bg-white w-auto"
  >
    <th class="col-4">First Name</th>
    <th class="col-4">Last Name</th>
    <th class="col-4">E-mail</th>
  </tr>
        `
}
