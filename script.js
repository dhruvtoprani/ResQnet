document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("disaster-form");
    const listNftButton = document.getElementById("list-nft");

    let generatedNFT = null;

    // 🚀 Handle NFT Generation with Alerts
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const disasterType = document.getElementById("disaster-type").value.trim();
            const disasterLocation = document.getElementById("disaster-location").value.trim();
            const instantBuyPrice = parseInt(document.getElementById("instant-buy-price").value.trim());

            if (!disasterType || !disasterLocation) {
                alert("❌ Please enter both a disaster type and location.");
                return;
            }

            // Show alert instead of popup
            alert("⚠️ Unable to generate image due to insufficient funds!");

            // Generate NFT Data
            generatedNFT = {
                name: disasterType,
                location: disasterLocation,
                timeCreated: new Date().toLocaleString(),
                instantBuy: instantBuyPrice , // ✅ Fix: Ensure instantBuy price is set
            };

            // 🚀 Show NFT Data in Alert
            alert(`🎨 NFT Created!\n\n📌 Disaster: ${generatedNFT.name}\n📍 Location: ${generatedNFT.location}\n⏳ Time Created: ${generatedNFT.timeCreated}`);

            // ✅ Offer to List NFT Immediately
            let confirmList = confirm("Do you want to list this NFT?");
            if (confirmList) {
                let nfts = JSON.parse(localStorage.getItem("nfts")) || [];
                nfts.push(generatedNFT);
                localStorage.setItem("nfts", JSON.stringify(nfts));

                alert("✅ NFT Listed Successfully!");
            }
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    displayMarketplace();
});

function displayMarketplace() {
    let marketplace = document.getElementById("marketplace");
    if (!marketplace) return;
    marketplace.innerHTML = "";

    let nfts = JSON.parse(localStorage.getItem("nfts")) || [];

    if (nfts.length === 0) {
        marketplace.innerHTML = "<p>No NFTs available in the marketplace.</p>";
        return;
    }

    nfts.forEach((nft, index) => {
        let card = document.createElement("div");
        card.className = "nft-card";
        card.innerHTML = `
            <h3>${nft.name}</h3>
            <p>📍 <strong>Location:</strong> ${nft.location}</p>
            <p>⏳ <strong>Created:</strong> ${nft.timeCreated}</p>
            <p>💰 <strong>Price:</strong> ${nft.instantBuy} ResQ Coins</p>
            <button class="purchase-btn" onclick="purchaseNFT(${index}, ${nft.instantBuy})">Purchase Now</button>
        `;
        marketplace.appendChild(card);
    });
}

// 🚀 Purchase NFT Function
function purchaseNFT(index, price) {
    let balance = parseInt(localStorage.getItem("resqCoins")) || 1000;

    if (balance < price) {
        alert("⚠️ Not enough ResQ Coins!");
        return;
    }

    balance -= price;
    localStorage.setItem("resqCoins", balance);
    document.getElementById("resq-balance").innerText = balance;

    let nfts = JSON.parse(localStorage.getItem("nfts")) || [];
    let myNFTs = JSON.parse(localStorage.getItem("myNFTs")) || [];

    if (index >= 0 && index < nfts.length) {
        let purchasedNFT = nfts[index];
        purchasedNFT.purchaseDate = new Date().toLocaleString();
        purchasedNFT.purchasePrice = price;

        myNFTs.push(purchasedNFT);
        nfts.splice(index, 1);
        localStorage.setItem("myNFTs", JSON.stringify(myNFTs));
        localStorage.setItem("nfts", JSON.stringify(nfts));

        alert("✅ NFT Purchased!");
        displayMarketplace();
    }
}


