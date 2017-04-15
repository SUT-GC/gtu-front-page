var service_url = "http://localhost:9090"
var list_info_url = service_url + "/listinfo/"
var filter_left_select_universitys_url = service_url+"/gaoxiaofenshu/cdx"
var filter_left_select_majors_url = service_url+"/zhuanye"
var filter_left_select_score_url = service_url+"/gaoxiaofenshu/score"

var baidu_pake_url = "http://baike.baidu.com/item/"

years = [];
majors = [];
citys = [];
universitys = [];
kebies = [];
hide_ids =  [
              "#gtu-body-result",
              "#select-university",
              "#select-major",
              "#select-score",
              "#score-limit",
              "#major-limit",
              "#city-limit",
              "#result-nav",
              "#gtu-body-foot",
            ]
$(document).ready(function(){
  showMyIds([])
  initAllList()

  $("#select_unis-button").click(function(){
    queryUniversitys($(this))
  });
  $("#select_majors-button").click(function(){
    queryMajors($(this))
  })
  $("#select-score-button").click(function(){
    queryScore($(this))
  })
});

var showMyIds = function(args){
  for (var i = 0; i < hide_ids.length; i++){
    $(hide_ids[i]).hide()
  }
  for (var i = 0; i < args.length; i++){
    $(args[i]).slideDown()
  }
}

var initAllList = function(){
  $.get(list_info_url, function(data, status){
    majors = data.allMajor
    citys = data.allCity
    console.log(citys)
    universitys = data.allUniversity
    years = data.allYears
    kebies = data.allKeBie

    initCitys()
    initUniversitys()
    initKebies()
    initYears()
    initMajors()
  });
  
}

var queryUniversitys = function(nowDocument){
  var parentDocument = nowDocument.parent().parent()
  var cityName = parentDocument.find(".all_citys").val()
  var kebie = parentDocument.find(".all_kebies").val()
  var year = parentDocument.find(".all_years").val()

  if (!checkCity(cityName)) {
    return
  }
  if (!checkKebie(kebie)) {
    return 
  }
  if (!checkYear(year)) {
    return
  }

  $.get(filter_left_select_universitys_url+"?cityName="+cityName+"&kebie="+kebie+"&year="+year, function(data, status){
    console.log(data, status)
    if (status != "success") {
      alert("查询失败, 服务异常!")
      return
    }
    show_id = "#select-university"
    $(show_id).find("tbody").empty()
    for(var i = 0; i < data.length; i++){
      one_data = data[i]
      $(show_id).find("tbody")
        .append(
          '<tr><th>'+i+'</th><th>'+one_data.universityName+'</th><th>'+one_data.kebie+'</th><th>'+one_data.cityName+'</th><th><a target="_blank" href="'+one_data.url+'">'+one_data.universityName+'</a></th><th><button type="button" class="btn btn-success result-button">所设专业</button></th><th><button type="button" class="btn btn-success result-button">历年分数线</button></th></tr>'
        )
    }
    showMyIds(["#gtu-body-result", show_id, ])
  })

}

var queryMajors = function(nowDocument){
  var parentDocument = nowDocument.parent().parent()
  var majorName = parentDocument.find(".all_majors").val()

  if (!checkMajor(majorName)) {
    return
  }

  $.get(filter_left_select_majors_url+"/"+majorName, function(data, status){
    console.log(data, status)
    if (status != "success") {
      alert("查询失败, 服务异常!")
      return
    }
    show_id = "#select-major"
    $(show_id).find("tbody").empty()
    for(var i = 0; i < data.length; i++){
      one_data = data[i]
      $(show_id).find("tbody")
        .append(
          '<tr><th>'+i+'</th><th>'+one_data.majorName+'</th><th><a target="_blank" href="'+baidu_pake_url+one_data.universityName+'">'+one_data.universityName+'</a></th><th>'+one_data.cityName+'</th><th><a target="_blank" href="'+one_data.majorUrl+'">'+one_data.majorName+'</a></th><th><button type="button" class="btn btn-success result-button">历年分数线</button></th></tr>'
        )
    }
    showMyIds(["#gtu-body-result", show_id, ]) 
  })
}

