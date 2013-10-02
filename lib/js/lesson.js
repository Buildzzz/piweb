Lesson = new Meteor.Collection('lesson');

Meteor.methods({
  AddLesson: function (lt, lo){
    if (this.isSimulation) {}
    else{
      Lesson.insert({ title: lt, overview: lo});
    }
  },
  UpdateLesson: function (x, o){
    if (this.isSimulation) {}
    else{
      Lesson.update(x, { $set: { overview: o}});
    }
  },
  RemoveLesson: function (x){
    if (this.isSimulation) {}
    else{
      var p = Chapter.find({lessonId: x}).forEach(function(x){x._id;});;
      var c = Chapter.find({lessonId: x}).map(function(x){return x._id;});
      
      for (var i = 0; i < c.length; i++) {
        Page.remove({cId: c[i]});
        console.log(i);
      };
      Chapter.remove({lessonId: x});
      Lesson.remove(x);
    }
  },

});

/*************************************************/

if (Meteor.isClient) {

//Lesson Input Page
  Template.lessonList.x = function () {
    return Lesson.find().count();
  };

  Template.lessonList.lesson = function () {
    return Lesson.find();
  };

  Template.lessonForm.events = ({
    'click #addLesson': function (x, t) {
      var lt = t.find("#lTitle");
      var lo = t.find("#lOverview");

      if (lt.value == "") {
        alert("Please input a lesson tile.")  
      }
      else if (lo.value == ""){
        alert("Please give a lesson overview.")
      }
      else {
        Meteor.apply("AddLesson", [lt.value, lo.value]);
        lt.value = "";
        lo.value = "";
      }
    },
  });

  Template.lesson.editing = function () {
    return Session.get("edit-" + this._id);
  };

  Template.lesson.rendered = function () {
    var input = this.find("input");
    if (input){
      input.focus();
    }
  };

  Template.lesson.events = ({
    'click .del': function (e, t) {
      var x = confirm("Are you sure you want to delete " + t.data.title +"?");
        if (x==true){
          Meteor.apply("RemoveLesson", [t.data._id]);
        }
        else{
        }
    },
    
    'click #lessonTitle': function (e, t) {
      Session.set("lessonTitle", t.data.title);
      Session.set("lessonId", t.data._id);
    },

    'click #lessonOverview': function (e, t) {
      Session.set("edit-" + t.data._id, true);
    },

    'keypress #lessonOverview' : function (e, t){
      if (e.keyCode === 13){
        Meteor.apply("UpdateLesson", [t.data._id, e.currentTarget.value]);
        Session.set("edit-" + t.data._id, false);
      }
    },
  });
}

/*************************************************/

if (Meteor.isServer) {
  
}