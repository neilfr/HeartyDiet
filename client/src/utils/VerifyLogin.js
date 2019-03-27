module.exports = {
  verifyUserObj: function() {
    let userObj = JSON.parse(localStorage.getItem("userObj"));

    if (userObj === null || userObj._id === null || userObj._id === "") {
      //REDIRCT THEM TO LOGIN

      //window.location.href = "/";
      return "";
    }
    {
      return userObj._id;
    }
  }
};
