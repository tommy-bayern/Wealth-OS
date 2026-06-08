# Wealth-OS
資産管理app
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Wealth OS</title>

<style>
:root{
  --bg:#0A0A0A;
  --card:#151515;
  --border:#232323;
  --text:#FFFFFF;
  --muted:#9CA3AF;
  --accent:#00D2FF;
  --success:#39D98A;
}

*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

body{
  background:var(--bg);
  color:var(--text);
  font-family:-apple-system,BlinkMacSystemFont,sans-serif;
  padding:20px;
}

.container{
  max-width:600px;
  margin:auto;
}

.card{
  background:var(--card);
  border:1px solid var(--border);
  border-radius:24px;
  padding:20px;
  margin-bottom:16px;
}

.label{
  color:var(--muted);
  font-size:12px;
  letter-spacing:1px;
}

.networth{
  font-size:42px;
  font-weight:700;
  margin-top:8px;
}

.growth{
  color:var(--success);
  margin-top:8px;
}

.row{
  display:flex;
  justify-content:space-between;
  margin:12px 0;
}

input{
  width:100%;
  background:#222;
  border:none;
  border-radius:12px;
  padding:14px;
  color:white;
  margin-bottom:10px;
}

button{
  width:100%;
  padding:14px;
  border:none;
  border-radius:12px;
  background:var(--accent);
  color:black;
  font-weight:700;
}

.ai{
  line-height:1.8;
}
</style>
</head>

<body>

<div class="container">

<div class="card">
  <div class="label">WEALTH OS</div>
  <div class="label">Age 22</div>

  <div class="networth" id="networth">
    ¥2,384,200
  </div>

  <div class="growth">
    ▲ +¥82,300 this month
  </div>
</div>

<div class="card">

  <div class="label">ASSETS</div>

  <div class="row">
    <span>🐳 Liquid</span>
    <span id="cashDisplay">¥850,000</span>
  </div>

  <div class="row">
    <span>🚀 Investments</span>
    <span id="investDisplay">¥1,214,200</span>
  </div>

  <div class="row">
    <span>🌴 Travel</span>
    <span id="travelDisplay">¥320,000</span>
  </div>

</div>

<div class="card">

  <div class="label">UPDATE ASSETS</div>

  <input id="cash" type="number" value="850000">

  <input id="invest" type="number" value="1214200">

  <input id="travel" type="number" value="320000">

  <button onclick="updateWealth()">
    Update Wealth
  </button>

</div>

<div class="card">

  <div class="label">AI INSIGHT</div>

  <div class="ai" id="insight">
    You are on track.<br><br>
    Suggested Investment: ¥80,000<br>
    Travel Fund: Healthy
  </div>

</div>

</div>

<script>

function yen(num){
  return "¥" + Number(num).toLocaleString();
}

function updateWealth(){

  const cash =
    Number(document.getElementById("cash").value);

  const invest =
    Number(document.getElementById("invest").value);

  const travel =
    Number(document.getElementById("travel").value);

  document.getElementById("cashDisplay")
    .innerText = yen(cash);

  document.getElementById("investDisplay")
    .innerText = yen(invest);

  document.getElementById("travelDisplay")
    .innerText = yen(travel);

  const total =
    cash + invest + travel;

  document.getElementById("networth")
    .innerText = yen(total);

  const recommended =
    Math.round(total * 0.03);

  document.getElementById("insight")
    .innerHTML =
    `Analysis Complete.<br><br>
     Net Worth: ${yen(total)}<br>
     Suggested Investment: ${yen(recommended)}<br>
     Risk Level: Low`;
}

updateWealth();

</script>

</body>
</html>