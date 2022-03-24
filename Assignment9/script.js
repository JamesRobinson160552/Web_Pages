
//fire the getData() function when the page loads
$(document).ready(function() {

    //initialize dialog box (jQuery UI) with config settings (show/hide animation)
    $("#dialog").dialog({
        autoOpen: false,
        show: {
            effect: "blind",
            duration: 1000
        },
        hide: {
            effect: "explode",
            duration: 1000
        }
    });

    //get all the data
    getData();

});

//this method will "get" all data, build the table rows and insert the HTML into the table body
function getData() {

    //make a request to server.php
    $.get("http://localhost:8080/api/customers", function(data)  {

        //iterate over the JSON response, building an HTML string
        var html_string = "";
            
        $(data).each(function(key, object) {
     
            //HTML table row
            html_string += "<tr id=\"" + object['customer_id'] + "\"><td>" + object['first_name'] + "</td><td>" + object['last_name'] + "</td><td>"
            html_string += "<a href=\"#\" onclick=\"getOrdersByCustomerId(" + object['customer_id'] + "); return false;\">view detail</a>";
            html_string += "&nbsp;<a href=\"#\" onclick=\"deleteCustomer(" + object['customer_id'] + "); return false;\">delete</a>";
            html_string += "</td></tr>";
    
        });
    
        //set the HTML string on the client
        $("#table_body").html(html_string);
    
    });

}

function deleteCustomer(customer_id) {
    $.ajax({
        url: "http://localhost:8080/api/customers/" + customer_id,
        type: 'DELETE',
        success: function (result) {
            alert("Customer deleted.");
            document.getElementById(customer_id).style.display = "none";
        }
    });
}

//hack
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createCustomer() {
    
    //hack
    var customer_id = getRandomInt(1000,2000);

    var first_name = $("#first_name").val();
    var last_name = $("#last_name").val();
    var email = $("#email").val();

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/customers/",
        data: { "customer_id" : customer_id, "last_name" : last_name, "first_name": first_name, "email" : email },
        statusCode: {
            200: function (response) {
                alert("Customer created.");
                $("#first_name").val("");
                $("#last_name").val("");
                $("#email").val("");

    
                html_string = "<tr id=\"" + customer_id + "\"><td>" + first_name + "</td><td>" + last_name + "</td><td>"
                html_string += "<a href=\"#\" onclick=\"getOrdersByCustomerId(" + customer_id + "); return false;\">view detail</a>";
                html_string += "&nbsp;<a href=\"#\" onclick=\"deleteCustomer(" + customer_id + "); return false;\">delete</a>";
                html_string += "</td></tr>"

                //add the row to the UI
                $('#table_body').append(html_string);

            }
        },
        dataType: "json"
      });
}


//this method will "get" a specific record (by id) and open a Dialog to view the details (e.g. email address)
function getOrdersByCustomerId(customer_id) {

    //make a request to server.php
    $.get("http://localhost:8080/api/orders/customer/" + customer_id, function(data)  {

        var html_string = "";

        //build the dynamic HTML
        html_string += "<ul>";
        for (var i = 0; i < data.length; i++) {
            var order = data[i];
            html_string += "    <li>" + order['date'] + " Order #" + order['order_id'] + ", $" + order['total'] + "<br/><br/>";
            html_string += "    " + order['description'] + "<br/><br/></li>";
        }
        html_string += "</ul>";


        //set the HTML in the div on the dialog
        $("#dialog_content").html(html_string);

        //open the dialog
        $("#dialog").dialog("open");

    });

}
