function domobj(){
  var self        =this;
  self.products   = []; 

  self.getproducts = function(url){ //1. gets data from json: for loop 1
    $.getJSON(url, function(response){
        for(i=0; i<response.sales.length ; i++){
		  self.products[i] = new productobj(response.sales[i], i); //removed push since it takes more time to execute
		  self.products[i].updatehtml(); //removed push here as well; added this in here so that we can reduce run time by n=self.products.length in another for loop
        }
    });
  }
    
  self.updateproducthtml = function(){ //2. updates the html: for loop 2; This function is not used anymore to avoid another for loop
    for( i=0; i< self.products.length ; i++){
      self.products[i].updatehtml();
    }
  }
  
  self.updatedom = function(){ //4. updates the dom: for loop 3
    var i=0
    thishtml='';
    for( i=0; i< self.products.length ; i++){
      //if (i % 3 == 0 ){  thishtml += "<div class='row'>"; console.log("START") } //removed concept of rows to make things more fluid
      thishtml += self.products[i].htmlview;
      //if ((i % 3 == 2) || i == (self.products.length-1) ){thishtml += "</div>";console.log("FINISH")}
    }
    $("#content").append(thishtml)
  }
}

function productobj(product, i){
  var self          = this;
  self.photo        = product.photos.medium_half
  self.title        = product.name
  self.tagline      = product.tagline
  self.url          = product.url
  self.htmlview     = ""
  self.index        = i
  //self.custom_class = "col"+ ((i % 3) +1) //removed this to remove the concept of rows; that helps in streamlining the items when we remove certain items
  self.custom_class = "col"+ (i+1)
  self.description  = product.description
  self.popup        = "popup"+ (i+1)
  
  self.updatehtml= function(){ //3. comes here to update html
    $.get('product-template.html', function(template){
      self.htmlview = template.replace('{image}', self.photo).replace('{title}', self.title).replace('{tagline}', self.tagline).replace('{url}', self.url).replace(/{custom_class}/g, self.custom_class).replace(/{popup}/g, self.popup).replace('{description}', self.description);
    });
  }
}

function showDesc(id){ //this function shows the description on mouseover
  document.getElementById(id).style.display = 'block';
  $(document).bind('mousemove', function(e){
    $('#'+id).css({
       left:  e.pageX + 20,
       top:   e.pageY
    });
  });
}

function hideDesc(id){
	document.getElementById(id).style.display = 'none';
}

function closeProd(e){
	var parent = e.parentNode;
	parent.classList.add('fadeOut'); //the product fades out when 'x' is clicked
	setTimeout(function(){
		parent.remove();
	}, 500);
}

function onReady(callback) {
    var intervalID = window.setInterval(checkReady, 2100); //interval set to right after the page loading is done in the background

    function checkReady() {
        if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(intervalID);
            callback.call(this);
        }
    }
}

function show(id, value) {
    document.getElementById(id).style.display = value ? 'block' : 'none';
}

onReady(function () {
    show('body_container', true);
    show('loading', false); // added a loading symbol till the process is done in background
});

var page=new domobj();
page.getproducts('data.json');
//setTimeout("console.log('building html');page.updateproducthtml();",900);//was initially set to 20; removed this to avoid one for loop
setTimeout("page.updatedom()",2000)//was initially set to 50