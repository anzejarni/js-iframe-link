js-iframe-link
==============

Javascript communication module between iframe and parent website, using postMessage.

HTML Parent <-> HTML iFrame

Requirements:
* jQuery (only basic functions are used, so any version should do)

Functionality:
* Communicate with the iFrame of the same or different domain
* Two-way communication
* Custom functions easily integratable
* Easy integration

Default Operation:
* iframe sends notify_child_loaded method request to parent
* parent sends send_document_height method request to iframe
* iframe responds with the request receive_document_height request to parent and attaches value of the height
* parent rescales the iframe size accordingly


Recommendations:
* Custom function convention:
* * Use send_ prefix in functions that return back value
* * Use receive_ prefix in functions that receive back value

Files:
* postmessage_parent.js - used on parent side
* postmessage_child.js - used on iframe side
