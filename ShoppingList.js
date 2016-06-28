var inputs = document.getElementsByTagName("input");
var prodList = new Array();
var cart = new Array();
var cartQty = new Array();

buildProdList();

//gets all radio buttons and puts them into prodList[]
function buildProdList() {
  for (i = 0; i < inputs.length; i++) {
    if (inputs[i].getAttribute("type") == "radio")
      prodList.push(inputs[i]);
  }
}

//adds the selected item to the cart or increases the qty
function addToList() {
  var selected = getSelected();
  var pos = cart.indexOf(selected);
  if(pos >= 0)
  	cartQty[pos]++;
  else{
	cart.push(selected);
	cartQty.push(1);
  }
  
  document.getElementById("output").innerHTML = getCartText();
}

//goes through prodList[] and finds the 'selected' item
function getSelected() {
  for (i = 0; i < prodList.length; i++) {
    if (prodList[i].checked) {
      return prodList[i];
    }
  }
}

//checks list for item being added
function indexOfProd(selected){
	for (i = 0; i < cart.length; i++) {
		if(cart[i].id == selected.id)
			return i;
	}
	return -1;
}

//returns each item of the cart on a new line
function getCartText() {
  var cartText = "";
  for (i = 0; i < cart.length; i++) {
     cartText += cart[i].id + "  (x" + cartQty[i] +")  $" + cart[i].value + "<br/>";
  }
  return cartText;
}

//adds up total in cart and displays receipt
function checkOut() {
  var subTotal = 0.00;
  for (i = 0; i < cart.length; i++) {
    subTotal += (parseFloat(cart[i].value) * parseFloat(cartQty[i]));
  }
  var tax = .06 * subTotal;
  var total = subTotal + tax;
  document.getElementById("output").innerHTML = getCartText()+"<br/>Subtotal: $"+subTotal.toFixed(2)+"<br/>Tax: $"+tax.toFixed(2)+"<br/>Total: $"+total.toFixed(2);
  cart = new Array();
  cartQty = new Array();
}