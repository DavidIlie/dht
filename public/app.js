$(document).ready(function () {
	$("#status").hide();
	$("#form").submit(function (e) {
		$("#button").prop("disabled", true);

		$("#status").fadeOut();

		var requestInfo = {
			url: $("#url").val(),
			extension: $("#extension").val(),
		};

		$.ajax({
			type: "POST",
			url: "/api/url",
			data: JSON.stringify(requestInfo),
			contentType: "application/json",
			success: function (msg) {
				$("#status").css("color", "white");
				$("#status").fadeIn();
				$("#statusLink").html(`https://dht.ro/${msg.extension}`);
			},
			statusCode: {
				500: function (msg) {
					// prettier-ignore
					const message = msg.responseJSON.message;

					if (message === '"url" must be a valid uri') {
						$("#status").css("color", "white");
						$("#status").html(
							"Error! URL does not match valid format! (i.e https://website.com)"
						);
						$("#status").fadeIn();
						setTimeout(function () {
							$("#status").fadeOut();
						}, 2000);
					} else if (message === "Extension in use.") {
						$("#status").css("color", "white");
						$("#status").html("Extension or URL already is in use.");
						$("#status").fadeIn();
						setTimeout(function () {
							$("#status").fadeOut();
						}, 2000);
					} else if (message === "Stop it. You're not funny.") {
						$("#status").css("color", "white");
						$("#status").html("Stop it. You're not funny.");
						$("#status").fadeIn();
						setTimeout(function () {
							$("#status").fadeOut();
						}, 2000);
					}
				},
			},
		});

		setTimeout(function () {
			$("#button").prop("disabled", false);
		}, 2000);

		e.preventDefault();
		return false;
	});
});
