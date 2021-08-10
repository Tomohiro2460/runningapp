//計算する系の関数（なくてもいいかも）

// function calculate_used_calories(body_weight, distance)
// {
// 	return (body_weight * distance);
// }

// function calculate_new_points(user_point, used_calories, point_rate)
// {
// 	return (user_point + used_calories * point_rate);
// }

// function calculate_snack_count(used_calories, snack_calory)
// {
// 	return (used_calories / snack_calory);
// }

// APIを叩くための関数

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

// グローバル変数

// 固定のポイントレート？
const point_rate = 10;
const api_uri = "https://k1hbhurn94.execute-api.us-east-2.amazonaws.com/homepage/info";

// 本当はログイン画面で取得してくる
// let user_name = "morimori";
sessionStorage.setItem("user_name", "morimori");

// 本当はinputから取得してくる
let distance = 10;
sessionStorage.setItem("distance", 10);

// let user_id;
// let user_point;
// let body_weight;
// let snack_id;
// let snack_name;
// let snack_calory;
// let used_calories;
// let snack_count;

window.onload = show_user_info();

function show_user_info()
{
	fetch_user_info().then(() =>
	{
		document.getElementById('user_name').textContent = sessionStorage.getItem("actual_name");
		document.getElementById('user_weight').textContent = sessionStorage.getItem("body_weight");
		document.getElementById('user_goal_weight').textContent = sessionStorage.getItem("target_weight");
		document.getElementById('user_point').textContent = sessionStorage.getItem("user_point");
	});
}

async function fetch_user_info()
{
	const login_json_info =
	{
		"OperationType": "login",
		"Keys": { "UserName": sessionStorage.getItem("user_name") }
	};
	await fetch_aws_api(api_uri, login_json_info).then
	(data => 
		{
			sessionStorage.setItem("user_id", data.body["Items"][0].ID);
			sessionStorage.setItem("user_name", data.body["Items"][0].UserName);
			sessionStorage.setItem("actual_name", data.body["Items"][0].Name);
			sessionStorage.setItem("body_weight", Number(data.body["Items"][0].Weight));
			sessionStorage.setItem("target_weight", Number(data.body["Items"][0].TargetWeight));
			sessionStorage.setItem("user_point", Number(data.body["Items"][0].Point));
		}
	);
}

async function fetch_snack_info()
{
	sessionStorage.setItem("used_calories", sessionStorage.getItem("body_weight") * sessionStorage.getItem("distance"));
	sessionStorage.setItem("user_point", sessionStorage.getItem("user_point") + sessionStorage.getItem("used_calories") * sessionStorage.getItem("point_rate"));
	const snack_json_info =
	{
		"OperationType": "get_snack_num",
		"Keys": {
			"burned_calories": sessionStorage.getItem("used_calories"),
			"UserName": sessionStorage.getItem("user_name"),
			"updated_point": String(sessionStorage.getItem("user_point"))
		}
	};

	await fetch_aws_api(api_uri, snack_json_info).then	
	(data =>
		{
			sessionStorage.setItem("snack_id", data.body["Item"].ID);
			sessionStorage.setItem("snack_calory",  Number(data.body["Item"].Calory));
			sessionStorage.setItem("snack_name", data.body["Item"].Name);
			sessionStorage.setItem("snack_count", sessionStorage.getItem("used_calories") / sessionStorage.getItem("snack_calory"));
		}
	);
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


// function test()
// {
// 	// fetch_user_info ユーザ情報
// 	fetch_user_info().then(() => 
// 	{
// 		console.log("user_id       = " + user_id);
// 		console.log("user_name     = " + user_name);
// 		console.log("user_point    = " + user_point);
// 		console.log("body_weight   = " + body_weight);
// 	});

// 	// fetch_snack_info スナック情報＆ポイント
// 	fetch_snack_info().then(() => 
// 	{
// 		console.log("snack_id      = " + snack_id);
// 		console.log("snack_name    = " + snack_name);
// 		console.log("snack_calory  = " + snack_calory);
// 		console.log("used_calories = " + used_calories);
// 		console.log("snack_count   = " + snack_count);
// 		console.log("user_point    = " + user_point);
// 	});

// 	// fetch_user_info ユーザ情報
// 	console.log("user_id       = " + user_id);
// 	console.log("user_name     = " + user_name);
// 	console.log("user_point    = " + user_point);
// 	console.log("body_weight   = " + body_weight);

// 	// fetch_snack_info スナック情報＆ポイント
// 	console.log("snack_id      = " + snack_id);
// 	console.log("snack_name    = " + snack_name);
// 	console.log("snack_calory  = " + snack_calory);
// 	console.log("used_calories = " + used_calories);
// 	console.log("snack_count   = " + snack_count);
// 	console.log("user_point    = " + user_point);
// }