Chapter = new Meteor.Collection('chapter');

Meteor.methods({
  EditChapter: function (x, a, b, c, d, e){
    if (this.isSimulation) {}
    else{
      Chapter.update({ _id: x}, 
          {$set: {cNumber: a, qCTitle: b, cTitle: c, cOverview: d, cGoal: e}}
      );
    }
  },
  AddChapter: function (x, a, b, c, d, e){
    if (this.isSimulation) {}
    else{
      Chapter.insert({ lessonId: x, cNumber: a, qCTitle: b, cTitle: c, cOverview: d, cGoal: e});
    }
  },
  RemoveChapter: function (x){
    if (this.isSimulation) {}
    else{
      //var c = Chapter.find({lessonId: x}).map(function(x){return x._id;});
      Page.remove({cId: x});
      Chapter.remove(x);
    }
  },
});

/*************************************************/

if (Meteor.isClient) {

//Chapter Input Page

  Template.chapters.helpers({
    title: function () {return Session.get("lessonTitle");
    },
    chapter: function () {return Chapter.find( {lessonId: Session.get("lessonId")}, {sort: {cNumber:1}});
    },
    chapterEdit: function () {return Chapter.find({_id: Session.get("cId")});
    },
    editing: function () {return Session.get("edit-");
    },
  });

  Template.addChapterForm.numberOfChapters = function () {
    var x = Chapter.find( {lessonId: Session.get("lessonId")}).count();
    return x+1;
  };

  Template.chapterOutline.events = ({
    'click #cTitle': function (e, t) {
      Session.set("cTitle", t.data.cTitle);
      Session.set("cId", t.data._id);
      Session.set("cNumber", t.data.cNumber);
      Session.set("edit-", false);
    },
    'click #editChapter': function (e, t) {
      Session.set("edit-", true);
      Session.set("cId", t.data._id);
    },

    'click .del': function (e, t) {
      var x = confirm("Are you sure you want to delete " + t.data.cTitle +"?");
        if (x==true){
          Meteor.apply("RemoveChapter", [t.data._id]);
        }
        else{
      }
    },
  });


  Template.addChapterForm.events = ({
    'click #addChapter': function (x, t){
      var cn = t.find("#aCNumber");
      var cqt = t.find("#aCQTitle");
      var ct = t.find("#aCTitle");
      var co = t.find("#aCOverview");
      var cg = t.find("#aCGoal");

      if (cqt.value == "") {
        alert("Please input a chapter quick tile.")  
      }
      else if (ct.value == ""){
        alert("Please input a chapter title.")
      }
      else if (co.value == ""){
        alert("Please give a chapter overview.")
      }
      else if (cg.value == ""){
        alert("Please insert a chapter goal.")
      }
      else {
        Meteor.apply("AddChapter", 
          [Session.get("lessonId"), cn.innerHTML, cqt.value, ct.value, co.value, cg.value]);
        cn.value = "";
        cqt.value = "";
        ct.value = "";
        co.value = "";
        cg.value = "";
      }
    },
  });

  Template.editChapterForm.events = ({
    'click #cancelEdit': function (x, t) {
      Session.set("edit-", false);
      Session.set("cId", "");
    },
    'click #editChapter': function (x, t) {
      var cn = t.find("#eCNumber");
      var cqt = t.find("#eCQTitle");
      var ct = t.find("#eCTitle");
      var co = t.find("#eCOverview");
      var cg = t.find("#eCGoal");
      
      if (cqt.value == "") {
        alert("Please input a chapter quick tile.")  
      }
      else if (ct.value == ""){
        alert("Please input a chapter title.")
      }
      else if (co.value == ""){
        alert("Please give a chapter overview.")
      }
      else if (cg.value == ""){
        alert("Please insert a chapter goal.")
      }
      else {
        Meteor.apply("EditChapter",
        [Session.get("cId"), cn.value, cqt.value, ct.value, co.value, cg.value]
        );
        cn.value = "";
        cqt.value = "";
        ct.value = "";
        co.value = "";
        cg.value = "";
        Session.set("edit-", false);
      }
    },
  });
}