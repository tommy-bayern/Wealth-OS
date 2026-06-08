const buckets = [
{
emoji: “💎”,
name: “Long-Term Wealth”,
amount: 1400000
},
{
emoji: “✈️”,
name: “Nice Fund”,
amount: 280000
},
{
emoji: “🛡️”,
name: “Emergency Fund”,
amount: 500000
}
];

const bucketList = document.getElementById(“bucketList”);

const total = buckets.reduce((a, b) => a + b.amount, 0);

document.getElementById(“netWorth”).innerText =
“¥” + total.toLocaleString();

bucketList.innerHTML = buckets.map(b => `

  <div class="bucket">
    <span>${b.emoji} ${b.name}</span>
    <span>¥${b.amount.toLocaleString()}</span>
  </div>
`).join("");

document.getElementById(“cashflowSummary”).innerHTML = `
Income
¥260,000

Expense
¥198,000

Net
+¥62,000
`;

document.getElementById(“aiInsight”).innerHTML = `
Board Meeting

Travel Fund Progress
70%

Emergency Fund
Healthy

Recommendation
Increase Nice Fund by ¥20,000
`