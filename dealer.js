var brandlist = new Array("Porsche", "Volkswagen", "Audi", "BMW");

var count = 0;

var clients_served = 0;
var cars_sold = 0;
var amount = 0;
var brandcost = new Array(72500, 23930, 31260, 43990);
var selectedCategory = "";

var questions = [{
    "qns": "Which year was the latest model released in?",
    "no": "1",
    "correctAns": "a",
    "category": "Porsche",
    "points": "2",
    "choices": [{
        "title": "2019",
        "no": "a"
      },
      {
        "title": "2018",
        "no": "b"
      },
      {
        "title": "2017",
        "no": "c"
      },
      {
        "title": "2016",
        "no": "d"
      }
    ]
  },
  {
    "qns": "In which year was Porsche the main trend of the market?",
    "no": "2",
    "correctAns": "b",
    "category": "Porsche",
    "points": "2",
    "choices": [{
        "title": "2016",
        "no": "a"
      },
      {
        "title": "2015",
        "no": "b"
      },
      {
        "title": "2014",
        "no": "c"
      },
      {
        "title": "2013",
        "no": "d"
      }
    ]
  },
  {
    "qns": "What is the warranty period?",
    "no": "1",
    "correctAns": "a",
    "category": "Volkswagen",
    "points": "2",
    "choices": [{
        "title": "1",
        "no": "a"
      },
      {
        "title": "2",
        "no": "b"
      },
      {
        "title": "3",
        "no": "c"
      },
      {
        "title": "4",
        "no": "d"
      }
    ]
  },
  {
    "qns": "Which country was this brand found in?",
    "no": "2",
    "correctAns": "c",
    "category": "Volkswagen",
    "points": "2",
    "choices": [{
        "title": "America",
        "no": "a"
      },
      {
        "title": "Europe",
        "no": "b"
      },
      {
        "title": "Singapore",
        "no": "c"
      },
      {
        "title": "China",
        "no": "d"
      }
    ]
  },
  {
    "qns": "What was the percentage of the satisfied customers for this brand?",
    "no": "1",
    "correctAns": "d",
    "category": "BMW",
    "points": "2",
    "choices": [{
        "title": "100%",
        "no": "a"
      },
      {
        "title": "90%",
        "no": "b"
      },
      {
        "title": "80%",
        "no": "c"
      },
      {
        "title": "70%",
        "no": "d"
      }
    ]
  },
  {
    "qns": "Which age group of people would purchase BMW the most?",
    "no": "2",
    "correctAns": "a",
    "category": "BMW",
    "points": "2",
    "choices": [{
        "title": "20-30",
        "no": "a"
      },
      {
        "title": "30-40",
        "no": "b"
      },
      {
        "title": "40-50",
        "no": "c"
      },
      {
        "title": "50-60",
        "no": "d"
      }
    ]
  },
  {
    "qns": "Which country was this brand found in?",
    "no": "1",
    "correctAns": "c",
    "category": "Audi",
    "points": "2",
    "choices": [{
        "title": "America",
        "no": "a"
      },
      {
        "title": "Europe",
        "no": "b"
      },
      {
        "title": "Singapore",
        "no": "c"
      },
      {
        "title": "China",
        "no": "d"
      }
    ]
  },
  {
    "qns": "Which colour is the most popular for Audi models?",
    "no": "2",
    "correctAns": "a",
    "category": "Audi",
    "points": "2",
    "choices": [{
        "title": "black",
        "no": "a"
      },
      {
        "title": "white",
        "no": "b"
      },
      {
        "title": "navy",
        "no": "c"
      },
      {
        "title": "violet",
        "no": "d"
      }
    ]
  }

];

var qnsIndex = 0;
var selections = [];
var currentClient = null;

function newClient() {
  var preference = Math.floor((Math.random() * 4));
  var time = Math.floor((Math.random() * 10000) + 1);
  var client = Math.floor((Math.random() * 10) + 1);
  if (count < 5) {
    var brandName = brandlist[preference];

    $("#clients_queue").append('<div class="client client_' + client + ' choice_' + brandName + '"><span class="preference">Client for ' + brandlist[preference] + '</span></div>');

    count++;

    var clients = $("#clients_queue .client");
    var firstClient = clients[0];
    var $firstClient = $(firstClient);
    var clientDragOption = {
      revert: true,
      zIndex: 1
    };
    $firstClient.draggable(clientDragOption);
  }
  setTimeout(function () {
    newClient();
  }, time);
}

