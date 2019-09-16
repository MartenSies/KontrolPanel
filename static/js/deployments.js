$(document).ready(function(){
	$('.restart-pod-btn').on('click', handlePodRestart);
});

function handlePodRestart() {
	var podName = $(this).attr("data-name");
	var podNamespace = $(this).attr("data-namespace");
	var url = '/delete_pod?name=' + podName + '&namespace=' + podNamespace;
	executeGetRequest(url);
}

function executeGetRequest(url) {
	$.get(url);
}