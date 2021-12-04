// Cart logic
(function GetSavedCart() {
    if (localStorage.getItem('cart')) {
        innerCartHTML = localStorage.getItem('cart')
        const cart = document.getElementById('cart');
        cart.innerHTML = innerCartHTML
        showTotals();
    }
})();
function showTotals() {
    const total = []
    const items = document.querySelectorAll(".cart-item-price");
    items.forEach(function(item) {
        total.push(parseFloat(item.textContent))
    })
    const totalMoney = total.reduce(function(acc, ele) {return acc + ele}, 0)
    const finalMoney = totalMoney.toFixed(2);
    document.getElementById('cart-total').textContent = finalMoney
    document.querySelector ('.item-total').textContent = `₪ ${finalMoney}`
    document.getElementById('item-count').textContent = total.length
}
(function() {
    const cartInfo = document.getElementById("cart-info");
    const cart = document.getElementById("cart");

    cartInfo.addEventListener("click", function() {
        cart.classList.toggle("show-cart");
    });
})();
(function(){
    let idCounter = 0;
    const cartBtn = document.querySelectorAll(".store-item-icon");
    cartBtn.forEach(function(btn) {
        btn.addEventListener("click", function(event) {
            if (event.target.parentElement.classList.contains("store-item-icon")) {
                let fullPath = event.target.parentElement.previousElementSibling.src;
                let imageNameIndex = fullPath.lastIndexOf('/');
                let imageName = fullPath.slice(imageNameIndex);
                let imageRelativePath = `../images/items${imageName}`
                const item = {};
                
                let name = event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
                let price = event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;
                console.log(name);

                item.img = imageRelativePath
                item.name = name
                item.price = price.slice(1).trim()


                const cartItem = document.createElement('div');
                 cartItem.classList.add('cart-item', 'd-flex', 'justify-content-between', 'text-capitalize', 'my-3', `item-num-${idCounter}` );

                 cartItem.innerHTML=`
                    <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="" height=200px width=200px>
                    <div class="item-text">
                        <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
                        <span>₪</span>
                        <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
                    </div>
                    <span id='cart-item-remove' class="cart-item-remove">
                        <i class="fas fa-trash"></i>
                    </span>
                 `
                 const cart = document.getElementById('cart');
                 const total = document.querySelector('.cart-total-container');
                 cart.insertBefore(cartItem, total)
                 localStorage.setItem('cart', cart.innerHTML)
                 alert('item added to the cart');
                 showTotals();
                 document.querySelector(`.item-num-${idCounter}`).addEventListener("click", function(event) {
                     cart.removeChild(cartItem);
                     showTotals();
                 })
                 idCounter += 1;
            }
        });
    });

})();

function clearCart() {
    const cart = document.getElementById('cart');
    document.querySelectorAll(".cart-item").forEach(function(item) {
        cart.removeChild(item)
    })
    localStorage.removeItem('cart')
    showTotals()
}