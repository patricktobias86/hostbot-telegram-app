const showMessage=(e,s)=>{const t=document.getElementById(e);t&&(t.textContent=s)},tg=window.Telegram.WebApp.initDataUnsafe,{username:username}=tg.user,userName=username?username.toLowerCase():"";async function callNetlifyFunction(e,s={}){try{const t=await fetch(`/.netlify/functions/${e}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)});if(!t.ok)throw new Error(`Server responded with status: ${t.status}`);return await t.json()}catch(e){return console.error("API Error:",e),showMessage("errorMsg","Failed to process request."),null}}async function selfAssignDiscordId(e){return await callNetlifyFunction("selfAssign",{userName:e})}const disableButton=(e,s=15e3)=>{e.disabled=!0;const t=e.textContent;e.textContent="Please wait...",setTimeout((()=>{e.disabled=!1,e.textContent=t}),s)};document.getElementById("apiRequestBtn")?.addEventListener("click",(async()=>{const e=document.getElementById("apiRequestBtn");userName?Telegram.WebApp.showConfirm("You need to help out with promo when you co-host every now and then. If you don't want to promo, there is no need to co-host.",(async s=>{if(!s)return;disableButton(e);const t=await selfAssignDiscordId(userName);t?.message?showMessage("responseMsg",t.message):showMessage("errorMsg","Failed to self-assign Discord ID.")})):showMessage("errorMsg","Telegram username not found")})),document.getElementById("apiLinkDiscord")?.addEventListener("click",(async()=>{if(!userName)return void showMessage("errorMsg","Telegram username not found");const e=tg.user?.id;let s=tg.start_param||prompt("Enter your Discord ID:");if(!s||!e)return void showMessage("errorMsg","Missing Discord ID or Telegram ID.");const t=await callNetlifyFunction("user",{telegramUser:userName,discordId:s,telegramId:e});"ok"===t?.message?showMessage("responseMsg","Discord successfully linked."):showMessage("errorMsg","Failed to link Discord account.")}));