function makeAllCarBrandsDroppable() {
  for (var i = 0; i < brandlist.length; i++) {
    var brand = brandlist[i];
    makeCarBoxesDroppable(brand);
  }
}

function makeCarBoxesDroppable(brand) {
  var smallBrand = brand.toLowerCase();
  var $carBoxes = $("#" + smallBrand + " .car");
  var options = {
    accept: '.choice_' + brand,
    drop: function (e, ui) {
      var $dropBox = $(this);
      var $dragBox = $(ui.draggable);
      $dropBox.append($dragBox);
      $dragBox.position({
        of: $dropBox,
        my: 'left top',
        at: 'left top'
      });

      var removeMarginStyle = {
        "margin-top": '0px',
        "margin-bottom": '0px',
        "margin-left": '-3px'
      };
      $dragBox.css(removeMarginStyle);
      count--;
      $dragBox.addClass('selected');

      currentClient = $dragBox;
      selectedCategory = brand;
      next_qns();
      var dialogOption = {
        scrolling: 'no'
      };
      $.fancybox.open("#mcq", dialogOption);
    }
  };
  $carBoxes.droppable(options);
}

function makeExitDroppable() {
  var $exit = $("exit");
  var options = {
    accept: '.client',
    drop: function (e, ui) {
      var $dropBox = $(this);
      var $dragBox = $(ui.draggable);
      $dropBox.append($dragBox);
      $dragBox.position({
        of: $dropBox,
        my: 'left top',
        at: 'left top'
      });

      var alignCenterStyle = {
        "margin-top": '5px',
        "margin-bottom": '0px',
        "margin-left": "30px"
      };
      $dragBox.css(alignCenterStyle);
      if ($dragBox.hasClass('selected') == false) {
        count--;
        newClient();
      }
      setTimeout(function () {
          removeBox($dragBox, -100);
        },
        500
      );
    }
  }
  $exit.droppable(options);

}

function removeBox(element, moveToTop) {
  element.css('z-index', 3000);
  var option = {
    top: moveToTop,
  };
  element.animate(option)
    .fadeOut(function () {
      element.remove();
    })
}

function makeCashierDroppable() {
  var $cashier = $("#cashier");
  var options = {
    accept: '.client.selected',
    drop: function (e, ui) {
      var $dropBox = $(this);
      var $dragBox = $(ui.draggable);
      $dropBox.append($dragBox);
      $dragBox.position({
        of: $dropBox,
        my: 'left top',
        at: 'left top'
      });

      var alignCenterStyle = {
        "margin-top": '30px',
        "margin-bottom": '0px',
        "margin-left": "40px"
      };
      $dragBox.css(alignCenterStyle);
      showCashierDialog($dragBox);
    }
  };
  $cashier.droppable(options);
}

function showCashierDialog(dragClient) {

  var option = {
    buttons: {
      "Yes": function () {
        clients_served += 1;
        cars_sold += 1;
        amount += calcost(dragClient);
        update();
        removeBox(dragClient, "-=210");
        $(this).dialog("close");
      },

      "No and Exit": function () {

        removeBox(dragClient, "-=210");
        $(this).dialog("close");

      }
    },
    close: function () {
      removeBox(dragClient, -350);
    }
  };
  var dialog = $('#dialog');
  dialog.dialog(option);
}

function calcost(dragClient) {
  if (dragClient.hasClass('choice_Porsche')) {
    return brandcost[0];
  } else if (dragClient.hasClass('choice_Volkswagen')) {
    return brandcost[1];
  } else if (dragClient.hasClass('choice_Audi')) {
    return brandcost[2];
  } else if (dragClient.hasClass('choice_BMW')) {
    return brandcost[3];
  }
}

function update() {
  $('#clients_served').text(clients_served + ' clients');
  $('#cars_sold').text(cars_sold + ' cars');
  $('#amount').text('$ ' + amount);
}
$(
  function () {
    makeAllCarBrandsDroppable();
    newClient();
    makeExitDroppable();
    makeCashierDroppable();
    showPage("splash");
  }
);

function showPage(id) {
  hideAllPages();
  var page = $("#" + id);
  var tweenEnd = {
    opacity: 1.0
  };
  page.animate(tweenEnd, 1000);
  page.show();
}

function hideAllPages() {
  var pages = $(".page-panel");
  pages.each(function () {
    var currentPage = $(this);
    var hideStyle = {
      opacity: 0.0,
      visibility: "visible"
    };
    currentPage.css(hideStyle);
    currentPage.hide();
  });
}

