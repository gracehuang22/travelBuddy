var function getYelp() {
   $.ajax({
      type:"POST",
      url:'yelpAPI.php',
      datatype:'json',
      data: {functionname: 'add', arguments: [1, 2]},
      success: function (obj, textstatus) {
            if( !('error' in obj) ) {
                yourVariable = obj.result;
            }
            else {
                console.log(obj.error);
            }
      }
  });
  return false;
}