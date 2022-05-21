$(".dropbtn").click(function () {
    var state = $("#myP").css("visibility");
   if (state==="hidden") {
       $("#myP").css("visibility", "visible");
   } else {
       $("#myP").css("visibility", "hidden");
   }
});