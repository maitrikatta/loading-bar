window.onload = function(){

  var btn = document.getElementById("btn");
  var div = document.getElementById("container");         //getting elements
  var loadbar = document.getElementById("loading-bar");


  btn.onclick = function(){
    const xhr = new XMLHttpRequest();  //creating object and open the request
    xhr.open("GET","textfile.txt",true); //by default 3rd argument is true/asynchronus and you can't make it false/synchronus.
    xhr.send(null);                   // order of open and send matters, first you open

    var filesize;  // to store file size(in bytes) got via response header
    xhr.onreadystatechange = function(){
      if(xhr.status==200 || xhr.readyStatus==4){
         filesize = xhr.getResponseHeader("content-length"); //response headers are only available when status == 200 or
      }                                                      // readyState == 4 for that xhr file
    }

    var per;
    xhr.onprogress = function(){
      per = Math.round((xhr.response.length/filesize)*100);
      div.innerText = "Loading please wait..."+per+"%";           //printing msg to wait for while.
      loadbar.style.width=(xhr.response.length/filesize)*100 +''+ "%"; //logic to increase width in percentage of loader
    }

    xhr.onload = function(){    // event fired after content is loaded totally
      div.innerText = xhr.responseText; //inserting content
      loadbar.style.width="0%"; //setting width of loader to zero after success
    }

  }
};