var queryScore = function(nowDocument){
  var parentDocument = nowDocument.parent().parent()
  var cityName = parentDocument.find(".all_citys").val()
  var score = parentDocument.find(".input-score").val()
  var year = parentDocument.find(".all_years").val()
  
  if (!checkCity(cityName)) {
    return
  }

  if (!checkYear(year)) {
    return
  }

  if (!checkScore(score)) {
    return
  }

  $.get(filter_left_select_score_url+"?cityName="+cityName+"&score="+score+"&year="+year, function(data, status){
    console.log(data, status)
    if (status != "success") {
      alert("查询失败, 服务异常!")
      return
    }
    show_id = "#select-score"
    $(show_id).find("tbody").empty()
    for(var i = 0; i < data.length; i++){
      one_data = data[i]
      $(show_id).find("tbody")
        .append(
          '<tr><th>'+i+'</th><th>'+one_data.universityName+'</th><th>'+one_data.kebie+'</th><th>'+one_data.cityName+'</th><th>'+one_data.year+'</th><th>'+one_data.pici+'</th><th>'+one_data.scoreLimit+'</th><th><a target="_blank" href="'+one_data.url+'">'+one_data.universityName+'</a></th><th><button type="button" class="btn btn-success result-button">所设专业</button></th><th><button type="button" class="btn btn-success result-button">历年分数线</button></th></tr>'
        )
    }
    showMyIds(["#gtu-body-result", show_id, ]) 
  })
}

var initCitys = function(){
  $(".all_citys").empty()
  $(".all_citys").append("<option>招生区</option>")
  for(var i = 0; i < citys.length; i++) {
    $(".all_citys").append("<option>"+citys[i]+"</option>")
  }
  console.log($(".all_citys").children())
}

var initUniversitys = function(){
  $(".all_universitys").empty()
  $(".all_universitys").append("<option>高校名称</option>")
  for (var i = 0; i < universitys.length; i++) {
    $(".all_universitys").append("<option>"+universitys[i]+"</option>")
  }
}

var initKebies = function(){
  $(".all_kebies").empty()
  $(".all_kebies").append("<option>科目</option>")
  for (var i = 0; i < kebies.length; i++) {
    $(".all_kebies").append("<option>"+kebies[i]+"</option>")
  }
}

var initYears = function(){
  $(".all_years").empty()
  $(".all_years").append("<option>年份</option>")
  for (var i = 0; i < years.length; i++) {
    $(".all_years").append("<option>"+years[i]+"</option>")
  }
}

var initMajors = function(){
  $(".all_majors").empty()
  $(".all_majors").append("<option>专业名称</option>")
  for (var i = 0; i < majors.length; i++) {
    $(".all_majors").append("<option>"+majors[i]+"</option>")
  }
}

var checkCity = function(city){
  if (city === '招生区') {
    alert("请选择正确的 招生区")
    return false
  }
  return true
}

var checkKebie = function(kebie){
  if (kebie === '科目') {
    alert("请选择正确的 科目")
    return false
  }
  return true
}

var checkYear = function(year){
  if (year === '年份') {
    alert("请选择正确的 年份")
    return false
  }
  return true
}

var checkMajor = function(major){
  if (major === '专业名称') {
    alert("请选择正确的 专业名称")
    return false
  }
  return true
}

var checkUniversity = function(university){
  if (university === '高校名称') {
    alert("请选择正确的 高校名称")
    return false
  }
  return true
}

var checkScore = function(score){
  console.log(score)
  if (0 < score && score < 1000) {
    return true
  }
  alert("请输入正确的 分数")
  return false
}