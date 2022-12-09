/* simple navigation
Usage:
<head>
  <link rel='stylesheet' href='css/nav.css'>
  <script src='js/nav.js'></script>
</head>
<body>
    <div class='topnav'>
      <a href='#home' class='active' id='title' onclick='nav_group()'>p2p Chat</a>
      <div id='groups'></div>
      <a href='javascript:void(0);' class='icon' onclick='nav_toggle()'><i class='fa fa-bars'></i></a>
    </div>
    <div class='divnav' id='Home'>Home code here</div>
    <div class='divnav' id='Settings'>Settings comes here</div>
    <div class='divnav' id='About'>About comes here</div>
    <script>nav_init(['Home', 'Settings', 'Help']);</script>
</body>
*/

var nav_groups;

function nav_toggle() {
  var x = gEl('groups');
  x.style.display = (x.style.display === 'block') ? 'none' : 'block';
}

function nav_init(groups) {
    var x, lnk, gr_active;
    var loc = '' + location;
    x = home = '';
    nav_groups = groups;
    for (var i=0; i<nav_groups.length; ++i) {
        gr = nav_groups[i];
      lnk = "<a href='#" + gr + "' onclick='nav_group(\"" + gr +"\")'>";
      x += lnk + gr + '</a>';
      home += lnk + "<div class='btn'>" + gr + "</div></a>";
      if (loc.indexOf('#'+gr) >=0)
        gr_active = gr;
    }
    gEl('groups').innerHTML = x;
    nav_group(gr_active);
}

function nav_group(gr) {
  if (gr == null) gr = 'Home';
  gEl('title').innerHTML = 'p2p_chat' + '.' + gr;
  gEl('groups').style.display = 'none';
  for (var i=0; i<nav_groups.length; ++i) {
    if (nav_groups[i] != gr)    gEl(nav_groups[i]).style.display = 'none';
  }
  gEl(gr).style.display = 'block';
}
