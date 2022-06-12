// JS methods and function


let discount = 0;
let shippingCost = 0;
let shoppingCart = (function() {
    
    cart = [];
    
    // Constructor
    function Item(name, price, count) {
      this.name = name;
      this.price = price;
      this.count = count;
    }
    
    // Save cart
    function saveCart() {
      sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
    
      // Load cart
    function loadCart() {
      cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
      loadCart();
    }
    
  

    let obj = {};
    
    // Add to cart
    obj.addItemToCart = function(name, price, count) {
      for(let item in cart) {
        if(cart[item].name === name) {
          cart[item].count ++;
          saveCart();
          return;
        }
      }
      let item = new Item(name, price, count);
      cart.push(item);
      saveCart();
    }
    // for loop to set count
    obj.setCountForItem = function(name, count) {
      for(let i in cart) {
        if (cart[i].name === name) {
          cart[i].count = count;
          break;
        }
      }
    };
    // Remove item from cart
    obj.removeItemFromCart = function(name) {
        for(let item in cart) {
          if(cart[item].name === name) {
            cart[item].count --;
            if(cart[item].count === 0) {
              cart.splice(item, 1);
            }
            break;
          }
      }
      saveCart();
    }
  
    // Remove all items from cart
    obj.removeItemFromCartAll = function(name) {
      for(let item in cart) {
        if(cart[item].name === name) {
          cart.splice(item, 1);
          break;
        }
      }
      saveCart();
    }
  
    // Clear cart
    obj.clearCart = function() {
      cart = [];
      saveCart();
    }
  
    // Count cart 
    obj.totalCount = function() {
      let totalCount = 0;
      for(let item in cart) {
        totalCount += cart[item].count;
      }
      return totalCount;
    }
  
    // Total cart
    obj.totalCart = function() {
      let totalCart = 0;
      for(let item in cart) {
        totalCart += cart[item].price * cart[item].count;
      }
      console.log('Shipping Cost', shippingCost);
      return Number(totalCart - discount + shippingCost);
    }

    obj.subTotal = function() {
        let vat = 0;
        let total = 0;
        for(let item in cart){
            total += cart[item].price * cart[item].count;

        }

        vat = total * 0.15;
        subTotal = total - vat;

        return Number(subTotal.toFixed(2));
    }


    obj.vat = function(){

        let subTotal = 0;
        let vat = 0;
        let total = 0;
        for(let item in cart){
            total += cart[item].price * cart[item].count;

        }

        vat = total * 0.15;
        return Number(vat.toFixed(2));
    }


    obj.redeemed = function () { 
        redeemed = discount;
        return Number(redeemed);
    }

    obj.shipping = function () { 
        shipping = shippingCost;
        return Number(shipping);
    }
  
    // List cart
    obj.listCart = function() {
      let cartCopy = [];
      for(i in cart) {
        item = cart[i];
        itemCopy = {};
        for(p in item) {
          itemCopy[p] = item[p];
  
        }
        itemCopy.total = Number(item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy)
      }
      return cartCopy;
    }

  
    return obj;
  })();
  



  // Add item
  $('.add-to-cart').click(function(event) {
    event.preventDefault();
    let name = $(this).data('name');
    let price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
    let total = 0;
        for(let item in cart){
            total += cart[item].price * cart[item].count;

        }

    alert('Total: R ' + Number(total.toFixed(2)));
  });
  
  // Clear items
  $('.clear-cart').click(function() {
    shoppingCart.clearCart();
    displayCart();
  });
  

  function displayCart() {
    
    let cartArray = shoppingCart.listCart();
    let output = "";
    for(let i in cartArray) {
      output += "<tr>"
        + "<td>" + cartArray[i].name + "</td>" 
        + "<td>R " + cartArray[i].price.toFixed(2) + "</td>"
        + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
        + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
        + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
        + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
        + " = " 
        + "<td>R" + cartArray[i].total + "</td>" 
        +  "</tr>";
    }
    $('.show-cart').html(output);
    $('.sub-total').html(shoppingCart.subTotal().toFixed(2));
    $('.discount-total').html(shoppingCart.redeemed().toFixed(2));
    $('.shipping-total').html(shoppingCart.shipping().toFixed(2));
    


    $('.total-vat').html(shoppingCart.vat().toFixed(2));
    $('.total-cart').html(shoppingCart.totalCart().toFixed(2));
    $('.total-count').html(shoppingCart.totalCount());
    console.log('Discount: ',discount);

  }
  
  // remove items with button
  
  $('.show-cart').on("click", ".delete-item", function(event) {
    let name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
  })
  
  
  // decrease amount of items
  $('.show-cart').on("click", ".minus-item", function(event) {
    let name = $(this).data('name')
    shoppingCart.removeItemFromCart(name);
    displayCart();
  })
  // increase items
  $('.show-cart').on("click", ".plus-item", function(event) {
    let name = $(this).data('name')
    shoppingCart.addItemToCart(name);
    displayCart();
  })
  
  // Item count input
  $('.show-cart').on("change", ".item-count", function(event) {
     let name = $(this).data('name');
     let count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
  });

  displayCart();
  
  
function onChangeShipping(){
    
    let shippingTypeSelected = document.getElementById("shippingType").value;
    
    if(shippingTypeSelected == 1){
        document.getElementById('shipping-Option').style.display = "block";
    }
    else{
        document.getElementById('shipping-Option').style.display = "none";
    }
};

function proceedPayment(){
    let reference = Math.random().toString(36).substr(2, 8);
    let total;
    let totalCart = 0;
      for(let item in cart) {
        totalCart += cart[item].price * cart[item].count;
      }
      console.log('Shipping Cost', shippingCost);
      total = Number(totalCart - discount + shippingCost);
    alert( 'Total: R' + total + ' Ref Number: ' + reference);
    
    
 };
  

function onChangeShippingOption(){

    let shippingOptionSelected = document.getElementById("shippingOption").value;

    if(shippingOptionSelected){
        shippingCost = Number(shippingOptionSelected);
    }

    console.log('Shipping Option: '  + shippingOptionSelected);

    displayCart();
}


// discount coupon
$(".redeem-btn").click(function(){
    console.log('Redeem Clicked');
    document.getElementById( 'promoForm' ).style.display = 'none';
    document.getElementById( 'promoDiv' ).style.display = 'block';
    discount = 50;
    
    console.log('Discount: ',discount);
    
    displayCart();



});

// jquery fade for images
$(".productItem").click(function(){
    $(this).fadeOut(1000);
    $(this).fadeIn(2000);

});

// Chaining method
$(document).ready(function() {
    $("#paymentSel").click(function() {
        

         //assigning the background color
        $("#secPay")
        //using slide up method
        .slideUp(2000)
         //using slide down method
        .slideDown(2000)
        alert("Payment method selected!")

    });
    
});

$("#catNav li").hover(function() {
    let isHovered = $(this).is(":hover");
    if (isHovered) {
      $(this).children("#ulHov").stop().slideDown(300);
    } else {
      $(this).children("#ulHov").stop().slideUp(300);
    }
});

// jquery toggle on images  
$("#trendP").hover(function(){
    $(this).animate({
     width: "toggle"
      });
 
});

$("#trendP2").hover(function(){
    $(this).animate({
     width: "toggle"
      });
 
});

$("#trendP3").hover(function(){
    $(this).animate({
     width: "toggle"
      });
 
});

$("#trendP4").hover(function(){
    $(this).animate({
     width: "toggle"
      });
 
});



// alert when we you click request button on form 
function request() {
    alert("You will receive a call within 24hrs");
    console.log(request);
}

