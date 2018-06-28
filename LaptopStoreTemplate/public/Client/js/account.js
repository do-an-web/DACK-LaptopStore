
function saveInfo() {
    alert("Your infos saved!");

}

function convertDate(d) {
  var p = d.split("/");
  return +(p[2]+p[1]+p[0]);
}

function sortOldest() {

  var tbody = document.querySelector("#myTable tbody");
  // get trs as array for ease of use
  var rows = [].slice.call(tbody.querySelectorAll("tr"));
  
  rows.sort(function(a,b) {
      console.log(a.cells[1].innerHTML);
    return convertDate(a.cells[1].innerHTML) - convertDate(b.cells[1].innerHTML);
  });
  
  rows.forEach(function(v) {
    tbody.appendChild(v); // note that .appendChild() *moves* elements
  }); 

}

function sortNewest() {

  var tbody = document.querySelector("#myTable tbody");
  // get trs as array for ease of use
  var rows = [].slice.call(tbody.querySelectorAll("tr"));
  
  rows.sort(function(b,a) {
      console.log(a.cells[1].innerHTML);
    return convertDate(a.cells[1].innerHTML) - convertDate(b.cells[1].innerHTML);
  });
  
  rows.forEach(function(v) {
    tbody.appendChild(v); // note that .appendChild() *moves* elements
  }); 

}

function addToCart() {
    alert("Product have been added to cart!");
}
