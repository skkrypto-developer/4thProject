//survey
SurveyCreator
.StylesManager
.applyTheme("bootstrap");

// Show Designer, Test Survey, JSON Editor and additionaly Logic tabs
var options = {
showLogicTab: true
};
//create the SurveyJS Creator and render it in div with id equals to "creatorElement"
var creator = new SurveyCreator.SurveyCreator("creatorElement", options);
//Show toolbox in the right container. It is shown on the left by default
creator.showToolbox = "right";
//Show property grid in the right container, combined with toolbox
creator.showPropertyGrid = "right";
//Make toolbox active by default
creator.rightContainerActiveItem("toolbox");

//SETTING 여기까지
// DB Connect
//DB에 저장하는 부분
creator.saveSurveyFunc = function () {

    //save the survey JSON
    console.log(creator.text);
    $.ajax({
        url:"create_survey_detail/create",
        type:'POST',
        dataType : 'text',
        contentType : 'application/json',
        data: creator.text,
        success:function(data){
            console.log("제발")
            window.location.href = "http://localhost:3000/"
        },
        error:function(jqXHR, textStatus, errorThrown){
            alert("에러 발생" + textStatus + " : " + errorThrown);
            self.close();
        }
    });
}


//creator.text = "{ pages: [{ name:\'page1\', questions: [{ type: \'text\', name:\"q1\"}]}]}";