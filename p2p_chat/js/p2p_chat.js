/* simpel WebRTC peer to peer message and video chat
   thanks to peerjs.com
*/
function gEl(id) {return document.getElementById(id); }
var peer=null, pcon=null;
var my_stream;

function stream_init() {
    var media = navigator.mediaDevices || navigator.media || navigator.webkitmedia || navigator.mozmedia;
    console.log('media', media);
    var devs = media.enumerateDevices();
    console.log('media.devices', devs);
    media.getUserMedia({ video: true , audio: true})
    .then(function (stream) {
        my_stream = stream;
        console.log('my_stream' , stream);
        gEl('local_stream').srcObject = my_stream;
        if (!do_invite())   peer_users();
    })
    .catch(function (err) {
        console.log('media error', err);
        alert(err);
    });
}

function peer_users() {
    pid = getCookie('my_peer_ID');
    if (pid) {
        gEl('src_id').value = getCookie('my_peer_ID');
    }
    gEl('dst_id').value = getCookie('rmt_peer_ID');
    peer_init();
}

function peer_reload() {
    var pid = gEl('src_id').value;
    if (pid)    setCookie('my_peer_ID', pid, 512);
    console.log('reload', pid);
    pid = gEl('dst_id').value;
    if (pid)    setCookie('rmt_peer_ID', pid, 512);
    location.reload();
}

function peer_init(call_back) {
    var pid = gEl('src_id').value;
    setCookie('my_peer_ID', pid, 512);
    if (pid.length < 1) 
        pid = null;
    console.log('peer.init', pid);

    peer = new Peer(pid);
    peer.call_back = call_back;
    peer.on('open', function(id){
        console.log('peer.on open', id);
        msg_add('- listening on ' + id);
        gEl('peer_status').innerHTML = 'Listening';
        gEl('src_id').value = id;
        console.log('call_back', peer.call_back);
        if (peer.call_back)  peer.call_back();
    });
    peer.on('disconnected', function () {
        console.log('Disconnected');
        gEl('peer_status').innerHTML = 'Disconnected from peer server';
        peer = null;
    });
    peer.on('close', function() {
        console.log('Closed');
        gEl('peer_status').innerHTML = 'Connection destroyed. Please ReInit';
        pcon = peer = null;
    });
    peer.on('error', function (err) {
        console.log('peer.ERROR', err);
        pcon = peer = null;
    });
    peer.on('connection', function(peer_conn) {
        pcon = peer_conn;
        console.log('peer.on connection', pcon);
        msg_add('- incomming call: ' + pcon.peer);
        pcon_join(pcon);
    });
    peer.on('call', function(call) {
        console.log('incomming video_call', call);
        console.log('answer video_call' , my_stream);
        msg_add('- incomming video call: ' + call.peer);
        call.answer(my_stream); // Answer the call with an A/V stream.
        call.on('stream', function(rmt_stream) {
            console.log('show rmt stream', rmt_stream);
            gEl('rmt_stream').srcObject = rmt_stream;
        });
    });
}

function pcon_join(pcon, call_back) {
    pcon.on('open', function(){
        msg_add('- call open: ' + pcon.peer);
        console.log('pcon.on: open', pcon.peer);
        gEl('peer_status').innerHTML = 'Connected to: ' + pcon.peer;
        if (peer) peer.disconnect();  //once we have a connection no need for peer server
        if (call_back)  call_back();
    });
    pcon.on('data', function(data){
        msg_add('<------ ' + data);
    });
    pcon.on('close', function () {
        console.log('pcon.on: close');
        msg_add('- call closed: ' + pcon.id);
        gEl('peer_status').innerHTML = 'Disconnected';
    });
}

function peer_connect(call_back) {
    if (!peer) {
        peer_init(call_back);
        return null;
    }
    var pid = gEl('dst_id').value;
    setCookie('rmt_peer_ID', pid, 512);
    msg_add('- calling: ' + pid);
    console.log('peer_connect peer_id', pid);
    if (pcon)
        pcon.close();
    pcon = peer.connect(pid, {debug:2, reliable:true});
    pcon_join(pcon, call_back);
    return pcon;
}

function peer_send() {
    if (!pcon) { pcon = peer_connect(peer_send); return; }
    var msg = gEl('peer_msg').value;
    gEl('peer_msg').value = '';
    msg_add('--> ' + msg);
    pcon.send(msg);
}

function video_connect() {
    if (!peer)  peer_init();
    var pid = gEl('dst_id').value;
    setCookie('rmt_peer_ID', pid, 512);
    console.log('media_connecting', pid);
    msg_add('- video calling: ' + pid);
    console.log('video_calling', pid, my_stream);
    var call = peer.call(pid, my_stream);
    console.log('video_called', pid, call);
    call.on('stream', function(rmt_stream) {
        console.log('rmt_stream', rmt_stream);
        gEl('rmt_stream').srcObject = rmt_stream;
        if (peer)   peer.disconnect();  //once we have a connection no need for peer server
    });
}

function msg_add(msg) {
    var d = new Date();
    gEl('msg_box').innerHTML = d.toLocaleTimeString() + ': ' + msg + '<br>' + gEl('msg_box').innerHTML;
}
function msg_clr() {
    gEl('msg_box').innerHTML = '';
}

function invite() { //make invite url, swap from to
    var inv = (location + '#').split('?')[0].split('#')[0];
    inv = inv + '?from=' + gEl('dst_id').value +'&to=' + gEl('src_id').value;
    console.log(inv);
    navigator.clipboard.writeText(inv).then(function() {
        alert('URL copied to clipboard\n'+ inv);
    });
}
function do_invite() {  //get ?from to pars
    var pars = ('' + location).split('?from=')[1];
    if (!pars)  return 0;
    pars = pars.split('&to=');
    if (pars[0]) {
        gEl('src_id').value = pars[0];
        setCookie('my_peer_ID', pars[0], 512);
        if (pars[1]) {
            gEl('dst_id').value = pars[1];
            peer_init();
            return 1;
        }
    }
    return 0;
}