function next_qns() {
  var filteredQns = [];
  for (var i = 0; i < questions.length; i++) {
    var question = questions[i];
    if (question.category == selectedCategory) {
      filteredQns.push(question);
    }
  }
  if (qnsIndex < filteredQns.length) {
    var current = filteredQns[qnsIndex];
    var questionTitle = $("#questionTitle");
    questionTitle.html((qnsIndex + 1) + ". " + current.qns);

    var optA = current.choices[0];
    var optA_Box = $("#optionA");
    optA_Box.html(optA.title);

    var optB = current.choices[1];
    var optB_Box = $("#optionB");
    optB_Box.html(optB.title);

    var optC = current.choices[2];
    var optC_Box = $("#optionC");
    optC_Box.html(optC.title);

    var optD = current.choices[3];
    var optD_Box = $("#optionD");
    optD_Box.html(optD.title);

    optA_Box.css("background-color", "palegreen");
    optB_Box.css("background-color", "palegreen");
    optC_Box.css("background-color", "palegreen");
    optD_Box.css("background-color", "palegreen");
    qnsIndex++;
  } else {
    var questionPanel = $("#question-panel");
    questionPanel.css("display", "none");

    var resultPanel = $("#result-panel");
    resultPanel.css("display", "block");

    qnsIndex = 0;

    var totalScore = 0;

    for (var i = 0; i < selections.length; i++) {
      var selection = selections[i];
      var question = null;

      for (var h = 0; h < filteredQns.length; h++) {
        var q = filteredQns[h];
        if (q.no == selection.qnsNo) {
          question = q;
          break;
        }
      }
      if (selection.selected == question.correctAns) {
        totalScore += parseInt(question.points);
      }
    }

    var totalMarks = 0;
    for (var h = 0; h < filteredQns.length; h++) {
      var q = filteredQns[h];
      totalMarks += parseInt(question.points);
    }

    var percScore = (totalScore / totalMarks) * 100;
    var failed = true;

    if (percScore > 50) {
      failed = false;
    }

    var scoreBox = $("#totalScore");
    scoreBox.html("Score: " + totalScore + "/" + totalMarks);

    var result = "";
    if (failed == true) {
      result = "<img src='images/tenor.gif' width='250' height='200' alt='failed'/>";
    } else {
      result = "<img src='images/excellent.png' width='250' height='200' alt='failed'/>";
    }
    var myresult = $("#myresult");
    myresult.html(result);

    var closeResultButton = $("#closeResultButton");
    closeResultButton.click(function () {
      $.fancybox.close();
      selections = [];
      questionPanel.css("display", "none");
      resultPanel.css("display", "none");

      var clientX = currentClient.offset().left;
      var clientY = currentClient.offset().top;
      if (failed == true) {
        var exit = $("#exit_img_holder");
        var exitX = exit.offset().left;
        var exitY = exit.offset().top;

        var diffX = exitX - clientX;
        var diffY = exitY - clientY;

        currentClient.css("zIndex", 3000);
        currentClient.animate({
            left: "+=" + diffX,
            top: "+=" + diffY,
          },
          1000).fadeOut(2000, function () {
          count--;
          newClient();
        });

      } else {
        var cashier = $("#cashier_img_holder");
        var cashierX = cashier.offset().left;
        var cashierY = cashier.offset().top;

        var diffX = cashierX - clientX;
        var diffY = cashierY - clientY;

        currentClient.css("zIndex", 3000);
        currentClient.animate({
            left: "+=" + diffX,
            top: "+=" + diffY,
          },
          1000,
          function () {
            showCashierDialog(currentClient);
          });
      }
      closeResultButton.unbind();
    });
  }

}

function ansBox_click(selectedChoice) {
  var optA_Box = $("#optionA");
  var optB_Box = $("#optionB");
  var optC_Box = $("#optionC");
  var optD_Box = $("#optionD");
  optA_Box.css("background-color", "palegreen");
  optB_Box.css("background-color", "palegreen");
  optC_Box.css("background-color", "palegreen");
  optD_Box.css("background-color", "palegreen");
  if (selectedChoice == "a") {
    optA_Box.css("background-color", "khaki");
  } else if (selectedChoice == "b") {
    optB_Box.css("background-color", "khaki");
  } else if (selectedChoice == "c") {
    optC_Box.css("background-color", "khaki");
  } else {
    optD_Box.css("background-color", "khaki");
  }
  var selection = {
    "qnsNo": qnsIndex,
    "selected": selectedChoice,
    "qnsType": "mcq"
  };
  selections.push(selection);
}
