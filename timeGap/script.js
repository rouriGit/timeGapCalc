document.addEventListener("DOMContentLoaded", () => {
    initializeCurrentCity();
});

function initializeCurrentCity() {
    const city1Select = document.getElementById("city1");

    // 現在のタイムゾーンを取得
    const timezoneOffset = new Date().getTimezoneOffset() / -60;

    const cities = [
        { name: "ロンドン", offset: 0 },
        { name: "東京", offset: 9 },
        { name: "ニューヨーク", offset: -5 },
        { name: "ベルリン", offset: 1 }
    ];

    // 最も近い都市を選択
    const nearestCity = cities.reduce((prev, curr) =>
        Math.abs(curr.offset - timezoneOffset) < Math.abs(prev.offset - timezoneOffset) ? curr : prev
    );

    // 選択肢を動的に生成
    cities.forEach(city => {
        const option = document.createElement("option");
        option.value = city.offset;
        option.textContent = `${city.name} (GMT${city.offset >= 0 ? "+" : ""}${city.offset})`;
        if (city.name === nearestCity.name) {
            option.selected = true;
        }
        city1Select.appendChild(option);
    });

    city1Select.disabled = false;
}

function calculateTimeDifference() {
    const city1Select = document.getElementById("city1");
    const city2Select = document.getElementById("city2");
    const city1 = city1Select.value;
    const city2 = city2Select.value;

    const timeDifferenceElement = document.getElementById("time-difference");
    const currentTimeElement = document.getElementById("current-time");

    if (city1 && city2) {
        const city1Name = city1Select.options[city1Select.selectedIndex].text.split(" ")[0];
        const city2Name = city2Select.options[city2Select.selectedIndex].text.split(" ")[0];

        const timeDifference = Math.abs(city1 - city2);
        const city2CurrentTime = new Date();
        city2CurrentTime.setHours(city2CurrentTime.getHours() + (city2 - city1));

        const formattedTime = city2CurrentTime.toLocaleTimeString("ja-JP", {
            hour: "2-digit",
            minute: "2-digit"
        });

        timeDifferenceElement.textContent = `${city1Name}と${city2Name}との時差: ${timeDifference} 時間`;
        currentTimeElement.textContent = `${city2Name}の現在時刻: ${formattedTime}`;
    } else {
        timeDifferenceElement.textContent = "-";
        currentTimeElement.textContent = "-";
    }
}
