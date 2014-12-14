var User = (function(){
    var User = function(id){
        if(!(this instanceof User))
            return (new User(id));


    };
    var r = User.prototype;

    r._time = null;
    r._messages = null;
    r._online = null;
    r._afk = null;
    r._id = null;

    r.getTime = function(){
        return this._time;
    }
    r.getMessages = function(){
        return this._messages;
    }
    r.isOffline = function(){
        return !this._online;
    }
    r.isOnline = function(){
        return this._online;
    }
    r.toggleOnline = function(){
        this._online = !this._online;
    }
    r.isAfk = function(){
        return this._afk;
    }

    return User;
})();

module.exports = User;