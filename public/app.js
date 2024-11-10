const{username:username,id:id}=window.Telegram.WebApp.initDataUnsafe.user,userName=username?username.toLowerCase():"",userId=id,discordId=window.Telegram.WebApp.initDataUnsafe.start_param,showMessage=(e,s)=>{const r=document.getElementById(e);r&&(r.textContent=s)};async function callGoogleApi(e,s={}){try{const r=await fetch("/api/user",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:e,...s}),redirect:"follow"});if(!r.ok)throw new Error(`Server responded with status: ${r.status}`);return await r.json()}catch(e){return console.error("API Error:",e),showMessage("errorMsg","Failed to process request."),null}}async function selfAssignDiscordId(e){return await callGoogleApi("selfAssign",{discordId:e})}document.getElementById("apiRequestBtn")?.addEventListener("click",(async()=>{if(!userName)return void showMessage("errorMsg","Telegram username not found");const e=await callGoogleApi("search",{identifier:"telegramUser",value:userName});if(200===e?.status){const s=e.discordId;if(s){const e=await selfAssignDiscordId(s);200===e?.status?showMessage("responseMsg","Discord ID sent successfully"):showMessage("errorMsg","Failed to self-assign Discord ID.")}else showMessage("responseMsg","No Discord ID found")}else showMessage("responseMsg","User not found")})),document.getElementById("apiLinkDiscord")?.addEventListener("click",(async()=>{if(!(userName&&userId&&discordId))return void showMessage("errorMsg","Missing user data for creating an account");const e=await callGoogleApi("create",{telegramUser:userName,discordId:discordId,telegramId:userId});201===e?.status?showMessage("responseMsg","User created successfully"):showMessage("errorMsg",e?.message||"Failed to create user")}));