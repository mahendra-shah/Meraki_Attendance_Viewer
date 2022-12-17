// window.addEventListener("message", (event) => {
//   // console.log(event,'YES THIS EVENT WALI COLSOLE HAI...');
//   console.log(event.data, "only data ko print kr rha hu...");
//   if (event.origin != 'https://meet.google.com') return
//   const data = JSON.parse(event.data)
//   const localData = localStorage.getItem('Meraki_Attendance_Data')
//   if(localData){
//     localData.push(data)
//     // console.log(localData,'11111111111111111111');
//     localStorage.setItem("Meraki_Attendance_Data",JSON.stringify(localData))
//   }else{
//     localStorage.setItem("Meraki_Attendance_Data",JSON.stringify([data]))
//   }
// });

window.addEventListener("message", (event) => {
  console.log(event.data, "999999999999999999999999999999999");
  if (event.origin != "https://meet.google.com") return;
  const data = JSON.parse(event.data);
  // console.log(data);
  const localData = JSON.parse(localStorage.getItem("Meraki_Attendance_Data"));
  console.log(localData)
  if (localData) {
    localData.push(data);
    localStorage.setItem("Meraki_Attendance_Data", JSON.stringify(localData));
    console.log('yes this is woling....')
    window.location.reload();
  } else {
    localStorage.setItem("Meraki_Attendance_Data", JSON.stringify([data]));
    window.location.reload();
  }
});




// console.log(localStorage.getItem("Meraki_Attendance_Data"));
let urlArr = [];
const imgUrls = urlArr.filter((ele, ind) => {
  if (ind <= 6) return ele;
});
const localRecords = JSON.parse(localStorage.getItem("Meraki_Attendance_Data"));
const rev_record = localRecords.reverse()
// console.log(localRecords, "local--------");
const tbody = document.getElementById("history");
for (let record in rev_record) {
  console.log(localRecords[record].PROFILE_URLS, "%%%%%%%%%%%%%%%%%%%%%%%%%%%%555");
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
  // const localData = JSON.parse(localStorage.getItem("Meraki_Attendance_Data"));
  const recData = rev_record[rec]
  console.log(recData);
  const pop = document.getElementById('tb')

  for(let ind in recData.attendee_names){
    console.log(recData.PROFILE_URLS[ind]);
    console.log(recData.attendedDurationInSec);
    // console.log(recData[ind]);
    pop.innerHTML += `
        <tr>
          <td class="col-xs-3"><img src="${recData.PROFILE_URLS[ind]}" class="icon-at" /></td>
          <td class="col-xs-3">${recData.attendee_names[ind]}</td>
          <td class="col-xs-6">${recData.attendedDurationInSec}</td>
        </tr>
      `
  }
  
  // recData.map((ele,ind)=>{
  //   return (
      
  //   )
  // })

}