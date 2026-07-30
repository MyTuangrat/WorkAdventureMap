// script.js - ระบบเช็คคนเข้าเว็บ

WA.onInit().then(() => {
    console.log("✅ สคริปต์โหลดแล้ว ผู้เล่นคือ: " + WA.player.name);

    // ✅ ส่งข้อมูล login
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

    // ✅ เช็คตอนเดินเข้าโซน Meeting Room
    WA.room.area.onEnter("meeting-room").subscribe(() => {
        console.log("🏢 เข้าห้องประชุมแล้ว: " + WA.player.name);

        fetch("https://workadventuremap.onrender.com/log", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: WA.player.name,
                type: "meeting_room"
            })
        })
        .then(() => console.log("✅ ส่งข้อมูล meeting_room สำเร็จ"))
        .catch((err) => console.error("❌ ส่งข้อมูลไม่สำเร็จ", err));
    });

    // ✅ เตะตัวเองออกช่วง 7:00-7:59 น. กันคนค้างในระบบ (จันทร์-ศุกร์)
    let kickedOut = false;
    setInterval(() => {
        const now = new Date();
        const thTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Bangkok" }));
        const hour = thTime.getHours();
        const day = thTime.getDay(); // 0=อาทิตย์, 6=เสาร์

        if (day !== 0 && day !== 6 && hour === 7 && !kickedOut) {
            kickedOut = true;
            console.log("🧹 07:xx น. เตะตัวเองออกจากระบบ");
            WA.nav.goToPage("https://mytuangrat.github.io/WorkAdventureMap/closed.html");
        }
    }, 60 * 1000);
});