document.addEventListener("DOMContentLoaded", function () {
    let balance = localStorage.getItem("resqCoins") ? parseInt(localStorage.getItem("resqCoins")) : 1000;
    document.getElementById("resq-balance").innerText = balance;

    const addCoinsBtn = document.getElementById("add-coins-btn");

    if (addCoinsBtn) {
        addCoinsBtn.addEventListener("click", function () {
            let amount = prompt("Enter the amount of ResQ Coins to add:");
            amount = parseInt(amount);
            if (!isNaN(amount) && amount > 0) {
                balance += amount;
                localStorage.setItem("resqCoins", balance);
                document.getElementById("resq-balance").innerText = balance;
                alert(`✅ Added ${amount} ResQ Coins!`);
            } else {
                alert("⚠️ Invalid amount!");
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    displayMyNFTs();
});

// 🚀 Load NFTs in "My NFTs" Section
function displayMyNFTs() {
    let myNFTsContainer = document.getElementById("my-nft-gallery");
    if (!myNFTsContainer) return;
    myNFTsContainer.innerHTML = "";

    let myNFTs = JSON.parse(localStorage.getItem("myNFTs")) || [];

    if (myNFTs.length === 0) {
        myNFTsContainer.innerHTML = "<p style='color:white;'>You have no NFTs.</p>";
        return;
    }

    myNFTs.forEach((nft, index) => {
        let card = document.createElement("div");
        card.className = "nft-card";
        card.innerHTML = `
            <h3>⚠️ ${nft.name} in 📍 ${nft.location}</h3>
            <div class="nft-art">🎨</div>
            <button class="more-info-btn" onclick="toggleNFTInfo(${index})">More Info</button>
            <div class="hidden-info" id="nft-info-${index}">
            <p>📍 <strong>Event:</strong> ${nft.name}</p>
                <p>📍 <strong>Location:</strong> ${nft.location}</p>
                <p>⏳ <strong>Created:</strong> ${nft.timeCreated}</p>
                <p>💰 <strong>Price:</strong> ${nft.instantBuy} ResQ Coins</p>
                <p>📅 <strong>Purchase Date:</strong> ${nft.purchaseDate || "N/A"}</p>
                <button class="relist-btn" onclick="relistNFT(${index})">Relist NFT</button>
            </div>
        `;
        myNFTsContainer.appendChild(card);
    });
}

// 🚀 Expand & Collapse NFT Info
function toggleNFTInfo(index) {
    let card = document.querySelectorAll(".nft-card")[index];
    card.classList.toggle("expanded");
}

// 🚀 Expand & Collapse NFT Info
function toggleNFTInfo(index) {
    let card = document.querySelectorAll(".nft-card")[index];
    let infoSection = document.getElementById(`nft-info-${index}`);
    let toggleButton = card.querySelector(".more-info-btn");

    card.classList.toggle("expanded");

    if (card.classList.contains("expanded")) {
        toggleButton.innerText = "Less Info"; // ✅ Change text when expanded
    } else {
        toggleButton.innerText = "More Info"; // ✅ Change text back when collapsed
    }
}


// 🚀 Relist NFT
function relistNFT(index) {
    let myNFTs = JSON.parse(localStorage.getItem("myNFTs")) || [];
    let nfts = JSON.parse(localStorage.getItem("nfts")) || [];

    if (index >= 0 && index < myNFTs.length) {
        let relistedNFT = myNFTs[index];

        let newPrice = prompt(`Enter new listing price for "${relistedNFT.name}" (ResQ Coins):`, relistedNFT.instantBuy);
        newPrice = parseInt(newPrice);

        if (isNaN(newPrice) || newPrice <= 0) {
            alert("⚠️ Invalid price! NFT was not relisted.");
            return;
        }

        relistedNFT.instantBuy = newPrice;
        relistedNFT.relistDate = new Date().toLocaleString();

        nfts.push(relistedNFT);
        myNFTs.splice(index, 1);
        localStorage.setItem("nfts", JSON.stringify(nfts));
        localStorage.setItem("myNFTs", JSON.stringify(myNFTs));

        alert(`✅ NFT Relisted at ${newPrice} ResQ Coins!`);
        displayMyNFTs();
    } else {
        alert("⚠️ Error: NFT not found.");
    }
}
