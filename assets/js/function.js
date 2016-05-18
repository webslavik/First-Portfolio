(function() {

  document.addEventListener('DOMContentLoaded', function() {

    // I know...it's terrible code, but I learn...
    checkFormSubmit();

    var formName = document.getElementById('formName');
    var formEmail = document.getElementById('formEmail');
    var formArea = document.getElementById('formArea');


    // CHECK NAME FIELD
    //---------------------------------------------------------
    formName.addEventListener('blur', function() {
      var errorId = this.dataset.errorId;
      if(this.value.length == 0) {
        document.getElementById(errorId).classList.remove('error-hide');
      } else {
        document.getElementById(errorId).classList.add('error-hide');
      }
    });

    // CHECK EMAIL FIELD
    //---------------------------------------------------------
    formEmail.addEventListener('blur', function() {
      var pattern = /\b[a-z0-9._]+@[a-z0-9.-]+\.[a-z]{2,4}\b/;
      var errorId = this.dataset.errorId;

      var res = this.value.search(pattern);

      if(res == -1) {
        document.getElementById(errorId).classList.remove('error-hide');
      } else {
        document.getElementById(errorId).classList.add('error-hide');
      }
    });


    // CHECK TEXTAREA FIELD
    //---------------------------------------------------------
    formArea.addEventListener('blur', function() {
      var errorId = this.dataset.errorId;

      if(this.value.length == 0) {
        document.getElementById(errorId).classList.remove('error-hide');
      } else {
        document.getElementById(errorId).classList.add('error-hide');
      }
    });


    // CHECK FORM BEFORE SUBMIT
    //---------------------------------------------------------
    function checkFormSubmit() {
      var form = document.getElementById('form');
      form.addEventListener('submit', function (e) {
        var validForm = false;

        for(var i = 0; i < form.elements.length; i++) {
          var elem = form.elements[i];

          if(elem.type != 'text' && elem.type != 'textarea') continue;

          if(elem.value.length == 0) validForm = true;
        }

        if(validForm) {
          e.preventDefault();
          document.querySelector('.error-form').classList.remove('error-hide');
        } else {
          document.querySelector('.error-form').classList.add('error-hide');
        }

      });

    }

  });

})();
