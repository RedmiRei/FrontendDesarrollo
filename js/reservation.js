var urlRest = 'http://140.238.155.247:8080/api/Reservation/';
var urlClient = "http://140.238.155.247:8080/api/Client/all";
var urlCabin = "http://140.238.155.247:8080/api/Cabin/all";

/* var urlRest = 'http://localhost:8080/api/Reservation/'; 
var urlClient = "http://localhost:8080/api/Client/all";
var urlCabin "http://localhost:8080/api/Cabin/all"; */

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
  /* myTable+="<td class='bsi bt bti sty'> Id </td>"; */
  myTable += "<td class='bt sty bsi'>   StartDate </td>";
  myTable += "<td class='bt sty'>       DevDate </td>";
  myTable += "<td class='bt sty'>       Status </td>";
  myTable += "<td class='bt sty'>       Client </td>";
  myTable += "<td class='bt sty btf'>   Cabin </td>";
  /* myTable += "<td class='styt'></td>"; */
  myTable += "<td class='btu'>       Update </td>";
  myTable += "<td class='btd'>       Delete </td>";
  myTable += "</tr>";
  myTable += "<tr class='tr'></tr>";
  myTable += "</div>";

  for (i = 0; i < items.length; i++) {
    myTable += "<tr class='animate__animated animate__slideInDown'>";
    myTable += "<td class='bt bti'>" +  items[i].startDate.split("T")[0] + "</td>";
    myTable += "<td class='bt'>" +      items[i].devolutionDate.split("T")[0] + "</td>";
    myTable += "<td class='bt'>" +      items[i].status + "</td>";
    myTable += "<td class='bt'>" +      items[i].cabin.name + "</td>";
    myTable += "<td class='bt btf'>" +  items[i].client.name + "</td>";
    /* myTable+="<td></td>"; */
    myTable += "<td> <button class='updateSend' onclick='sendReg(" + items[i].idReservation + ") '><i class='fas fa-pen-square'></i></button>                     <br>                                                                  <button class='updateSend animate__animated animate__slideInDown' onclick='updateInf(" + items[i].idReservation + ") '><i class='fas fa-undo-alt'></i></button>";
    myTable += "<td> <button class='delete' onclick='deleteInf(" + items[i].idReservation + ")'><i class='fas fa-trash-alt'></i></button>";
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
      startDate: $("#startDate").val(),
      devolutionDate: $("#devolutionDate").val(),
      status: $("#status").val(),
      client:{ idClient: + $("#client_id").val()},
      cabin:{ id: + $("#cabin_id").val()},
      
    };
    let dataToSend = JSON.stringify(myData);
    console.log(myData);

    $.ajax({
      url: urlRest + "save",
      type: 'POST',
      data: dataToSend,
      datatype: 'JSON',
      contentType: "application/JSON; charset=utf-8",
      success: function (respuesta) {
        console.log(respuesta);
        $("#resultado").empty();
        $("#startDate").val("");
        $("#devolutionDate").val("");
        $("#status").val("");
        $("#client_id").val("");
        $("#cabin_id").val("");
        alert("The fields have been saved");
        visualizeInf();
      },

      error: function(jqXHR, textStatus, errorThrown) {
        alert("The fields have not been saved");
        visualizeInf();
      }, 

    });
  };
  
}

function updateInf(idElemento) {
    /* let status = $("#status").val(); */
    /* let status1
    if (status1 == 1) {
        status1 = 'completed'
    } else {
        status1 = 'cancelled'
    } */
  if (validateFields()) {
    let myData = {
      idReservation: idElemento,
      startDate: $("#startDate").val(),
      devolutionDate: $("#devolutionDate").val(),
      status: $("#status").val(),
      client:{ idClient: + $("#client_id").val()},
      cabin:{ id: + $("#cabin_id").val()},
      
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
        $("#startDate").val("");
        $("#devolutionDate").val("");
        $("#status").val("");
        $("#client_id").val("");
        $("#cabin_id").val("");
        alert("The fields have been updated");
        visualizeInf();
      },
    });
  };
}

function deleteInf(idElemento) {
  if (
    $("#startDate").val().length != 0 ||
    $("#devolutionDate").val().length != 0
  ) {
    $("#startDate").val("");
    $("#devolutionDate").val("");
    $("#status").val("");
    $("#client_id").val("");
    $("#cabin_id").val("");
  }
  let myData = {
    id: idElemento,
  };
  let dataToSend = JSON.stringify(myData);
  $.ajax({
    url: urlRest + idElemento,
    type: "DELETE",
    data: dataToSend,
    contentType: "application/JSON;",
    datatype: "JSON",
    success: function (respuesta) {
      console.log(respuesta), $("#resultado").empty();
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
      $("#startDate").val(respuesta.startDate.split("T")[0]);
      $("#devolutionDate").val(respuesta.devolutionDate.split("T")[0]);
      if(respuesta.status == "created"){
        $("#status").val("");
        console.log("entro1");
      }else{
        $("#status").val(respuesta.status);
      }
      $("#client_id").val(respuesta.client.idClient); 
      $("#cabin_id").val(respuesta.cabin.id);
    },
  });
}

function validateFields() {
  if ($("#startDate").val() == "") {
    alert("Start Date is Empty!");
    $("#startDate").focus();
    return false;
  } else {
    if ($("#devolutionDate").val() == "") {
      alert("Devolution Date is Empty!");
      $("#devolutionDate").focus();
      return false;
    } else {
      if ($("#status").val() == "") {
        alert("Status is Empty!");
        $("#status").focus();
        return false;
      } else {
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
            return true;
          }
        }
      }
    }
  }
}
  
function selectIdClient(){
    console.log("Se esta ejecutando")
    $.ajax({
        url: urlClient,
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
        url: urlCabin,
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
    $('input[type="date"], select[id="status"], select[id="client_id"],select[id="cabin_id"]').val("");
  });
});


