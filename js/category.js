var urlRest = 'http://140.238.155.247:8080/api/Category/';
/* var urlRest = 'http://localhost:8080/api/Category/'; */

/* $(document).ready(function () {
  visualizeInf();
}); */

function visualizeInf() {
  $.ajax({
    url: urlRest + "all",
    type: "GET",
    datatype: "JSON",

    success: function (respuesta) {
      console.log(respuesta);
      visualizeTable(respuesta);
    },
  });
}

function visualizeTable(items) {
  let myTable = "<table>";
  myTable += "<div";
  myTable += "<tr class='animate__animated animate__slideInDown'>";
  myTable += "<td class='bt sty bsi'>     Name </td>";
  myTable += "<td class='bt sty btf btm'> Description </td>";
  /* myTable += "<td class='styt'></td>"; */
  myTable += "<td class='btu'>         Update </td>";
  myTable += "<td class='btd'>         Delete </td>";
  myTable += "</tr>";
  myTable += "<tr class='tr'></tr>";
  myTable += "</div>";

  for (i = 0; i < items.length; i++) {
    myTable += "<tr class='animate__animated animate__slideInDown'>";
    myTable += "<td class='bt bti'>" +     items[i].name + "</td>";
    myTable += "<td class='bt btf btm'>" + items[i].description + "</td>";
    /* myTable+="<td></td>"; */
    myTable += "<td> <button class='updateSend' onclick='sendReg(" + items[i].id + ") '><i class='fas fa-pen-square'></i></button> <br> <button class='updateSend animate__animated animate__slideInDown' onclick='updateInf(" + items[i].id + ") '><i class='fas fa-undo-alt'></i></button>";
    myTable += "<td> <button class='delete' onclick='deleteInf(" + items[i].id + ") '><i class='fas fa-trash-alt'></i></button>";
    myTable += "</tr>";
    myTable += "<tr></tr>";

  }
  myTable += "</table>";
  $("#resultado").html(myTable);

  $("#search").keyup(function () {
    var value = this.value.toLowerCase().trim();

    $("table tr").each(function (index) {
      if (!index) return;
      $(this)
        .find("td")
        .each(function () {
          var id = $(this).text().toLowerCase().trim();
          var not_found = id.indexOf(value) == -1;
          $(this).closest("tr").toggle(!not_found);
          return not_found;
        });
    });
  });
} 

function saveInf(){

    if (validateFields()) {
    let myData={
        name:$("#name").val(),
        description:$("#description").val(),
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: urlRest + "save",
        type:'POST',
        data: dataToSend,
        datatype:'JSON',
        contentType: "application/JSON; charset=utf-8",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#name").val("");
            $("#description").val("");
            alert("The fields have been saved");
            visualizeInf(); 
        }

    });
    };

} 

function updateInf(idElemento) {
  if (validateFields()) {
    let myData = {
      id: idElemento,
      name: $("#name").val(),
      description: $("#description").val(),
    };
    console.log(myData);
    let dataToSend = JSON.stringify(myData);
    $.ajax({
      url: urlRest + "update",
      type: 'PUT',
      data: dataToSend,
      contentType: "application/JSON",
      datatype: 'JSON',
      success: function (respuesta) {
        console.log(respuesta);
        $("#resultado").empty();
        $("#name").val("");
        $("#description").val("");
        alert("The fields have been updated");
        visualizeInf();
      },
    });
  };
}

function deleteInf(idElemento) {
  if (
    $("#name").val().length != 0 ||
    $("#description").val().length != 0
  ) {
    $("#name").val("");
    $("#description").val("");
  }
  let myData = {
    id: idElemento,
  };
  let dataToSend = JSON.stringify(myData);
  $.ajax({
    url: urlRest + idElemento,
    type: 'DELETE',
    data: dataToSend,
    contentType: "application/JSON",
    datatype: 'JSON',
    success: function (respuesta) {
      $("#resultado").empty();
      alert("The fields have been removed");
      visualizeInf();
    },
  });
}

function sendReg(idElemento) {
  $.ajax({
    url: urlRest + idElemento,
    type: 'GET',
    datatype: 'JSON',
    success: function (respuesta) {
        console.log(respuesta);
        $("#id").val(respuesta.id);
        $("#name").val(respuesta.name);
        $("#description").val(respuesta.description);
    },
  });
}

function validateFields() {

  if ($("#name").val() == "") {
    alert("Name is Empty!");
    $("#name").focus(); 
    return false;
  } else {
    if ($("#description").val() == "") {
      alert("Description is Empty!");
      $("#description").focus();
      return false;
    } else {
      return true; 
    }
  }
}

$(document).ready(function () {
  $("#limpiar").click(function () {
    $('input[type="number"], input[type="text"], textarea[type="text"]').val("");
  });
});
