var urlRest = 'http://140.238.155.247:8080/api/Message/';
var urlRest = 'http://localhost:8080/api/Message/';

$(document).ready(function () {
  visualizeInf();
});

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
  myTable += "<td class='bt sty bsi'>   Cliente </td>";
  myTable += "<td class='bt sty'>   Cabin </td>";
  myTable += "<td class='bt sty btm' style='text-align: center;'>    Mensaje </td>";
  /* myTable += "<td class='styt'></td>"; */
  myTable += "<td class='btu'>   Update </td>";
  myTable += "<td class='btd'>   Delete </td>";
  myTable += "</tr>";
  myTable += "<tr class='tr'></tr>";
  myTable += "</div>";

  for (i = 0; i < items.length; i++) {
    /* let nameClient = items[i].client? items[i].client.name: null;
    let nameCabin = items[i].cabin? items[i].cabin.name: null;
    let messageText = items[i].messageText? items[i].messageText: null; */
    myTable += "<tr class='animate__animated animate__slideInDown'>";
    myTable += "<td class='bt bti'>" +         items[i].client.name + "</td>";
    myTable += "<td class='bt'>" +     items[i].cabin.name + "</td>";
    myTable += "<td class='bt btf btm'>" + items[i].messageText+ "</td>";
   /*  myTable += "<td></td>"; */
   myTable += "<td> <button class='updateSend' onclick='sendReg(" + items[i].idMessage + ")'><i class='fas fa-pen-square'></i></button>                     <br>                                                                  <button class='updateSend animate__animated animate__slideInDown' onclick='updateInf(" + items[i].idMessage + ") '><i class='fas fa-undo-alt'></i></button>";
   myTable += "<td> <button class='delete' onclick='deleteInf(" + items[i].idMessage + ")'><i class='fas fa-trash-alt'></i></button>";
  myTable += "</tr>";
  myTable += "<tr> </tr>";
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

function saveInf() {
  if (validateFields()) {
    let myData = {
      client: { idClient: +$("#client_id").val() },
      cabin: { id: +$("#cabin_id").val() },
      messageText: $("#messagetext").val(),
    };
    let dataToSend = JSON.stringify(myData);
    console.log(myData);
    $.ajax({
      url: urlRest + "save",
      type: "POST",
      data: dataToSend,
      datatype: "JSON",
      contentType: "application/JSON; charset=utf-8",
      success: function (respuesta) {
        console.log(respuesta);
        $("#resultado").empty();
        $("#client_id").val("");
        $("#cabin_id").val("");
        $("#messagetext").val("");
        alert("The fields have been saved");
        visualizeInf();
      },

      error: function (jqXHR, textStatus, errorThrown) {
        alert("The fields have not been saved");
        visualizeInf();
      },
    });
  }
}

function updateInf(idElemento) {
  if (validateFields()) {
  let myData = {
    idMessage:idElemento,
    client: { idClient: +$("#client_id").val() },
    cabin: { id: +$("#cabin_id").val() },
    messageText: $("#messagetext").val(),
  };
  console.log(myData);
  let dataToSend = JSON.stringify(myData);
  $.ajax({
    url: urlRest + "update",
    type: 'PUT',
    data: dataToSend,
    contentType: "application/JSON;",
    datatype: 'JSON',
    success: function (respuesta) {
      console.log(respuesta);
      $("#resultado").empty();
      $("#client_id").val("");
      $("#cabin_id").val("");
      $("#messagetext").val("");
      alert("The fields have been updated");
      visualizeInf();
    },
  });
};
}

function deleteInf(idElemento) {
  if (
    $("#client_id").val().length != 0 ||
    $("#cabin_id").val().length != 0 ||
    $("#messagetext").val().length != 0
  ) {
    $("#client_id").val("");
    $("#cabin_id").val("");
    $("#messagetext").val("");
  }
  let myData = {
    idMessage:idElemento,
  };
  let dataToSend = JSON.stringify(myData);
  $.ajax({
    url: urlRest + idElemento,
    type: "DELETE",
    data: dataToSend,
    contentType: "application/JSON",
    datatype: "JSON",
    success: function (respuesta) {
      console.log(respuesta), 
      $("#resultado").empty();
      visualizeInf();
      alert("The fields have been removed");
    },
  });
}

function sendReg(idElemento) {
  $.ajax({
    url: urlRest + idElemento,
    type: 'GET',
    success: function (respuesta) {
      console.log(respuesta);
      $("#client_id").val(respuesta.client.idClient);
      $("#cabin_id").val(respuesta.cabin.id);
      $("#messagetext").val(respuesta.messageText);
    },
  });
}

function validateFields() {
  if ($("#client_id").val() == "") {
    alert("Client is Empty!");
    $("#client_id").focus();
    return false;
  } else {
    if ($("#cabin_id").val() == "") {
      alert("Cabin is Empty!");
      $("#cabin_id").focus();
      return false;
    } else {
      if ($("#messagetext").val() == "") {
        alert("Message Text is Empty!");
        $("#messagetext").focus();
        return false;
      } else {
        return true;
      }
    }
  }
}

function selectIdClient(){
  console.log("Se esta ejecutando")
  $.ajax({
      url: "http://140.238.155.247:8080/api/Client/all",
      url: "http://localhost:8080/api/Client/all",
      type: 'GET',
        datatype: 'JSON',
      success:function(respuesta){
          console.log(respuesta);
          let $select = $("#client_id");
          $.each(respuesta, function (id, name) {
            $select.append('<option class="opt" value='+name.idClient+' >'+name.name+'</option>');
              /* console.log("select "+name.id); */
          }); 
      }
  
  })
}

function selectIdCabin(){
  console.log("Se esta ejecutando")
  $.ajax({
      url: "http://140.238.155.247:8080/api/Cabin/all",
      url: "http://localhost:8080/api/Cabin/all",
      type: 'GET',
        datatype: 'JSON',
      success:function(respuesta){
          console.log(respuesta);
          let $select = $("#cabin_id");
          $.each(respuesta, function (id, name) {
            $select.append('<option class="opt" value='+name.id+' >'+name.name+'</option>');
              /* console.log("select "+name.id); */
          }); 
      }
  
  })
}

$(document).ready(function () {
  $("#limpiar").click(function () {
    $('select[id="client_id"], select[id="cabin_id"], textarea[type="text"]').val("");
  });
});