// window.onload = function() {
// 	test()
// 	document.getElementById('user_name').textContent = user_name;
// 	document.getElementById('user_weight').textContent = body_weight;
// 	document.getElementById('user_goal_weight').textContent = user_name;
// 	document.getElementById('user_point').textContent = user_point;
// }
// APIを叩くための関数

window.onload = function()
{
		document.getElementById('user_name').textContent = sessionStorage.getItem("actual_name");
		document.getElementById('user_weight').textContent = sessionStorage.getItem("body_weight");
		document.getElementById('user_goal_weight').textContent = sessionStorage.getItem("target_weight");
		document.getElementById('user_point').textContent = sessionStorage.getItem("user_point");
};

async function fetch_aws_api(api_uri, json_info)
{
	// HTTPリクエストの情報
	const requestOptions = {
		method: 'POST',
		headers: 
		{
			'Accept': 'application/json',
			'Content-Type': 'application/json'

		},
		body: JSON.stringify(json_info),
	};

	const response = await fetch(api_uri, requestOptions);
	return (response.json());
}

async function update_user_info()
{
	const new_user_info =
	{
		"OperationType": "update_user_info",
		"Keys": {
			"ID": sessionStorage.getItem("user_id"),
			"UserName": sessionStorage.getItem("user_name"),
			"Name": sessionStorage.getItem("Mori"),
			"Point": String(sessionStorage.getItem("user_point")),
			"Weight": String(sessionStorage.getItem("body_weight")),
			"TargetWeight": String(sessionStorage.getItem("TargetWeight"))
		}
	};

	await fetch_aws_api(api_uri, new_user_info);
}


// 編集
function save_info() {
  if (document.getElementById('new_user_name').value != "")
    sessionStorage.setItem("user_name", document.getElementById('new_user_name').value);
  if (document.getElementById('new_body_weight').value != "")
    sessionStorage.setItem("body_weight", document.getElementById('new_body_weight').value);
  if (document.getElementById('new_goal_weight').value != "")
    sessionStorage.setItem("target_weight", document.getElementById("new_goal_weight").value);
  show_user_info();
  update_user_info();
}

// 編集画面を閉じる
function display_none() {
  $('#editing-wrapper').addClass('hidden');
  cover_off()
}
function edit_profile() {
  $('#editing-wrapper').removeClass('hidden');
  cover_on()
}
function cover_on() {
  $('#cover').removeClass('hidden');
}
function cover_off() {
  $('#cover').addClass('hidden');
}