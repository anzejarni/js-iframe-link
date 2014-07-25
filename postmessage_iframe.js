/* iFrame Connection Script */
/* --- iFrame CHILD side --- */
/* Author: Anže Jarni - Atelje IT */

other_domain = 'http://iframe.example.si';
debug = true;

/* Custom Functions */
function send_document_height()
{
  var height = $(document).height();
  message_sender({'method': 'receieve_document_height', 'values': height});
}

/* End Custom Functions */
if (!window.jQuery)
 alert('jQuery not loaded, but needed for PostMessage');

/* SENDING PART */
//Sending function
function message_sender(message)
{
  parent.postMessage(message, other_domain);
}

/* RECEIVING PART */
//Listening function
function message_listener(event)
{  
  //Security check
  if (event.origin !== other_domain)
  {
    if (debug) 
      console.log("PostMessage: Parent domain incorrect in settings or not allowed");
    return;
  }
  
  //Parse sent data
  var recieved_obj = event.data;
  
  var requested_method = (typeof(recieved_obj.method) !== 'undefined') ? recieved_obj.method : '';
  var requested_values = (typeof(recieved_obj.values) !== 'undefined') ? recieved_obj.values : '';
  
  //Check if requested function is defined and hopefully execute
  if (typeof window[requested_method] == 'function')  
  {
    console.log("PostMessage: Executing parent requested function "+requested_method);
    window[requested_method](requested_values);  
  }
  else if (debug)
    console.log("PostMessage: Cannot call parent requested function "+requested_method);
}

var e_method = window.addEventListener ? "addEventListener" : "attachEvent";
var e_handler = window[e_method];
var e_message_event = e_method == "attachEvent" ? "onmessage" : "message";
e_handler(e_message_event, message_listener);


$(window).load(function()
{
 //Message the parent that iframe has been loaded
 message_sender({'method': 'notify_child_loaded'}) 
});
