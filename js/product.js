document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // COMPLETE PRODUCT DATABASE
    // ==========================================
    const productsData = {
        // BURGERS
        "double": { name: "The Double", price: "$14.00", weight: "250 g", kcal: "610 kcal", desc: "Two 90g patties, smashed thin, American cheese, pickles, and our signature Ember sauce on a toasted potato bun.", allergens: "Contains: Gluten, Milk, Egg.", image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        "classic": { name: "The Classic", price: "$12.00", weight: "200 g", kcal: "520 kcal", desc: "Single 120g patty, cheddar, crisp lettuce, tomato, and house mayo. The original smash hit.", allergens: "Contains: Gluten, Milk, Egg.", image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        "spicy": { name: "Spicy Ember", price: "$15.00", weight: "260 g", kcal: "650 kcal", desc: "Pepper jack cheese, fresh jalapeños, crispy onions, and spicy chipotle sauce. For those who like the heat.", allergens: "Contains: Gluten, Milk.", image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        "veggie": { name: "Veggie Stack", price: "$11.00", weight: "220 g", kcal: "450 kcal", desc: "Crispy plant-based patty with lettuce, tomatoes, pickles, onions, and creamy house sauce.", allergens: "Contains: Gluten, Soy, Mustard, Sesame.", image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        
        // CHICKEN
        "hot-chicken": { name: "Hot Chicken", price: "$13.00", weight: "240 g", kcal: "580 kcal", desc: "Crispy fried chicken thigh, Nashville hot sauce, pickles, and slaw on a toasted bun.", allergens: "Contains: Gluten, Milk, Egg.", image: "https://images.unsplash.com/photo-1615719413546-198b25453f85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        "crispy-chicken": { name: "Crispy Chicken", price: "$12.50", weight: "230 g", kcal: "540 kcal", desc: "Classic crispy chicken breast, lettuce, tomato, and mayo.", allergens: "Contains: Gluten, Egg.", image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        "strips": { name: "Chicken Strips", price: "$8.00", weight: "200 g", kcal: "420 kcal", desc: "Three pieces of crispy chicken tenders served with your choice of dipping sauce.", allergens: "Contains: Gluten.", image: "https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        "chicken-melt": { name: "Chicken Melt", price: "$11.50", weight: "220 g", kcal: "510 kcal", desc: "Grilled chicken, melted cheese, caramelized onions on sourdough.", allergens: "Contains: Gluten, Milk.", image: "https://images.unsplash.com/photo-1550507992-eb63ffee0847?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        
        // SIDES
        "loaded-fries": { name: "Loaded Ember Fries", price: "$7.50", weight: "300 g", kcal: "480 kcal", desc: "Topped with cheese sauce, bacon bits, and our signature spice dust.", allergens: "Contains: Milk.", image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        "onion-rings": { name: "Crispy Onion Rings", price: "$6.00", weight: "180 g", kcal: "350 kcal", desc: "Thick-cut, beer-battered, and fried to golden perfection.", allergens: "Contains: Gluten.", image: "https://images.unsplash.com/photo-1639024471283-03518883512d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        "classic-fries": { name: "Classic Fries", price: "$4.50", weight: "150 g", kcal: "310 kcal", desc: "Golden, crispy, and perfectly salted.", allergens: "Vegan.", image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        "chicken-bites": { name: "Chicken Bites", price: "$7.00", weight: "200 g", kcal: "400 kcal", desc: "Bite-sized crispy chicken pieces.", allergens: "Contains: Gluten.", image: "https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        
        // ICE CREAM
        "strawberry-sundae": { name: "Strawberry Sundae", price: "$5.00", weight: "180 g", kcal: "280 kcal", desc: "Vanilla ice cream topped with fresh strawberry sauce.", allergens: "Contains: Milk.", image: "https://images.unsplash.com/photo-1557142046-c704a3adf364?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        "chocolate-crunch": { name: "Chocolate Crunch", price: "$5.50", weight: "200 g", kcal: "350 kcal", desc: "Chocolate ice cream with chocolate chips and crunchies.", allergens: "Contains: Milk, Soy.", image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        "vanilla-cone": { name: "Vanilla Cone", price: "$3.50", weight: "120 g", kcal: "200 kcal", desc: "Classic soft serve vanilla in a crispy cone.", allergens: "Contains: Milk, Gluten.", image: "https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        "caramel-sundae": { name: "Caramel Sundae", price: "$5.00", weight: "180 g", kcal: "300 kcal", desc: "Vanilla ice cream with rich caramel sauce.", allergens: "Contains: Milk.", image: "https://images.unsplash.com/photo-1559703248-dcaaec9fab78?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        
        // SHAKES
        "vanilla-shake": { name: "Vanilla Shake", price: "$6.00", weight: "400 ml", kcal: "450 kcal", desc: "Thick, creamy vanilla milkshake.", allergens: "Contains: Milk.", image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        "chocolate-shake": { name: "Chocolate Shake", price: "$6.50", weight: "400 ml", kcal: "480 kcal", desc: "Rich chocolate milkshake topped with whipped cream.", allergens: "Contains: Milk.", image: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        "strawberry-shake": { name: "Strawberry Shake", price: "$6.50", weight: "400 ml", kcal: "460 kcal", desc: "Fresh strawberry milkshake.", allergens: "Contains: Milk.", image: "https://images.unsplash.com/photo-1587563974854-874861616062?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        "peanut-shake": { name: "Peanut Butter Shake", price: "$7.00", weight: "400 ml", kcal: "550 kcal", desc: "Creamy peanut butter blended into a thick shake.", allergens: "Contains: Milk, Peanuts.", image: "https://images.unsplash.com/photo-1553787499-6f9133860278?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        
        // DRINKS
        "lemonade": { name: "Classic Lemonade", price: "$3.50", weight: "500 ml", kcal: "150 kcal", desc: "Freshly squeezed lemonade.", allergens: "Vegan.", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        "cola": { name: "Cola Zero", price: "$3.00", weight: "330 ml", kcal: "0 kcal", desc: "Chilled Cola Zero.", allergens: "Vegan.", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        "mango-drink": { name: "Mango Yuzu", price: "$4.00", weight: "400 ml", kcal: "120 kcal", desc: "Refreshing mango and yuzu blend.", allergens: "Vegan.", image: "https://images.unsplash.com/photo-1546173159-315724a31696?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        "water": { name: "Sparkling Water", price: "$2.50", weight: "330 ml", kcal: "0 kcal", desc: "Chilled sparkling water with a slice of lime.", allergens: "Vegan.", image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
    };

    // Get ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    // Get data
    const currentProduct = productsData[productId] || productsData["double"];

    // Update Page Content
    document.title = `${currentProduct.name} | Bunzo Burgers`;
    document.getElementById("breadcrumb-name").innerText = currentProduct.name.toUpperCase();
    
    document.getElementById("product-image").src = currentProduct.image;
    document.getElementById("product-name").innerText = currentProduct.name;
    document.getElementById("product-price").innerText = currentProduct.price;
    document.getElementById("product-weight").innerText = currentProduct.weight;
    document.getElementById("product-kcal").innerText = currentProduct.kcal;
    
    document.getElementById("product-weight-table").innerText = currentProduct.weight;
    document.getElementById("product-kcal-table").innerText = currentProduct.kcal;

    document.getElementById("product-desc").innerText = currentProduct.desc;
    document.getElementById("product-allergens").innerText = currentProduct.allergens;

    // ORDER NOW BUTTON ANIMATION
    const orderNowBtn = document.getElementById("order-now-btn");
    if(orderNowBtn) {
        orderNowBtn.addEventListener("click", () => {
            orderNowBtn.innerHTML = `Added! <i class="fa-solid fa-check"></i>`;
            orderNowBtn.style.background = "#4caf50";
            orderNowBtn.style.color = "#fff";
            orderNowBtn.style.borderColor = "#4caf50";
            
            setTimeout(() => {
                // Revert text back to Order Now
                orderNowBtn.innerHTML = `Order Now <i class="fa-solid fa-arrow-right"></i>`;
                orderNowBtn.style.background = "var(--ember-orange)";
                orderNowBtn.style.color = "var(--bg-black)";
                orderNowBtn.style.borderColor = "var(--ember-orange)";
            }, 2000);
        });
    }
});