var $ = require("jquery");

var Login = (function(){
    var Login = function(){
        if(!(this instanceof Login))
            return (new Login(arguments));
        if(Login._singleton) return Login._singleton;
        Login._singleton = this;

        this.event();
    };
    var r = Login.prototype;
    Login._singleton = null;

    r.event = function(){
        $("#anmelden_form").submit(this.submit.bind(this));
        $("#logout").click(this.logout.bind(this));
    }


    r.submit = function(){
        var $benutzer = $("#benutzer").val();
        var $pw = $("#pw").val();

        $.ajax({
            type: "POST",
            data: "benutzer=" + $benutzer + "&pw=" + $pw,
            url: "./settings/anmeldung.php",
            success: function(val){
                location.reload();
            }
        });
    }

    r.logout = function(){
        $.ajax({
            type: "POST",
            url: "./settings/logout.php",
            success: function(val){
                location.reload();
            }
        });
    }

    return Login;
})();

module.exports = Login;