// Cart logic
function calculateTotal() {
    const total = []
    const items = document.querySelectorAll(".cart-item-price");
    items.forEach(function (item) {
        total.push(parseFloat(item.textContent))
    })
    const totalMoney = total.reduce(function (acc, ele) {
        return acc + ele
    }, 0)
    let result = {}
    result.count = total.length.toString();
    result.totalPrice = totalMoney.toFixed(2);
    return result;

}

function showTotals() {
    let result = calculateTotal()
    document.getElementById('cart-total').textContent = result.totalPrice
    document.querySelector('.item-total').textContent = `₪ ${result.totalPrice}`
    document.getElementById('item-count').textContent = result.count
}

(function () {
    const cartInfo = document.getElementById("cart-info");
    const cart = document.getElementById("cart");

    cartInfo.addEventListener("click", function () {
        cart.classList.toggle("show-cart");
    });
})();
(function () {
    const cartBtn = document.querySelectorAll(".store-item-icon");
    cartBtn.forEach(function (btn) {
        btn.addEventListener("click", function (event) {
            if (event.target.parentElement.classList.contains("store-item-icon")) {
                if (!event.target.parentElement.classList.contains("logged-in")) {
                    alert('על מנת לקנות פריטים באתר יש להירשם ע״י לחיצה על כפתור ״התחבר״ בקצה השמאלי העליון של הדף')
                    return
                }
                let productID = event.target.parentElement.previousElementSibling.id;
                $.ajax({
                    type: "POST",
                    url: "/cart/add",
                    data: JSON.stringify({"id": productID}),
                    contentType: "application/json",
                    dataType: 'json',
                    success: function () {
                        alert("המוצר נוסף בהצלחה לעגלת קניות");
                        location.reload();
                    },
                    error: function (err) {
                        console.log(err)
                        alert("קרתה שגיאה לא ידועה בשרת, אנא נסה שוב.")
                    },
                    async: false
                })
                showTotals();
            }
        });
    });

})();
(function () {
    const cartProducts = document.querySelectorAll(`.cart-item`)
    cartProducts.forEach(function (cartProduct) {
        cartProduct.addEventListener("click", function (event) {
            let productID = event.target.parentElement.parentElement.id
            console.log('Making POST request to remove product with product ID ' + productID)
            $.ajax({
                type: "POST",
                url: "/cart/remove",
                data: JSON.stringify({"id": productID}),
                contentType: "application/json",
                dataType: 'json',
                success: function () {
                    alert("המוצר נמחק בהצלחה לעגלת קניות");
                    location.reload();
                },
                error: function (err) {
                    console.log(err)
                    alert("קרתה שגיאה לא ידועה בשרת, אנא נסה שוב.")
                },
                async: false
            })
            showTotals();
        })
    })
})();

function clearCart() {
    $.ajax({
        type: "POST",
        url: "/clean_cart",
        contentType: "application/json",
        dataType: 'json',
        async: false,
        success: function () {
            alert("עגלת הקניות נמחקה בהצלחה");
            location.reload();
        },
        error: function (err) {
            console.log(err)
            alert("קרתה שגיאה לא ידועה בשרת, אנא נסה שוב.")
        }
    })

    showTotals()
}

showTotals();

(function validateCartNotEmptyOnCheckout() {
    document.getElementById('checkout-cart').addEventListener('click', function (e) {
        let result = calculateTotal();
        if (result.totalPrice > 0) {
            return true;
        } else {
            alert('אין לך פריטים בעגלה. נא הכנס פריטים לפני שתעבור לשתלום');
            e.preventDefault();
            return false;
        }
    })
})();