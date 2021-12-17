
    import navbar from './components/header.js';

    let promise = new Promise((resolve, reject) => {
        let header = document.getElementById('navbar');

        header.innerHTML = navbar();

        resolve('Navbar imported');
    });
    promise.then((res) => {
        // console.log( res );
        addFunctionalityToNavbar();
        // console.log( 'done' );
    })

    import footer from './components/footer.js';

    let footerDiv = document.getElementById('footer');
    footerDiv.innerHTML = footer();
    createCarousel();
    var total = 0;
    let cart = JSON.parse(localStorage.getItem("cart"));
    console.log("----", cart);
    let courseCart = document.getElementById("courseCart");
    courseCart.innerText = null;
    courseCart.append(cart.length + " Courses in Cart")
    // add(cart);

    if (cart == null) {
        var div = document.getElementById("cart_items")
        div.setAttribute("class", "cart_item")

        var img = document.createElement("img")
        img.src = "https://s.udemycdn.com/browse_components/flyout/empty-shopping-cart-v2.jpg"
        var para = document.createElement("p")
        para.textContent = "Your cart is empty. Keep shopping to find a course"

        var button = document.createElement("button")
        button.textContent = "Keep shopping"


        button.setAttribute("class", "buttons")
        var link = document.createElement("a")
        link.href = "home_page.html"
        link.append(button)


        div.append(img, para, link)
        var p_item = document.getElementById("coursenum")
        p_item.textContent = `${total} Courses in the cart`;
    }
    else {

        add(cart);

    }
    function add(data) {
        // console.log("hii"+data);
        var d = document.getElementById("cart_items");

        data.forEach((el) => {

            let div = document.createElement("div");
            div.setAttribute('class', 'flex mt-2 border')

            let left = document.createElement("div");
            let mid = document.createElement("div");
            let right = document.createElement("div");


            left.style.width = "30%";
            // left.style.border = "2px solid black";
            left.style.marginLeft = "5px";

            mid.style.width = "60%";
            mid.style.marginLeft = "5px";
            // mid.style.border = "2px solid black";


            right.style.width = "10%";
            right.style.margin = "5px";
            // right.style.border = "2px solid black";

            let img = document.createElement("img");
            img.src = el.image;
            left.append(img);
            img.style.width = "100%";
            img.setAttribute('class','cursor-pointer')

            let p = document.createElement("p");
            p.innerText = el.name;
            p.setAttribute('class', 'font-bold cursor-pointer');

            let title = document.createElement("p");
            title.innerText = el.title;
            title.setAttribute('class', 'lg:flex hidden cursor-pointer');

            let author = document.createElement("p");
            author.innerText = el.author;

            let rating = document.createElement("p");
            rating.innerText = el.rating + " ⭐⭐⭐⭐⭐";

            mid.append(p, title, author, rating);


            let price = document.createElement("p");
            price.innerText = "₹ " + el.price;
            price.setAttribute('class', 'font-bold');
            let oldprice = document.createElement("p");
            // text-decoration: line-through;
            oldprice.innerText = "₹ " + el.oldprice;
            oldprice.setAttribute('class', 'line-through');

            let removeDiv = document.createElement('p');
            removeDiv.innerHTML = 'Remove';
            removeDiv.className = 'text-purple-500 mx-8 mt-4 cursor-pointer';
            removeDiv.addEventListener('click', (event) => {
                let child = event.target.parentNode;

                cart = cart.filter((item) => {
                    if (item.title != el.title) return item;
                })

                localStorage.setItem('cart', JSON.stringify(cart));
                child.remove();

                let tot = cart.reduce(price_sum, 0);
                console.log(tot);
                let TotalPrice = document.getElementById("TotalPrice");
                TotalPrice.innerHTML = `Rs. ${tot}`;

                let courseCart = document.getElementById("courseCart");
                courseCart.innerText = `${cart.length} courses in Cart`;
            });
            right.append(price, oldprice);

            div.append(left, mid, removeDiv, right);

            d.append(div);
        });

    }

    function price_sum(ac, el) {

        return ac + el.price;
    }

    var tot = cart.reduce(price_sum, 0);
    console.log(tot);
    let TotalPrice = document.getElementById("TotalPrice");
    TotalPrice.append(tot);


    // let promocode = document.getElementById("promocode").value;
    // console.log(promocode);
    const applied = document.getElementById("applid");
    const paragraph = document.getElementById("paragraph");
    console.log(applied);

    function discount() {
        
        let coupon = document.getElementById("promocode");
        console.log(coupon.value);
         
          
        applied.addEventListener("click",()=>{
            // paragraph.style.display = "none";
            alert("hii");

        })

        if (coupon.value == "masai10") {

            alert('10% discount has been applied');
            var sum = "Rs. " + (tot - (tot * 0.10));
            TotalPrice.innerText = null;
            TotalPrice.append(sum);
            let update = document.getElementById("update");
            update.innerText = null;
            update.append("coupon code is applied");
            update.style.color = "green";
        } else {
            let update = document.getElementById("update");
            update.innerText = null;
            update.append("Coupon Code Not Valid!");
            update.style.color = "red";
            return;
        }

    }

