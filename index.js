window.addEventListener("message", (event) => {
  if (event.origin != 'https://meet.google.com') return
  const data = JSON.parse(event.data)
  const localData = localStorage.getItem('Meraki_Attendance_Data')
  console.log(localData, '76767867')
  // localStorage.setItem('Meraki_Attendance_Data', JSON.stringify(data))
  console.log("Received data from child iframe ", data);
});
