Page = new Meteor.Collection('page');

Meteor.methods({
  EditPage: function (x, a, b, c){
    if (this.isSimulation) {}
    else{
      Page.update({ _id: x}, 
          {$set: {pNumber: a, qPTitle: b, pTitle: c}}
      );
    }
  },
  AddPage: function (x, a, b, c){
    if (this.isSimulation) {}
    else{
      Page.insert({ cId: x, pNumber: a, qPTitle: b, pTitle: c});
    }
  },
  RemovePage: function (x){
    if (this.isSimulation) {}
    else{
      Page.remove(x);
    }
  },
});

/*************************************************/

if (Meteor.isClient) {

//Page Input Page

  Template.pages.helpers({
  	mTitle: function () {return Session.get("lessonTitle");},
  	cNumber: function () {return Session.get("cNumber");},
  	cTitle: function () {return Session.get("cTitle");},
  	page: function () {return Page.find( {cId: Session.get("cId")}, {sort: {pNumber:1}});},
  	editing: function () {return Session.get("edit-");},
	pageEdit: function () {return Page.find({_id: Session.get("pId")});},
  });

  Template.addPageForm.numberOfPages = function () {
  	var x = Page.find( {cId: Session.get("cId")}).count();
    return x+1;
  };

  Template.pageOutline.events = ({
    'click #pTitle': function (e, t){
    	Session.set("pTitle", t.data.pTitle);
		Session.set("pId", t.data._id);
		Session.set("pNumber", t.data.pNumber);
		Session.set("edit-", false);
    },
    'click #editPage': function (e, t) {
    	Session.set("edit-", true);
    	Session.set("pId", t.data._id);
    },

    'click .del': function (e, t) {
      var x = confirm("Are you sure you want to delete " + t.data.pTitle +"?");
        if (x==true){
          Meteor.apply("RemovePage", [t.data._id]);
        }
        else{
      }
    },
  });


  Template.addPageForm.events = ({
    'click #addPage': function (x, t){
      var pn = t.find("#aPNumber");
      var pqt = t.find("#aPQTitle");
      var pt = t.find("#aPTitle");
      
      if (pqt.value == "") {
        alert("Please input a page quick tile.")  
      }
      else if (pt.value == ""){
        alert("Please input a page title.")
      }
      else {
        Meteor.apply("AddPage", 
          [Session.get("cId"), pn.innerHTML, pqt.value, pt.value]);
        pn.value = "";
        pqt.value = "";
        pt.value = "";
      }
    },
  });

  Template.editPageForm.events = ({
    'click #cancelEdit': function (x, t) {
      Session.set("edit-", false);
      Session.set("pId", "");
    },
    'click #editPage': function (x, t) {
      var pn = t.find("#ePNumber");
      var pqt = t.find("#ePQTitle");
      var pt = t.find("#ePTitle");
      
      if (pqt.value == "") {
        alert("Please input a page quick tile.")  
      }
      else if (pt.value == ""){
        alert("Please input a page title.")
      }
      else {
        Meteor.apply("EditPage",
        [Session.get("pId"), pn.value, pqt.value, pt.value]
        );
        pn.value = "";
        pqt.value = "";
        pt.value = "";
        Session.set("edit-", false);
      }
    },
  });


}

