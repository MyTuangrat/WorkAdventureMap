// script.js - ระบบเช็คคนเข้าเว็บ

WA.onInit().then(() => {
    console.log("✅ สคริปต์โหลดแล้ว ผู้เล่นคือ: " + WA.player.name);

    fetch("https://workadventuremap.onrender.com/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: WA.player.name,
            type: "login"
        })
    })
    .then(() => console.log("✅ ส่งข้อมูล login สำเร็จ"))
    .catch((err) => console.error("❌ ส่งข้อมูลไม่สำเร็จ", err));
});
