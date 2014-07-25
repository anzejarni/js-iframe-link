/* iFrame Connection Script */
/* --- iFrame PARENT side --- */
other_domain = 'http://www.example.si';
iframe_id = 'iframe';
debug = true;

/* Custom Functions */
function receieve_document_height(height)
{
  console.log('Height of loaded iFrame is '+height);
  document.getElementById(iframe_id).height = height;
}

function notify_child_loaded()
{
  if (debug)
    console.log('iFrame loaded: '+iframe_id);
    message_sender({'method': 'send_document_height'});
}

/* End Custom Functions */


function sanity_check()
{
  if (typeof jQuery == 'undefined')
   alert('PostMessage: jQuery not loaded!');
  if ($('#'+iframe_id).length == 0)
   alert('PostMessage: iframe with id does not exist in DOM: '+iframe_id);
}


/* SENDING PART */
//Sending function
function message_sender(message)
{
  //console.log(message)
  document.getElementById(iframe_id).contentWindow.postMessage(message, other_domain);
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
   //console.log(event.data);
  var received_obj = event.data;
 
  
  var requested_method = (typeof(received_obj.method) !== 'undefined') ? received_obj.method : '';
  var requested_values = (typeof(received_obj.values) !== 'undefined') ? received_obj.values : '';
  
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
 sanity_check();
});

