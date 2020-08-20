function ParseLINEFEED() {
  for (i = 0; i < document.getElementsByTagName("td").length; i++) {
    var x = document.getElementsByTagName("td")[i].innerHTML;
    document.getElementsByTagName("td")[i].innerHTML = x.replace("LINEFEEED cpe", "");
  }
  for (i = 0; i < document.getElementsByTagName("td").length; i++) {
    var x = document.getElementsByTagName("td")[i].innerHTML;
    document.getElementsByTagName("td")[i].innerHTML = x.replace(new RegExp("LINEFEED", "g"), "<br />");
  }
}
