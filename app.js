const defaultData = {
  buckets: [
    { emoji: "💎", name: "Long-Term Wealth", amount: 1400000 },
    { emoji: "✈️", name: "Nice Fund", amount: 280000 },
    { emoji: "🛡️", name: "Emergency Fund", amount: 500000 }
  ],
  cashflows: [
    { month: "2026-06", type: "income", name: "Salary", amount: 260000 },
    { month: "2026-06", type: "expense", name: "Living Cost", amount: 198000 }
  ]
};

let data = JSON.parse(localStorage.getItem("wealthOS")) || defaultData;

function save(){
  localStorage.setItem("wealthOS", JSON.stringify(data));
  render();
}

function yen(n){
  return "¥" + Number(n || 0).toLocaleString();
}

function totalAssets(){
  return data.buckets.reduce((sum, b) => sum + Number(b.amount), 0);
}

function render(){
  document.getElementById("netWorth").innerText = yen(totalAssets());

  document.getElementById("bucketList").innerHTML = `
    ${data.buckets.map((b, i) => `
      <div class="bucket">
        <span>${b.emoji} ${b.name}</span>
        <span>${yen(b.amount)}</span>
      </div>
      <div class="actions">
        <button onclick="editBucket(${i})">Edit</button>
        <button onclick="deleteBucket(${i})">Delete</button>
      </div>
    `).join("")}

    <div class="form">
      <input id="bucketEmoji" placeholder="Emoji 例：🇫🇷">
      <input id="bucketName" placeholder="Bucket name 例：Nice Fund">
      <input id="bucketAmount" type="number" placeholder="Amount 例：280000">
      <button onclick="addBucket()">Add Bucket</button>
    </div>
  `;

  const income = data.cashflows
    .filter(c => c.type === "income")
    .reduce((s, c) => s + Number(c.amount), 0);

  const expense = data.cashflows
    .filter(c => c.type === "expense")
    .reduce((s, c) => s + Number(c.amount), 0);

  document.getElementById("cashflowSummary").innerHTML = `
    <div class="bucket"><span>Income</span><span>${yen(income)}</span></div>
    <div class="bucket"><span>Expense</span><span>${yen(expense)}</span></div>
    <div class="bucket"><span>Net</span><span>${yen(income - expense)}</span></div>

    <div class="form">
      <input id="flowMonth" placeholder="Month 例：2026-06">
      <select id="flowType">
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input id="flowName" placeholder="Name 例：Salary / Food / Travel">
      <input id="flowAmount" type="number" placeholder="Amount 例：260000">
      <button onclick="addCashflow()">Add Cashflow</button>
    </div>

    ${data.cashflows.map((c, i) => `
      <div class="bucket">
        <span>${c.month} ${c.type === "income" ? "+" : "-"} ${c.name}</span>
        <span>${yen(c.amount)}</span>
      </div>
      <div class="actions">
        <button onclick="deleteCashflow(${i})">Delete</button>
      </div>
    `).join("")}
  `;

  document.getElementById("aiInsight").innerHTML = `
    <div class="bucket"><span>Status</span><span>${income - expense >= 0 ? "Positive" : "Negative"}</span></div>
    <br>
    ${income - expense >= 0 
      ? "今月は黒字。投資・旅行積立を増やせます。" 
      : "今月は赤字。出金予定を見直した方が安全です。"}
  `;
}

function addBucket(){
  const emoji = document.getElementById("bucketEmoji").value || "💰";
  const name = document.getElementById("bucketName").value || "New Bucket";
  const amount = Number(document.getElementById("bucketAmount").value || 0);

  data.buckets.push({ emoji, name, amount });
  save();
}

function editBucket(i){
  const current = data.buckets[i];

  const emoji = prompt("Emoji", current.emoji);
  const name = prompt("Bucket name", current.name);
  const amount = prompt("Amount", current.amount);

  if(emoji && name && amount !== null){
    data.buckets[i] = {
      emoji,
      name,
      amount: Number(amount)
    };
    save();
  }
}

function deleteBucket(i){
  if(confirm("Delete this bucket?")){
    data.buckets.splice(i, 1);
    save();
  }
}

function addCashflow(){
  const month = document.getElementById("flowMonth").value || "2026-06";
  const type = document.getElementById("flowType").value;
  const name = document.getElementById("flowName").value || "Cashflow";
  const amount = Number(document.getElementById("flowAmount").value || 0);

  data.cashflows.push({ month, type, name, amount });
  save();
}

function deleteCashflow(i){
  if(confirm("Delete this cashflow?")){
    data.cashflows.splice(i, 1);
    save();
  }
}

render();